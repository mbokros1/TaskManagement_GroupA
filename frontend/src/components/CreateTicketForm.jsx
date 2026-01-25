import { useState } from 'react';
import {
  TextField,
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function CreateTicketForm() {
  const [ticketData, setTicketData] = useState({
    ticketName: '',
    description: '',
    startDate: null,
    dueDate: null,
    assignee: '',
    priority: 'low',
    storyPoints: '1',
  });

  const users = [];

  const handleChange = (field) => (value) => {
    setTicketData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreateTicketSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: ticketData.ticketName,
      description: ticketData.description,
      startDate: ticketData.startDate
        ? ticketData.startDate.toISOString()
        : null, // please let me know if startDate.format() is preferred
      dueDate: ticketData.dueDate ? ticketData.dueDate.toISOString() : null,
      assigneeID: ticketData.assignee,
      priority: ticketData.priority,
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
      'http://localhost:5000/api', //per readme the backend is accessible through /api
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
          <TextField
            label="Ticket Name: "
            value={ticketData.ticketName}
            onChange={(e) => handleChange('ticketName')(e.target.value)}
            placeholder="task name"
            required
          />
          <TextField
            label="Description: "
            value={ticketData.description}
            onChange={(e) => handleChange('description')(e.target.value)}
            placeholder="Please describe this task here."
          />
          <DatePicker
            label="Start Date: "
            value={ticketData.startDate}
            onChange={(newValue) => {
              handleChange('startDate')(newValue);
            }}
            disablePast
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

          <TextField
            label="Story Points"
            type="number"
            value={ticketData.storyPoints}
            onChange={(e) =>
              handleChange('storyPoints')(Number(e.target.value))
            }
            slotProps={{
              input: {
                min: 0,
                step: 1,
              },
            }}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            disabled={!ticketData.ticketName}
          >
            Create Ticket
          </Button>
        </form>
      </div>
    </LocalizationProvider>
  );
}

export default CreateTicketForm;
