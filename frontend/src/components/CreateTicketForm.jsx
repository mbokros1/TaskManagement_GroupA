import { useState } from 'react';
import {
  TextField,
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Box,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function CreateTicketForm() {
  const [ticketData, setTicketData] = useState({
    project: '',
    issueType: 'Story',
    summary: '',
    description: '',
    assignee: '',
    priority: 'Low',
    labels: '',
    sprint: '',
    storyPoints: '1',
    dueDate: null,
  });

  const users = [];
  const issueTypes = [
    { value: 'Story', color: 'lightblue' },
    { value: 'Bug', color: 'coral' },
    { value: 'Task', color: 'lightgreen' },
    { value: 'Epic', color: 'violet' },
  ];

  const handleChange = (field) => (value) => {
    setTicketData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreateTicketSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      project: ticketData.project,
      issueType: ticketData.issueType,
      title: ticketData.summary,
      description: ticketData.description,
      dueDate: ticketData.dueDate?.toISOString() ?? null,
      assigneeID: ticketData.assignee,
      priority: ticketData.priority,
      labels: ticketData.labels.split(',').map((l) => l.trim()),
      sprint: ticketData.sprint,
      storyPoints: ticketData.storyPoints,
    };
    //console.log(payload);

    try {
      await createTicket(payload);
    } catch (err) {
      console.error(err);
    }
  };

  const createTicket = async (payload) => {
    const res = await fetch(
      '/api', //per readme the backend is accessible through /api
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Ticket creation failed');
    }

    return res.json();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <h4>Create New Ticket</h4>
        <form
          onSubmit={handleCreateTicketSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
        >
          <ToggleButtonGroup
            value={ticketData.issueType}
            exclusive
            onChange={(e, value) => value && handleChange('issueType')(value)}
          >
            {issueTypes.map(({ value, color }) => (
              <ToggleButton key={value} value={value}>
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
                    {value}
                  </Box>
                </Box>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

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
          <Autocomplete
            options={users}
            label="Assigned To:"
            value={ticketData.assignee}
            onChange={(e, newValue) => handleChange('assignee')(newValue)}
            renderInput={(params) => <TextField {...params} label="Assignee" />}
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

          <Button
            type="submit"
            variant="contained"
            disabled={!ticketData.summary}
          >
            Create Ticket
          </Button>
        </form>
      </div>
    </LocalizationProvider>
  );
}

export default CreateTicketForm;
