import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

function SummaryField({ summary, onUpdateSummary }) {
  return (
    <TextField
      label="Summary: "
      value={summary}
      onChange={(event) => {
        onUpdateSummary(event.target.value);
      }}
      placeholder="task name"
      required
    />
  );
}

SummaryField.propTypes = {
  summary: PropTypes.string,
  onUpdateSummary: PropTypes.func.isRequired,
};

export default SummaryField;
