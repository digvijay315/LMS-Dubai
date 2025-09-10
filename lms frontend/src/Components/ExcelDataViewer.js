// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { base_url } from './Utils/base_url';

// const styles = {
//   container: {
//     maxWidth: '1200px',
//     margin: '20px auto',
//     padding: '20px'
//   },
//   tabContainer: {
//     borderBottom: '1px solid #e5e7eb',
//     marginBottom: '20px'
//   },
//   tab: {
//     padding: '10px 20px',
//     margin: '0 5px',
//     border: 'none',
//     background: 'none',
//     cursor: 'pointer',
//     fontSize: '16px',
//     position: 'relative'
//   },
//   activeTab: {
//     color: '#2563eb',
//     borderBottom: '2px solid #2563eb'
//   },
//   table: {
//     width: '100%',
//     borderCollapse: 'collapse',
//     marginTop: '10px',
//     border: '1px solid #e5e7eb'
//   },
//   th: {
//     backgroundColor: '#f3f4f6',
//     padding: '12px',
//     textAlign: 'left',
//     borderBottom: '2px solid #e5e7eb'
//   },
//   td: {
//     padding: '12px',
//     borderBottom: '1px solid #e5e7eb'
//   },
//   loading: {
//     textAlign: 'center',
//     padding: '20px',
//     color: '#666'
//   },
//   content: {
//     backgroundColor: 'white',
//     padding: '20px',
//     borderRadius: '8px',
//     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
//   }
// };

// const ExcelDataViewer = () => {
//   const [sheetsData, setSheetsData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('projectCode');

//   useEffect(() => {
//     const fetchAllData = async () => {
//       try {
//         const response = await axios.get(`${base_url}/get_excel_Data`);
//         console.log(response);
        
//         if (response.data.success) {
//           const organizedData = {};
//           response.data.data.forEach(sheet => {
//             organizedData[sheet.sheetName.toLowerCase().replace(/\s+/g, '')] = sheet.data;
//           });
//           setSheetsData(organizedData);
//         }
//       } catch (error) {
//         setError('Failed to fetch data');
//         console.error('Error:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllData();
//   }, []);

//   const renderTable = (data, columns) => {
//     if (!data || data.length === 0) return <p>No data available</p>;

//     return (
//       <table style={styles.table}>
//         <thead>
//           <tr>
//             {columns.map((col, index) => (
//               <th key={index} style={styles.th}>{col}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               {columns.map((col, colIndex) => (
//                 <td key={colIndex} style={styles.td}>
//                   {row[col]}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     );
//   };

//   const getTabStyle = (tabName) => ({
//     ...styles.tab,
//     ...(activeTab === tabName ? styles.activeTab : {})
//   });

//   if (loading) return <div style={styles.loading}>Loading data...</div>;
//   if (error) return <div style={styles.loading}>{error}</div>;

//   return (
//     <div style={styles.container}>
//       <div style={styles.content}>
//         <div style={styles.tabContainer}>
//           <button 
//             style={getTabStyle('projectCode')}
//             onClick={() => setActiveTab('projectCode')}
//           >
//             Project Code
//           </button>
//           <button 
//             style={getTabStyle('employeeRegistration')}
//             onClick={() => setActiveTab('employeeRegistration')}
//           >
//             Employee Registration
//           </button>
//           <button 
//             style={getTabStyle('trainingCode')}
//             onClick={() => setActiveTab('trainingCode')}
//           >
//             Training Code
//           </button>
//           <button 
//             style={getTabStyle('skillsCategory')}
//             onClick={() => setActiveTab('skillsCategory')}
//           >
//             Skills Category
//           </button>
//         </div>

//         <div>
//           {activeTab === 'projectCode' && renderTable(sheetsData.projectcode, [
//             'Project Code',
//             'Project Name',
//             'Region',
//             'Project Manager'
//           ])}
          
//           {activeTab === 'employeeRegistration' && renderTable(sheetsData.employeeregistration, [
//             'Employee ID',
//             'Name',
//             'Department',
//             'Position'
//           ])}
          
//           {activeTab === 'trainingCode' && renderTable(sheetsData.trainingcode, [
//             'Training Code',
//             'Training Name',
//             'Duration',
//             'Trainer'
//           ])}
          
//           {activeTab === 'skillsCategory' && renderTable(sheetsData.skillscategory, [
//             'Skill ID',
//             'Skill Name',
//             'Category',
//             'Level'
//           ])}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExcelDataViewer;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { base_url } from './Utils/base_url';

const ExcelDataViewer = () => {
  const [sheetsData, setSheetsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('projectcode');

  const columnMappings = {
    projectcode: ['EMPTY', 'EMPTY_1', 'EMPTY_2', 'EMPTY_3'],
    employeeregistration: ['employee_id', 'name', 'department', 'position'],
    trainingcode: ['training_code', 'training_name', 'duration', 'trainer'],
    skillscategory: ['skill_id', 'skill_name', 'category', 'level']
  };

  const displayNames = {
    EMPTY: 'Project Code',
    EMPTY_1: 'Project Name',
    EMPTY_2: 'Region',
    EMPTY_3: 'Project Manager',
    employee_id: 'Employee ID',
    name: 'Name',
    department: 'Department',
    position: 'Position',
    training_code: 'Training Code',
    training_name: 'Training Name',
    duration: 'Duration',
    trainer: 'Trainer',
    skill_id: 'Skill ID',
    skill_name: 'Skill Name',
    category: 'Category',
    level: 'Level'
  };

// In ExcelDataViewer component:
useEffect(() => {
  const fetchAllData = async () => {
    try {
      console.log('Fetching data...');
      const response = await axios.get(`${base_url}/get_excel_Data`);
      console.log('Response:', response.data);
      
      if (response.data.success) {
        const organizedData = {};
        response.data.data.forEach(sheet => {
          const tabName = sheet.sheetName.toLowerCase().replace(/\s+/g, '');
          organizedData[tabName] = sheet.data;
        });
        console.log('Organized Data:', organizedData);
        setSheetsData(organizedData);
      }
    } catch (error) {
      setError('Failed to fetch data');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchAllData();
}, []);

const renderTable = (data, sheetName) => {
  if (!data || data.length === 0) {
    console.log('No data for sheet:', sheetName);
    return <p>No data available</p>;
  }
  
  console.log('Rendering data for sheet:', sheetName, data);
  
  const columns = columnMappings[sheetName];
  
  // If we have data but no matching columns, display all fields
  const actualColumns = columns || Object.keys(data[0]);
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            {actualColumns.map((col) => (
              <th key={col} className="p-3 text-left border-b-2 border-gray-200">
                {displayNames[col] || col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {actualColumns.map((col) => (
                <td key={col} className="p-3 border-b border-gray-200">
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

  if (loading) return <div className="text-center p-5">Loading data...</div>;
  if (error) return <div className="text-center p-5 text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-5">
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          {Object.keys(columnMappings).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 m-1 font-medium ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div className="p-4">
          {renderTable(sheetsData[activeTab], activeTab)}
        </div>
      </div>
    </div>
  );
};

export default ExcelDataViewer;