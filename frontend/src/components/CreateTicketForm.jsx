import { useState } from 'react';
import IssueTypeToggle from './issueTypeToggle';
import UserAutocomplete from './userAutoComplete';
import ProjectAutocomplete from './ProjectAutocomplete';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function CreateTicketForm() {
  const [errorMessage, setErrorMessage] = useState(null);

  const [ticketData, setTicketData] = useState({
    project: null,
    issueType: 'Story',
    summary: '',
    description: '',
    assignee: null,
    priority: 'Low',
    labels: '',
    sprint: '',
    storyPoints: 1,
    dueDate: null,
  });

  const handleChange = (field) => (value) => {
    setTicketData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreateTicketSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      project: ticketData.project?.id ?? null,
      issueType: ticketData.issueType,
      title: ticketData.summary,
      description: ticketData.description,
      dueDate: ticketData.dueDate?.toISOString() ?? null,
      assigneeID: ticketData.assignee?.id ?? null,
      priority: ticketData.priority,
      labels: ticketData.labels.split(',').map((l) => l.trim()),
      sprint: ticketData.sprint,
      storyPoints: ticketData.storyPoints,
    };
    //console.log(payload);

    try {
      await createTicket(payload);
    } catch (err) {
      //console.error(err);
      setErrorMessage(err.message);
    }
  };

  const createTicket = async (payload) => {
    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrorMessage('Ticket creation failed');
        throw new Error(data.error || 'Ticket creation failed');
      }

      return res.json();
    } catch (err) {
      setErrorMessage('Network error while creating ticket');
      throw new Error(err.message || 'Network error while creating ticket');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <h4>Create New Ticket</h4>
        <Box
          component="form"
          onSubmit={handleCreateTicketSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <ProjectAutocomplete
            value={ticketData.project}
            onChange={handleChange('project')}
          />

          <IssueTypeToggle
            selectedType={ticketData.issueType}
            onTypeChange={handleChange('issueType')}
          />

          <TextField
            label="Summary: "
            value={ticketData.summary}
            onChange={(e) => handleChange('summary')(e.target.value)}
            placeholder="task name"
            required
          />
          <TextField
            label="Description: "
            multiline
            minRows={4}
            value={ticketData.description}
            onChange={(e) => handleChange('description')(e.target.value)}
            placeholder="Please describe this task here."
          />
          <DatePicker
            label="Due Date: "
            value={ticketData.dueDate}
            onChange={(newValue) => {
              handleChange('dueDate')(newValue);
            }}
            disablePast
          />

          <UserAutocomplete
            value={ticketData.assignee}
            onChange={handleChange('assignee')}
          />

          <FormControl fullWidth>
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              labelId="priority-label"
              label="Priority"
              value={ticketData.priority}
              onChange={(e) => handleChange('priority')(e.target.value)}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>

          <ToggleButtonGroup
            value={ticketData.storyPoints}
            exclusive
            onChange={(e, value) => value && handleChange('storyPoints')(value)}
          >
            {[1, 2, 3, 5, 8, 13].map((point) => (
              <ToggleButton key={point} value={point}>
                {point}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <TextField
            label="Labels"
            placeholder="frontend, api, sprint-12"
            value={ticketData.labels}
            onChange={(e) => handleChange('labels')(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel>Sprint</InputLabel>
            <Select
              value={ticketData.sprint}
              label="Sprint"
              onChange={(e) => handleChange('sprint')(e.target.value)}
            >
              <MenuItem value="Sprint 1">Sprint 1</MenuItem>
              <MenuItem value="Sprint 2">Sprint 2</MenuItem>
            </Select>
          </FormControl>

          <Button variant="outlined" component="label">
            Add Attachment
            <input type="file" hidden />
          </Button>

          <Snackbar
            open={Boolean(errorMessage)}
            onClose={() => setErrorMessage(null)}
          >
            <Alert severity="error">{errorMessage}</Alert>
          </Snackbar>

          <Button
            type="submit"
            variant="contained"
            disabled={!ticketData.summary}
          >
            Create Ticket
          </Button>
        </Box>
      </div>
    </LocalizationProvider>
  );
}

export default CreateTicketForm;
