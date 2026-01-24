import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function CreateTicketForm() {
  const [ticketName, setTicketName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [assignment, setAssignment] = useState('');

  const handleCreateTicketSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: ticketName,
      description: description,
      startDate: startDate ? startDate.toISOString() : null, // please let me know if startDate.format() is preferred
      dueDate: dueDate ? dueDate.toISOString() : null,
      assigneeID: assignment,
    };
    console.log(payload);

    try {
      await createTicket(payload);
    } catch (err) {
      console.error(err);
    }
  };

  const createTicket = async (payload) => {
    const res = await fetch(
      'http://localhost:5000/tickets', //insert correct endpoint here
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
            value={ticketName}
            onChange={(e) => setTicketName(e.target.value)}
            placeholder="task name"
            required
            // TODO on all: send data in useState to back end
          />
          <TextField
            label="Description: "
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please describe this task here."
          />
          <DateField
            label="Start Date: "
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
            }}
            disablePast
          />
          <DateField
            label="Due Date: "
            value={dueDate}
            onChange={(newValue) => {
              setDueDate(newValue);
            }}
            disablePast
          />
          <TextField
            label="Assigned To:"
            value={assignment}
            onChange={(e) => setAssignment(e.target.value)}
            placeholder="Assigned to"
            // TODO: make sure that input is a selection from users with dev role
          />
          <Button type="submit" variant="contained" disabled={!ticketName}>
            Create Ticket
          </Button>
        </form>
      </div>
    </LocalizationProvider>
  );
}

export default CreateTicketForm;
