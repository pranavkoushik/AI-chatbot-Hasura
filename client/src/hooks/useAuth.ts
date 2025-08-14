import { useAuthenticationStatus, useUserData, useSignOut } from '@nhost/react';

export function useAuth() {
  const { isAuthenticated, isLoading } = useAuthenticationStatus();
  const user = useUserData();
  const { signOut } = useSignOut();

  return {
    isAuthenticated,
    isLoading,
    user,
    signOut,
  };
}
