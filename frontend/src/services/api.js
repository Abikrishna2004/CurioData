import axios from 'axios';

const API_URL = 'http://localhost:8000';

/**
 * @param {File} file 
 * @returns {Promise}
 */
export const uploadDataFile = (file) => {
  const formData = new FormData();
  
  formData.append('file', file);

  return axios.post(`${API_URL}/upload-and-analyze/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};