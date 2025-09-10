import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled Loader Container
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

// Loader Box with 200x200 size
const LoaderBox = styled.div`
  width: 200px;
  height: 200px;
  background-color: #f9f9f9;
  border: 2px solid #ddd;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Circular Spinner
const LoaderSpinner = styled.div`
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// Loading Text
const LoadingText = styled.p`
  font-size: 16px;
  color: #2c3e50;
  margin-top: 10px;
`;

const Content = styled.div`
  text-align: center;
  font-size: 24px;
  padding: 20px;
`;

const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds timeout

    return () => clearTimeout(timer); // Cleanup the timeout
  }, []);

  return (
    <div>
      {loading ? (
        <LoaderContainer>
          <LoaderBox>
            <LoaderSpinner />
            <LoadingText>Content Loading...</LoadingText>
          </LoaderBox>
        </LoaderContainer>
      ) : (
        <Content>Content is loaded!</Content>
      )}
    </div>
  );
};

export default Loader;
