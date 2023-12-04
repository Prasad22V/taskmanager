import React, { useState } from 'react';

const RealTimeButton = () => {
  const [currentTime, setCurrentTime] = useState(null);

  const fetchCurrentTime = () => {
    // Replace this with your logic to get the current time
    const now = new Date();
    const formattedTime = now.toLocaleTimeString();
    setCurrentTime(formattedTime);
  };

  return (
    <div>
      <button onClick={fetchCurrentTime}>Get Current Time</button>

      {currentTime && (
        <div>
          <h2>Current Time:</h2>
          <p>{currentTime}</p>
        </div>
      )}
    </div>
  );
};

export default RealTimeButton;
