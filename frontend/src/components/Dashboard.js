import React from 'react';
import SummaryTable from './SummaryTable';
import Chart from './Chart';

import { motion } from 'framer-motion';

const BACKEND_URL = 'http://localhost:8000';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15 
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};


function Dashboard({ data, onReset }) {
  
  const getChartTitle = (url) => {
    try {
      return url.split('/').pop()
        .replace('chart_', '')
        .replace('.png', '')
        .replace('_', ' ');
    } catch (e) {
      return 'Chart';
    }
  };

  return (
    <motion.div 
      className="dashboard-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <button onClick={onReset} className="reset-button">
        Analyze Another File
      </button>
      
      <h2>Analysis for: {data.filename}</h2>

      <motion.div variants={itemVariants}>
        <SummaryTable 
          title="📊 Column Types" 
          data={data.columns} 
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <SummaryTable 
          title="⚠️ Missing Values" 
          data={data.missing_values} 
        />
      </motion.div>

      {data.charts && data.charts.map((chartUrl, index) => (
        <motion.div variants={itemVariants} key={index}>
          <Chart
            title={getChartTitle(chartUrl)}
            chartUrl={`${BACKEND_URL}${chartUrl}`}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default Dashboard;