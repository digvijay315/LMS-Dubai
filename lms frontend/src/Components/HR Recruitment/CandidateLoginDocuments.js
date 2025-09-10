import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { base_url } from '../Utils/base_url';

// const CandidateLoginDocuments = () => {
//   const [credentials, setCredentials] = useState({
//     username: '',
//     password: '' // This will be the tempLoginCode
//   });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setCredentials({
//       ...credentials,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       const response = await axios.post(`${base_url}/login`, {
//         username: credentials.username,
//         tempLoginCode: credentials.password
//       });
      
//       if (response.data.success) {
//         // Store auth token
//         localStorage.setItem('candidateToken', response.data.token);
//         localStorage.setItem('candidateId', response.data.candidateId);
        
//         toast.success('Login successful');
//         navigate('/candidateDashboard');
//       }
//     } catch (error) {
//       console.error('Login error:', error.response?.data?.message || error.message);
//       toast.error(error.response?.data?.message || 'Login failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Candidate Login</h2>
        
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={credentials.username}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your username"
//             />
//           </div>
          
//           <div className="mb-6">
//             <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
//               Temporary Login Code
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={credentials.password}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your temporary login code"
//             />
//           </div>
          
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
//           >
//             {loading ? 'Logging in...' : 'Log In'}
//           </button>
//         </form>
//       </div>
//       <ToastContainer/>
//     </div>
//   );
// };

// export default CandidateLoginDocuments;



const CandidateLoginDocuments = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '' // This will be the tempLoginCode
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(`${base_url}/login`, {
        username: credentials.username,
        tempLoginCode: credentials.password
      });
      
      if (response.data.success) {
        // Store auth token
        localStorage.setItem('candidateToken', response.data.token);
        localStorage.setItem('candidateId', response.data.candidateId);
        
        toast.success('Login successful');
        setTimeout(() => {
          navigate('/candidateDashboard');
        }, 2000); // Optional delay for the toast message        
      }
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

    <style>
    {/* Your CSS will go here */}
    {`
    /* Reset and base styles */
    * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    }

    /* Background gradient and styling */
    body {
    background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    /* Layout styling */
    .login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    }

    .login-card {
    background: rgba(255, 255, 255, 0.95);
    padding: 32px;
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    width: 100%;
    max-width: 420px;
    transform: translateY(0);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .login-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(31, 38, 135, 0.2);
    }

    /* Heading styling */
    .login-title {
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 24px;
    background: linear-gradient(135deg,rgb(149, 34, 198), #2e073f);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    position: relative;
    display: inline-block;
    left: 50%;
    transform: translateX(-50%);
    padding-bottom: 8px;
    }

    .login-title::after {
    content: '';
    position: absolute;
    width: 60%;
    height: 3px;
    background: linear-gradient(90deg, transparent, rgb(149, 34, 198), transparent);
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    }

    /* Form styling */
    .form-group {
    margin-bottom: 16px;
    }

    .form-label {
    display: block;
    font-weight: 500;
    color: #4b5563;
    margin-bottom: 8px;
    font-size: 0.95rem;
    }

    .form-input {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    outline: none;
    transition: all 0.3s ease;
    background-color: #f8fafc;
    }

    .form-input:focus {
    transform: scale(1.01);
    background-color: #fff;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border-color: #3b82f6;
    }

    .form-group-button {
    margin-top: 24px;
    }

    /* Button styling */
    .submit-button {
    width: 100%;
    background: linear-gradient(135deg,rgb(149, 34, 198), #2e073f);
    color: white;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    letter-spacing: 0.5px;
    // box-shadow: 0 4px 10px rgba(199, 67, 255, 0.61);
    transition: all 0.3s ease;
    }

    .submit-button:hover:not(:disabled) {
    background: linear-gradient(45deg,rgb(112, 17, 152), #2e073f);
    // box-shadow: 0 6px 15px rgba(37, 99, 235, 0.4);
    transform: translateY(-2px);
    }

    .submit-button:active:not(:disabled) {
    transform: translateY(1px);
    // box-shadow: 0 2px 5px rgba(37, 99, 235, 0.4);
    }

    .submit-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    }

    /* Toast notification styling enhancement */
    .Toastify__toast {
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    // .Toastify__toast--success {
    //   background: linear-gradient(45deg, #10b981, #059669);
    //   color: white;
    // }

    // .Toastify__toast--error {
    //   background: linear-gradient(45deg, #ef4444, #dc2626);
    //   color: white;
    // }

    /* Responsive adjustments */
    @media (max-width: 640px) {
    .login-card {
    padding: 24px;
    margin: 0 15px;
    }

    .login-title {
    font-size: 1.5rem;
    }
    }
    `}
    </style>

      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Candidate Login</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter your username"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Temporary Login Code
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter your temporary login code"
              />
            </div>
            
            <div className="form-group-button">
              <button
                type="submit"
                disabled={loading}
                className="submit-button"
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </div>
          </form>
        </div>
        <ToastContainer/>
      </div>
    </div>
  );
};

export default CandidateLoginDocuments;


