import { Add, KeyboardArrowDown, Notifications } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { Link } from 'react-router';
import keycloak from '../keycloak';

export default function Navbar() {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    if (keycloak.authenticated) {
      keycloak
        .loadUserInfo()
        .then((userInfo) => {
          setUserInfo(userInfo);
        })
        .catch((err) => console.error(err));
    }
  }, [keycloak]);

  const [yourWorkAnchor, setYourWorkAnchor] = useState();
  const [projectsAnchor, setProjectsAnchor] = useState();
  const [filtersAnchor, setFiltersAnchor] = useState();
  const [dashboardsAnchor, setDashboardsAnchor] = useState();
  const [userAnchor, setUserAnchor] = useState();

  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{ bgcolor: 'white' }}
    >
      <Toolbar sx={{ gap: 2, minHeight: 56, alignItems: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexGrow: 1,
            height: '100%',
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              height: '100%',
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                background: 'linear-gradient(135deg, #2196F3 0%, #1565C0 100%)',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              component={Link}
              to="/"
            >
              <Box
                component="span"
                sx={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}
              >
                J
              </Box>
            </Box>
            <Box component="span" sx={{ fontWeight: 600, fontSize: 20 }}>
              Jiro
            </Box>
          </Box>

          {keycloak.authenticated && (
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Button
                endIcon={<KeyboardArrowDown />}
                onClick={(e) => setYourWorkAnchor(e.currentTarget)}
                sx={{ color: 'text.primary', textTransform: 'none' }}
              >
                Your work
              </Button>
              <Menu
                anchorEl={yourWorkAnchor}
                open={Boolean(yourWorkAnchor)}
                onClose={() => setYourWorkAnchor(null)}
              >
                <MenuItem onClick={() => setYourWorkAnchor(null)}>
                  Recent
                </MenuItem>
                <MenuItem onClick={() => setYourWorkAnchor(null)}>
                  Viewed
                </MenuItem>
                <MenuItem onClick={() => setYourWorkAnchor(null)}>
                  Assigned to me
                </MenuItem>
                <MenuItem onClick={() => setYourWorkAnchor(null)}>
                  Starred
                </MenuItem>
              </Menu>

              <Button
                endIcon={<KeyboardArrowDown />}
                onClick={(e) => setProjectsAnchor(e.currentTarget)}
                sx={{ color: 'text.primary', textTransform: 'none' }}
              >
                Projects
              </Button>
              <Menu
                anchorEl={projectsAnchor}
                open={Boolean(projectsAnchor)}
                onClose={() => setProjectsAnchor(null)}
              >
                <MenuItem onClick={() => setProjectsAnchor(null)}>
                  View all projects
                </MenuItem>
                <MenuItem onClick={() => setProjectsAnchor(null)}>
                  Recent projects
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => setProjectsAnchor(null)}>
                  <Add sx={{ mr: 1, fontSize: 20 }} />
                  Create project
                </MenuItem>
              </Menu>

              <Button
                endIcon={<KeyboardArrowDown />}
                onClick={(e) => setFiltersAnchor(e.currentTarget)}
                sx={{ color: 'text.primary', textTransform: 'none' }}
              >
                Filters
              </Button>
              <Menu
                anchorEl={filtersAnchor}
                open={Boolean(filtersAnchor)}
                onClose={() => setFiltersAnchor(null)}
              >
                <MenuItem onClick={() => setFiltersAnchor(null)}>
                  View all filters
                </MenuItem>
                <MenuItem onClick={() => setFiltersAnchor(null)}>
                  Advanced issue search
                </MenuItem>
              </Menu>

              <Button
                endIcon={<KeyboardArrowDown />}
                onClick={(e) => setDashboardsAnchor(e.currentTarget)}
                sx={{ color: 'text.primary', textTransform: 'none' }}
              >
                Dashboards
              </Button>
              <Menu
                anchorEl={dashboardsAnchor}
                open={Boolean(dashboardsAnchor)}
                onClose={() => setDashboardsAnchor(null)}
              >
                <MenuItem onClick={() => setDashboardsAnchor(null)}>
                  View all dashboards
                </MenuItem>
                <MenuItem onClick={() => setDashboardsAnchor(null)}>
                  System dashboard
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => setDashboardsAnchor(null)}>
                  <Add sx={{ mr: 1, fontSize: 20 }} />
                  Create dashboard
                </MenuItem>
              </Menu>

              <Button sx={{ color: 'text.primary', textTransform: 'none' }}>
                Teams
              </Button>
            </Box>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {keycloak.authenticated && (
            <>
              <Button
                variant="contained"
                startIcon={<Add />}
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  textTransform: 'none',
                }}
              >
                Create
              </Button>

              <IconButton>
                <Badge badgeContent=" " color="primary" variant="dot">
                  <Notifications />
                </Badge>
              </IconButton>
            </>
          )}

          <IconButton onClick={(e) => setUserAnchor(e.currentTarget)}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                background: 'linear-gradient(135deg, #9C27B0 0%, #E91E63 100%)',
              }}
            ></Avatar>
          </IconButton>
          <Menu
            anchorEl={userAnchor}
            open={Boolean(userAnchor)}
            onClose={() => setUserAnchor(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {keycloak.authenticated ? (
              <>
                <Box
                  sx={{
                    margin: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Avatar
                    sx={{
                      margin: 'auto',
                      marginBottom: '1rem',
                      width: 56,
                      height: 56,
                    }}
                    component={Link}
                    to="/profile"
                  />
                  <Typography variant="h5" textAlign="center">
                    {userInfo ? userInfo.name : ''}
                  </Typography>
                  <Typography variant="body1" textAlign="center">
                    {userInfo ? userInfo.email : ''}
                  </Typography>
                </Box>
                <MenuItem
                  component="a"
                  href={`${import.meta.env.VITE_KEYCLOAK_URL}/realms/taskmanager/account`}
                >
                  Account settings
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    keycloak.logout();
                    setUserAnchor(null);
                  }}
                >
                  Log out
                </MenuItem>
              </>
            ) : (
              <MenuItem
                onClick={() => {
                  keycloak.login();
                  setUserAnchor(null);
                }}
              >
                Log In
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
