import { Alert, Box, CircularProgress } from '@mui/material';
import { Outlet } from 'react-router';
import { useProject } from '../context/ProjectContext';

export default function ProjectLayout() {
  const { loading, error } = useProject();

  if (error) return <Alert severity="error">{error}</Alert>;

  return <Box>{loading ? <CircularProgress /> : <Outlet />}</Box>;
}
