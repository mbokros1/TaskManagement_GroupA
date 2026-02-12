import { useContext } from 'react';
import { AuthContext } from './AuthContext';

/**
 * Custom hook to access authentication state and helpers.
 *
 * This hook provides access to the AuthContext, including:
 * - authentication status
 * - loading state
 * - current user info
 * - role-based helper functions
 * - login/logout actions
 *
 * Must be used within an <AuthProvider />.
 *
 * @throws {Error} If used outside of an AuthProvider
 * @returns {object} Auth context value
 */
export default function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return ctx;
}
