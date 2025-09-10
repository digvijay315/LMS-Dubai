import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { base_url } from './Utils/base_url';

const ConfirmationPage = () => {
  const { trainingId, employeeId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('confirming');

  useEffect(() => {
    const confirmAttendance = async () => {
      try {
        setStatus('confirming');
        
        const response = await axios.get(
          `${base_url}/confirm-training/${trainingId}/${employeeId}`
        );

        setStatus('confirmed');
        toast.success('Training attendance confirmed successfully!');
        
        // Redirect to homepage or dashboard after 3 seconds
        setTimeout(() => {
          navigate('/');
        }, 3000);

      } catch (error) {
        console.error('Confirmation error:', error);
        setStatus('error');
        toast.error('Failed to confirm attendance. Please try again or contact support.');
      }
    };

    if (trainingId && employeeId) {
      confirmAttendance();
    }
  }, [trainingId, employeeId, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4">Training Confirmation</h1>
        
        {status === 'confirming' && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
            <p>Confirming your attendance...</p>
          </div>
        )}

        {status === 'confirmed' && (
          <div className="text-center">
            <div className="text-green-600 text-5xl mb-4">✓</div>
            <h2 className="text-xl font-semibold mb-2">Thank You!</h2>
            <p>Your attendance has been confirmed successfully.</p>
            <p className="text-sm text-gray-500 mt-4">You will be redirected to the homepage shortly...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="text-red-600 text-5xl mb-4">×</div>
            <h2 className="text-xl font-semibold mb-2">Oops!</h2>
            <p>Something went wrong while confirming your attendance.</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmationPage;