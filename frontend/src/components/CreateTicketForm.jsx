import { useState, useEffect } from 'react';
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
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

// ADD: Accept props for edit mode
function CreateTicketForm({ ticketId = null, mode = 'create', onSuccess = () => {} }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [projectInput, setProjectInput] = useState('');
  
  // ADD: Delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

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

  // ADD: Load ticket data if in edit mode
  useEffect(() => {
    if (mode === 'edit' && ticketId) {
      fetch(`/api/tickets/${ticketId}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to load ticket');
          return res.json();
        })
        .then(data => {
          setTicketData({
            project: data.project || null,
            issueType: data.issueType || 'Story',
            summary: data.title || '',
            description: data.description || '',
            assignee: data.assignee || null,
            priority: data.priority || 'Low',
            labels: data.labels ? data.labels.join(', ') : '',
            sprint: data.sprint || '',
            storyPoints: data.storyPoints || 1,
            dueDate: data.dueDate ? dayjs(data.dueDate) : null,
          });
        })
        .catch(err => {
          console.error('Failed to load ticket:', err);
          setErrorMessage('Failed to load ticket data');
        });
    }
  }, [ticketId, mode]);

  useEffect(() => {
    if (!userInput) return;

    const controller = new AbortController();
    const timeout = setTimeout(() => {
      fetch(`/api/users?search=${encodeURIComponent(userInput)}`, {
        signal: controller.signal,
      })
        .then((res) => res.json())
        .then(setUsers)
        .catch((err) => {
          if (err.name !== 'AbortError') console.error(err);
        });
    }, 300);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [userInput]);

  useEffect(() => {
    if (!projectInput) return;
    const timeout = setTimeout(() => {
      fetch(`/api/projects?search=${encodeURIComponent(projectInput)}`)
        .then((res) => res.json())
        .then((data) => setProjects(data))
        .catch(console.error);
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [projectInput]);

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

  // MODIFY: Handle both create and update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      project: ticketData.project?.id ?? null,
      issueType: ticketData.issueType,
      title: ticketData.summary,
      description: ticketData.description,
      dueDate: ticketData.dueDate?.toISOString() ?? null,
      assigneeID: ticketData.assignee?.id ?? null,
      priority: ticketData.priority,
      labels: ticketData.labels.split(',').map((l) => l.trim()).filter(l => l),
      sprint: ticketData.sprint,
      storyPoints: ticketData.storyPoints,
    };

    try {
      if (mode === 'edit' && ticketId) {
        await updateTicket(ticketId, payload);
        alert('Ticket updated successfully!');
      } else {
        await createTicket(payload);
        alert('Ticket created successfully!');
        // Clear form after creation
        setTicketData({
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
      }
      onSuccess(); // Callback for parent components
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const createTicket = async (payload) => {
    const res = await fetch('/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Ticket creation failed');
    }
    return res.json();
  };

  // ADD: Update function
  const updateTicket = async (id, payload) => {
    const res = await fetch(`/api/tickets/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Ticket update failed');
    }
    return res.json();
  };

  // ADD: Delete function
  const handleDelete = async () => {
    if (!ticketId) return;
    
    try {
      const res = await fetch(`/api/tickets/${ticketId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Ticket deletion failed');
      }
      
      setDeleteDialogOpen(false);
      alert('Ticket deleted successfully!');
      onSuccess(); // Let parent know deletion succeeded
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        {}
        <h4>{mode === 'edit' ? 'Edit Ticket' : 'Create New Ticket'}</h4>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          {}
          <Autocomplete
            options={projects}
            getOptionLabel={(option) => option.name ?? ''}
            value={ticketData.project}
            onChange={(event, newValue) => {
              handleChange('project')(newValue);
            }}
            onInputChange={(event, newInputValue) => {
              setProjectInput(newInputValue);
            }}
            renderInput={(params) => <TextField {...params} label="Project" />}
          />
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
            getOptionLabel={(option) => option.name}
            value={ticketData.assignee}
            onChange={(event, newValue) => {
              handleChange('assignee')(newValue);
            }}
            onInputChange={(event, newInputValue) => {
              setUserInput(newInputValue);
            }}
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
              <MenuItem value="Backlog">Backlog</MenuItem>
            </Select>
          </FormControl>

          <Button variant="outlined" component="label">
            Add Attachment
            <input type="file" hidden />
          </Button>

          {/*Button section */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={!ticketData.summary}
              sx={{ flex: mode === 'edit' ? 1 : 'auto' }}
            >
              {mode === 'edit' ? 'Update Ticket' : 'Create Ticket'}
            </Button>
            
            {/* ADD: Delete button for edit mode */}
            {mode === 'edit' && ticketId && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => setDeleteDialogOpen(true)}
              >
                Delete Ticket
              </Button>
            )}
          </Box>

          {/* ADD: Delete confirmation dialog */}
          <Dialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
          >
            <DialogTitle>Delete Ticket</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this ticket? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleDelete} color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            open={Boolean(errorMessage)}
            autoHideDuration={6000}
            onClose={() => setErrorMessage(null)}
          >
            <Alert severity="error" onClose={() => setErrorMessage(null)}>
              {errorMessage}
            </Alert>
          </Snackbar>
        </Box>
      </div>
    </LocalizationProvider>
  );
}

export default CreateTicketForm;