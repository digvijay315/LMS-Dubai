import React, { useState } from 'react';
import axios from 'axios';
import HRHeader from './HRHeader';
import { useNavigate } from 'react-router-dom';

const CompanyRegister = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    address: '',
  });

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate(); // ✅ Add parentheses


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const response = await axios.post('http://localhost:5000/api/companies/register', formData);
      setSuccessMsg('Company registered successfully!');
      setFormData({ companyName: '', email: '', phone: '', address: '' });
    } catch (error) {
      setErrorMsg('Failed to register company. Please try again.');
    }
  };

  return (

   <div>

    <HRHeader/>
   <button
  onClick={() => navigate('/createProjectHR')}
  style={{ marginLeft: '35px', marginTop: '-50px' }}
>
  HR Dashboard
</button>
    <div style={styles.container}>
      
      <h2>Register Company</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Company Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <textarea
          name="address"
          placeholder="Company Address"
          value={formData.address}
          onChange={handleChange}
          required
          style={styles.textarea}
        ></textarea>
        <button type="submit" style={styles.button}>Register</button>
        {successMsg && <p style={styles.success}>{successMsg}</p>}
        {errorMsg && <p style={styles.error}>{errorMsg}</p>}
      </form>
    </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fafafa',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    margin: '8px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  textarea: {
    padding: '10px',
    margin: '8px 0',
    height: '80px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '12px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    marginTop: '12px',
    cursor: 'pointer',
  },
  success: {
    color: 'green',
    marginTop: '10px',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default CompanyRegister;
