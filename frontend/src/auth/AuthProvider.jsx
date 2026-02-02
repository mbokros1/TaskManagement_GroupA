import { useEffect, useMemo, useState, useCallback } from 'react';
import keycloak from '../keycloak';
import api from '../api/axios';
import { AuthContext } from './AuthContext';
import { getRoles, hasRole, hasAnyRole, hasAllRoles } from './authHelpers';
import PropTypes from 'prop-types';

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const isAuthenticated = !!keycloak.authenticated;
  const isLoading = loadingUser;

  const login = useCallback(() => keycloak.login(), []);
  const logout = useCallback(
    () => keycloak.logout({ redirectUri: import.meta.env.VITE_FRONTEND_URL }),
    []
  );

  const clearUser = useCallback(() => {
    setUser(null);
  }, []);

  const fetchMe = useCallback(async () => {
    setLoadingUser(true);
    try {
      const res = await api.get('/me');
      setUser(res.data.user);
      return res.data.user;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      clearUser();
      throw error;
    } finally {
      setLoadingUser(false);
    }
  }, [clearUser]);

  useEffect(() => {
    if (!isAuthenticated) {
      clearUser();
      setHasFetched(false);
      return;
    }

    if (!user && !loadingUser && !hasFetched) {
      setHasFetched(true);
      fetchMe();
    }
  }, [isAuthenticated, user, loadingUser, fetchMe, clearUser, hasFetched]);

  const authState = useMemo(() => {
    const roles = getRoles(user);

    return {
      // state
      isLoading,
      isAuthenticated,
      user,
      roles,

      // actions
      login,
      logout,
      refreshUser: fetchMe,

      // role helpers
      hasRole: (role) => hasRole(user, role),
      hasAnyRole: (roleList) => hasAnyRole(user, roleList),
      hasAllRoles: (roleList) => hasAllRoles(user, roleList),
    };
  }, [isLoading, isAuthenticated, user, login, logout, fetchMe]);

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
