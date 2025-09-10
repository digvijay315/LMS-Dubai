// src/components/TrainingTimeDisplay.js
import React from 'react';
import { formatTrainingTimes } from './Utils/timeUtils';


export const TrainingTimeDisplay = ({ training, region }) => {
  if (!training || !region) return null;
  
  const times = formatTrainingTimes(training, region);
  
  return (
    <div className="time-display-single-line">
      <div className="time-group">
        <p><strong>Global Time (UTC):</strong> From: {times.utcStart} | To: {times.utcEnd}</p>
      </div>
      <div className="time-group">
        <p><strong>Local Time ({region}):</strong> From: {times.localStart} | To: {times.localEnd}</p>
      </div>
    </div>
  );
};