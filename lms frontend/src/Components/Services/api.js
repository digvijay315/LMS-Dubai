import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export const sendNominationEmails = async (employeeIds, trainingDetails) => {
  const response = await api.post('/send-nomination-emails', {
    employeeIds,
    trainingDetails
  });
  return response.data;
};

export const getNominationStatus = async (employeeId, trainingId) => {
  const response = await api.get(`/nomination-status/${employeeId}/${trainingId}`);
  return response.data;
};