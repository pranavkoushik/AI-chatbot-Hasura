import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { gql } from '@apollo/client';
import { apolloClient } from '@/lib/graphql';

const GET_CHATS = gql`
  query GetChats {
    chats(order_by: { created_at: desc }) {
      id
      title
      created_at
      messages(limit: 1, order_by: { created_at: desc }) {
        content
        role
      }
    }
  }
`;

const CREATE_CHAT = gql`
  mutation CreateChat($title: String!) {
    insert_chats_one(object: { title: $title }) {
      id
      title
      created_at
    }
  }
`;

const DELETE_CHAT = gql`
  mutation DeleteChat($id: uuid!) {
    delete_chats_by_pk(id: $id) {
      id
    }
  }
`;

const CHATS_SUBSCRIPTION = gql`
  subscription ChatsSubscription {
    chats(order_by: { created_at: desc }) {
      id
      title
      created_at
      messages(limit: 1, order_by: { created_at: desc }) {
        content
        role
      }
    }
  }
`;

export function useChats() {
  const { data, loading, error } = useSubscription(CHATS_SUBSCRIPTION);
  
  const [createChat] = useMutation(CREATE_CHAT, {
    onCompleted: () => {
      apolloClient.refetchQueries({ include: ['GetChats'] });
    },
  });

  const [deleteChat] = useMutation(DELETE_CHAT, {
    onCompleted: () => {
      apolloClient.refetchQueries({ include: ['GetChats'] });
    },
  });

  const chats = data?.chats || [];

  return {
    chats,
    loading,
    error,
    createChat,
    deleteChat,
  };
}
