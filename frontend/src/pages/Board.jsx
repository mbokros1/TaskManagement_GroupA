import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import {
  tasks as initialTasks,
  columns,
  boardInfo,
} from '../data/mockBoardData.js';
import TaskCard from '../components/task-card/TaskCard.jsx';

// Column Component
function Column({ column, tasks }) {
  const columnTasks = tasks.filter((task) => task.status === column.id);
  const taskCount = columnTasks.length;

  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 280,
        maxWidth: 320,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Column Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          px: 0.5,
          py: 0.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: 500, color: '#333' }}>
            {column.title}
          </Typography>
          <Typography variant="caption" sx={{ color: '#888' }}>
            {taskCount}
          </Typography>
        </Box>
        <IconButton size="small" sx={{ color: '#999' }}>
          <AddIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      {/* Task Cards */}
      <Box
        sx={{
          flex: 1,
          bgcolor: '#f5f5f5',
          borderRadius: 1,
          p: 1.5,
          minHeight: 200,
        }}
      >
        {columnTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Box>
    </Box>
  );
}

export default function Board() {
  const [tasks] = useState(initialTasks);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Box
      sx={{
        height: '100%',
        bgcolor: '#fafafa',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
      }}
    >
      {/* Main Content */}
      <Box
        sx={{
          maxWidth: 1400,
          mx: 'auto',
          px: 3,
          py: 3,
        }}
      >
        {/* Board Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 3,
          }}
        >
          {/* Title and Date */}
          <Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: 400, color: '#333', mb: 0.5 }}
            >
              {boardInfo.title}
            </Typography>
            <Typography variant="body2" sx={{ color: '#888' }}>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Typography>
          </Box>

          {/* Search, Filter, Create Task */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <TextField
              placeholder="Search tasks..."
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                width: 220,
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'white',
                },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#999' }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              sx={{
                borderColor: '#ddd',
                color: '#555',
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#bbb',
                  bgcolor: 'white',
                },
              }}
            >
              Filter
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                bgcolor: '#333',
                color: 'white',
                textTransform: 'uppercase',
                fontWeight: 500,
                '&:hover': {
                  bgcolor: '#444',
                },
              }}
            >
              Create Task
            </Button>
          </Box>
        </Box>

        {/* Kanban Columns */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            pb: 2,
          }}
        >
          {columns.map((column) => (
            <Column key={column.id} column={column} tasks={tasks} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
