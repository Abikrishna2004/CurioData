import React from 'react';

function Chart({ chartUrl, title }) {
  return (
    <div className="card">
      <h3>{title}</h3>
   
      <img 
        src={chartUrl} 
        alt={title} 
        style={{ width: '100%', borderRadius: '8px' }} 
      />
    </div>
  );
}

export default Chart;