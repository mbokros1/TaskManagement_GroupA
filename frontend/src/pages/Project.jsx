import { Alert, Box } from '@mui/material';
import { Outlet, useParams } from 'react-router';
import { useProject } from '../context/ProjectContext';

export default function Project() {
  const { projectId } = useParams();
  const { projects } = useProject();
  const project = projects.find((p) => String(p.id) === String(projectId));

  if (!project) return <Alert severity="error">Project not found</Alert>;

  return (
    <Box>
      <Outlet context={{ project }} />
    </Box>
  );
}
