import { useState } from 'react';
import IssueTypeToggle from './issueTypeToggle';
import UserAutocomplete from './userAutoComplete';
import ProjectAutocomplete from './ProjectAutocomplete';
import SummaryField from './SummaryField';
import DescriptionField from './DescriptionField';
import DueDatePicker from './DueDatePicker';
import PriorityLabel from './PriorityLabel';
import StoryPointButtonGroup from './StoryPointButtonGroup';
import LabelsField from './LabelsField';
import { Button, Box, Snackbar, Alert } from '@mui/material';

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

        <SummaryField
          summary={ticketData.summary}
          onUpdateSummary={handleChange('summary')}
        />

        <DescriptionField
          description={ticketData.description}
          onUpdateDescription={handleChange('description')}
        />

        <DueDatePicker
          dueDate={ticketData.dueDate}
          onDueDateUpdate={handleChange('dueDate')}
        />

        <UserAutocomplete
          value={ticketData.assignee}
          onChange={handleChange('assignee')}
        />

        <PriorityLabel
          priority={ticketData.priority}
          onUpdatePriority={handleChange('priority')}
        />

        <StoryPointButtonGroup
          points={ticketData.storyPoints}
          onUpdatePoints={handleChange('storyPoints')}
        />

        <LabelsField
          labels={ticketData.labels}
          onUpdateLabels={handleChange('labels')}
        />

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
  );
}

export default CreateTicketForm;
