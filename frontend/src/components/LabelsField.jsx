import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

function LabelsField({ labels, onUpdateLabels }) {
  return (
    <TextField
      label="Labels"
      placeholder="frontend, api, sprint-12"
      value={labels}
      onChange={(e) => onUpdateLabels(e.target.value)}
    />
  );
}

LabelsField.propTypes = {
  labels: PropTypes.string,
  onUpdateLabels: PropTypes.func.isRequired,
};

export default LabelsField;
