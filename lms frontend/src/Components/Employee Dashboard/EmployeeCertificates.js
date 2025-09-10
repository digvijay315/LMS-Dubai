// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import CertificateViewer from './CertificateViewer';
// import { base_url } from '../Utils/base_url';

// const EmployeeCertificates = ({ employeeId }) => {
//   const [certificates, setCertificates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCertificate, setSelectedCertificate] = useState(null);

//   useEffect(() => {
//     if (employeeId) {
//       fetchCertificates(employeeId);
//     }
//   }, [employeeId]);

//   const fetchCertificates = async (empId) => {
//     try {
//         const empId = '784465';
//         console.log('Fetching certificate for employee ID:', empId);
//       setLoading(true);
//       const response = await axios.get(`${base_url}/certificates/${empId}`);
//       console.log('Certificates response:', response);
      
//       if (response.data.success) {
//         setCertificates(response.data.data);
//         if (response.data.data.length > 0) {
//           setSelectedCertificate(response.data.data[0]); // Select the first certificate by default
//         }
//       } else {
//         setError('No certificates found');
//       }
//     } catch (err) {
//       setError('Error fetching certificates');
//       console.error('Error fetching certificates:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

// //   if (loading) {
// //     return <div>Loading certificates...</div>;
// //   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (certificates.length === 0) {
//     return <div>No certificates available for this employee.</div>;
//   }

//   return (
//     <div className="employee-certificates">
//       <h2>Your Certificates</h2>
      
//       <div className="certificates-list">
//         {certificates.map((cert) => (
//           <div 
//             key={cert._id}
//             className={`certificate-item ${selectedCertificate && selectedCertificate._id === cert._id ? 'selected' : ''}`}
//             onClick={() => setSelectedCertificate(cert)}
//           >
//             <div className="certificate-preview">
//               <i className="fas fa-certificate"></i>
//             </div>
//             <div className="certificate-details">
//               <h3>{cert.trainingName}</h3>
//               <p>Issued: {new Date(cert.issuedDate).toLocaleDateString()}</p>
//               <p>Score: {cert.scorePercentage}%</p>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       {selectedCertificate && (
//         <div className="certificate-viewer-container">
//           <h3>Certificate Preview</h3>
//           <CertificateViewer certificateUrl={selectedCertificate.certificateUrl} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmployeeCertificates;




// EmployeeCertificates.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { base_url } from '../Utils/base_url';

const EmployeeCertificates = ({ employeeId }) => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const empId = '511243';
        const response = await axios.get(`${base_url}/certificates/employee/${empId}`);
        console.log(response);
        setCertificates(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [employeeId]);

  if (loading) return <div>Loading certificates...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Your Certificates</h2>
      
      {certificates.length === 0 ? (
        <div className="bg-gray-100 p-4 rounded-md text-center">
          No certificates available yet. Complete assigned assessments to earn certificates.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map(certificate => (
            <div key={certificate._id} className="bg-white border rounded-lg overflow-hidden shadow-md">
              <div className="p-4">
                <div className="mb-2 text-lg font-semibold"> {certificate.training_name}</div>
                <div className="text-sm text-gray-600 mb-4">
                  Issued on {new Date(certificate.generated_at).toLocaleDateString()}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">
                    Score: <span className="font-bold">{certificate.score_percentage}%</span>
                  </span>
                  <a 
                    href={certificate.certificate_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-black px-3 py-1 rounded hover:bg-blue-700 text-sm"
                  >
                    View Certificate
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeCertificates;