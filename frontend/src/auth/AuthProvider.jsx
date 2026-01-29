import { useEffect, useMemo, useState, useCallback } from 'react';
import keycloak from '../keycloak';
import api from '../api/axios';
import { AuthContext } from './AuthContext';
import { getRoles, hasRole, hasAnyRole, hasAllRoles } from './authHelpers';
import PropTypes from 'prop-types';

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);

  const isAuthenticated = !!keycloak.authenticated;
  const isLoading = loadingUser;

  const login = useCallback(() => keycloak.login(), []);
  const logout = useCallback(
    () => keycloak.logout({ redirectUri: import.meta.env.VITE_FRONTEND_URL }),
    []
  );

  const clearUser = useCallback(async () => {
    setUser(null);
  }, []);

  const fetchMe = useCallback(async () => {
    setLoadingUser(true);
    try {
      const res = await api.get('/me');
      setUser(res.data.user);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      clearUser();
    } finally {
      setLoadingUser(false);
    }
  }, [clearUser]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchMe();
    } else {
      clearUser();
    }
  }, [isAuthenticated, fetchMe, clearUser]);

  const value = useMemo(() => {
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
