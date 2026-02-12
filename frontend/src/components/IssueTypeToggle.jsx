import { ToggleButton, ToggleButtonGroup, Box } from '@mui/material';

function IssueTypeToggle(selectedType, onTypeChange) {
  const issueTypes = [
    { type: 'Story', color: 'lightblue' },
    { type: 'Bug', color: 'coral' },
    { type: 'Task', color: 'lightgreen' },
    { type: 'Epic', color: 'violet' },
  ];

  return (
    <ToggleButtonGroup
      value={selectedType}
      exclusive
      onChange={(e, newValue) => {
        if (newValue) {
          onTypeChange(newValue);
        }
      }}
    >
      {issueTypes.map(({ type, color }) => (
        <ToggleButton key={type} value={type}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <Box
              sx={{
                width: 20,
                height: 20,
                bgcolor: color,
                borderRadius: '2px',
              }}
            />
            <Box component="span" sx={{ fontSize: 12 }}>
              {type}
            </Box>
          </Box>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default IssueTypeToggle;
