import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';

/**
 * Displays today's date and time based on user's computer clock timezone and language (global)
 * @returns {string} Today's date
 */
function GetTodaysDateTime() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      //update clock every second
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Typography>
      {now.toLocaleString(undefined, {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })}
    </Typography>
  );
}

export default GetTodaysDateTime;
