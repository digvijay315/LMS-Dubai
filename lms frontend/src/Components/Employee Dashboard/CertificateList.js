// import React, { useState, useEffect } from 'react'
// import EmployeeSidebar from './EmployeeSidebar'
// import EmployeeHeader from './EmployeeHeader'
// import { base_url } from '../Utils/base_url'
// import axios from 'axios';

// function CertificateList() {

//   const [certificates, setCertificates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//     useEffect(() => {
//       const fetchCertificates = async () => {
//         try {
//           const employeeDataString = localStorage.getItem('employeeData');
//           const employeeData = JSON.parse(employeeDataString);
//           const employeeId = employeeData ? employeeData.employee_id : null;
//           console.log('Employee ID:', employeeId);
//           // const empId = '511243';
//           const response = await axios.get(`${base_url}/certificates/employee/${employeeId}`);
//           console.log(response);
//           setCertificates(response.data.data);
//           setLoading(false);
//         } catch (err) {
//           setError(err.message);
//           setLoading(false);
//         }
//       };

//     fetchCertificates();
//   }, []);

//   if (loading) return <div>Loading certificates...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>

//       <style>
//         {`
//         body {
//         background-color: #e9ecef;
//         padding: 20px;
//         }
//         .certificate-list-container {
//         background-color: #fff;
//         padding: 20px 2rem;
//         border-radius: 8px;
//         }
//         `}
//       </style>

//         <EmployeeSidebar/>

//         <section className="main-content-section">
//             <EmployeeHeader/>

//             <div className="header-div header-two">
//               <div className='title-name'>
//                 <h5>Certificate List</h5>
//                   <p><a onClick={() => window.location.reload()} style={{cursor:"pointer", color:"#099ded"}}>Home</a> <i class="fa-solid fa-caret-right"></i> Certificate List</p> 
//               </div> 
//             </div>

//             <div className="certificate-list-container">
//                 <div className='certificate-list'>
//                   <div className="mt-8">
//                     <h2 className="text-2xl font-bold mb-4">Your Certificates</h2>
                    
//                     {certificates.length === 0 ? (
//                       <div className="bg-gray-100 p-4 rounded-md text-center">
//                         No certificates available yet. Complete assigned assessments to earn certificates.
//                       </div>
//                     ) : (
//                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {certificates.map(certificate => (
//                           <div key={certificate._id} className="bg-white border rounded-lg overflow-hidden shadow-md">
//                             <div className="p-4">
//                               <div className="mb-2 text-lg font-semibold">{certificate.training_name}</div>
//                               <div className="text-sm text-gray-600 mb-4">
//                                 Issued on {new Date(certificate.generated_at).toLocaleDateString()}
//                               </div>
//                               <div className="flex justify-between items-center">
//                                 <span className="text-sm">
//                                   Score: <span className="font-bold">{certificate.score_percentage}%</span>
//                                 </span>
//                                 <a 
//                                   href={certificate.certificate_url} 
//                                   target="_blank" 
//                                   rel="noopener noreferrer"
//                                   className="bg-blue-600 text-black px-3 py-1 rounded hover:bg-blue-700 text-sm"
//                                 >
//                                   View Certificate
//                                 </a>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//             </div>
//         </section>

//     </div>
//   )
// }

// export default CertificateList




import React, { useState, useEffect } from 'react'
import EmployeeSidebar from './EmployeeSidebar'
import EmployeeHeader from './EmployeeHeader'
import CertificateViewer from './CertificateViewer'
import { base_url } from '../Utils/base_url'
import axios from 'axios';

function CertificateList() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewingCertificateId, setViewingCertificateId] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const employeeDataString = localStorage.getItem('employeeData');
        const employeeData = JSON.parse(employeeDataString);
        const employeeId = employeeData ? employeeData.employee_id : null;
        console.log('Employee ID:', employeeId);
        const response = await axios.get(`${base_url}/certificates/employee/${employeeId}`);
        console.log(response);
        setCertificates(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const handleViewCertificate = (certificateId) => {
    setViewingCertificateId(certificateId);
  };

  const handleCloseViewer = () => {
    setViewingCertificateId(null);
  };

  if (loading) return <div>Loading certificates...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <style>
        {`
        body {
        background-color: #e9ecef;
        padding: 20px;
        }
        .certificate-list-container {
        background-color: #fff;
        padding: 20px 2rem;
        border-radius: 8px;
        }
        `}
      </style>

      <EmployeeSidebar/>

      <section className="main-content-section">
        <EmployeeHeader/>

        <div className="header-div header-two">
          <div className='title-name'>
            <h5>Certificate List</h5>
            <p><a onClick={() => window.location.reload()} style={{cursor:"pointer", color:"#099ded"}}>Home</a> <i className="fa-solid fa-caret-right"></i> Certificate List</p> 
          </div> 
        </div>

        <div className="certificate-list-container">
          <div className='certificate-list'>
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
                        <div className="mb-2 text-lg font-semibold">{certificate.training_name}</div>
                        <div className="text-sm text-gray-600 mb-4">
                          Issued on {new Date(certificate.generated_at).toLocaleDateString()}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">
                            Score: <span className="font-bold">{certificate.score_percentage}%</span>
                          </span>
                          <button 
                            onClick={() => handleViewCertificate(certificate._id)}
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                          >
                            View Certificate
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Viewer Modal */}
      {viewingCertificateId && (
        <CertificateViewer 
          certificateId={viewingCertificateId} 
          onClose={handleCloseViewer}
        />
      )}
    </div>
  )
}

export default CertificateList