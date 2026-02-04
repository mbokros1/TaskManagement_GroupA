import React from 'react';
import { Box } from '@mui/material';

/**
 * Displays the content for a tab in the main panel
 * @param {object} props - component props
 * @returns {JSX.Element|null} the tab panel if active and null if not active.
 */
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  //return whatever content is passed inside the CustomTabPanel
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

export default CustomTabPanel;
