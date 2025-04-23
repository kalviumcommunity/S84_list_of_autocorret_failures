import React from 'react';

const AutocorrectFail = ({ text, intended, failLevel, context, submittedBy }) => {
  return (
    <div className="p-4 m-4 bg-white/10 backdrop-blur-md rounded-xl text-white shadow-md border border-white/20">
      <h2 className="text-xl font-semibold">Autocorrect Fail</h2>
      <p><strong>Wrong Text:</strong> {text}</p>
      <p><strong>Intended:</strong> {intended}</p>
      <p><strong>Fail Level:</strong> {failLevel}</p>
      <p><strong>Context:</strong> {context}</p>
      <p><strong>Submitted By:</strong> {submittedBy}</p>
    </div>
  );
};

export default AutocorrectFail;
