import React from 'react';
import { Link } from 'react-router-dom';

const AutocorrectFail = ({ text, intended, failLevel, context, submittedBy, timestamp, _id, onDelete }) => {
  return (
    <div className="info-section">
      <h2 className="text-xl font-semibold">Autocorrect Fail</h2>
      <p><strong>Wrong Text:</strong> {text}</p>
      <p><strong>Intended:</strong> {intended}</p>
      <p><strong>Fail Level:</strong> {failLevel}</p>
      <p><strong>Context:</strong> {context}</p>
      <p><strong>Submitted By:</strong> {submittedBy}</p>
      <p><strong>Timestamp:</strong> {new Date(timestamp).toLocaleString()}</p>
      <div className="mt-2">
        <Link to={`/update/${_id}`} className="submit-btn mr-2">
          Edit
        </Link>
        <button
          onClick={onDelete}
          className="submit-btn bg-red-500 hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AutocorrectFail;