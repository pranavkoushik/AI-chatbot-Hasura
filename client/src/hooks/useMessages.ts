import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { gql } from '@apollo/client';
import { apolloClient } from '@/lib/graphql';

const GET_MESSAGES = gql`
  query GetMessages($chatId: uuid!) {
    messages(where: { chat_id: { _eq: $chatId } }, order_by: { created_at: asc }) {
      id
      content
      role
      created_at
      user_id
    }
  }
`;

const MESSAGES_SUBSCRIPTION = gql`
  subscription MessagesSubscription($chatId: uuid!) {
    messages(where: { chat_id: { _eq: $chatId } }, order_by: { created_at: asc }) {
      id
      content
      role
      created_at
      user_id
    }
  }
`;

const INSERT_MESSAGE = gql`
  mutation InsertMessage($chatId: uuid!, $content: String!, $role: String!) {
    insert_messages_one(object: { chat_id: $chatId, content: $content, role: $role }) {
      id
      content
      role
      created_at
    }
  }
`;

const SEND_MESSAGE_ACTION = gql`
  mutation SendMessage($chat_id: uuid!, $content: String!) {
    sendMessage(chat_id: $chat_id, content: $content) {
      assistant_message_id
      assistant_content
    }
  }
`;

export function useMessages(chatId: string | null) {
  const { data, loading, error } = useSubscription(MESSAGES_SUBSCRIPTION, {
    variables: { chatId },
    skip: !chatId,
  });

  const [insertMessage] = useMutation(INSERT_MESSAGE);
  const [sendMessageAction] = useMutation(SEND_MESSAGE_ACTION);

  const messages = data?.messages || [];

  const sendMessage = async (content: string) => {
    if (!chatId) return;

    try {
      // First insert the user message
      await insertMessage({
        variables: {
          chatId,
          content,
          role: 'user',
        },
      });

      // Then trigger the AI response via Hasura Action
      await sendMessageAction({
        variables: {
          chat_id: chatId,
          content,
        },
      });
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };

  return {
    messages,
    loading,
    error,
    sendMessage,
  };
}
