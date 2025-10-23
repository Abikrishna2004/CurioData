import React from 'react';

function SummaryTable({ title, data }) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="card">
        <h3>{title}</h3>
        <p>No data available.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>{title}</h3>
      <ul>
        {Object.entries(data).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value.toString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SummaryTable;