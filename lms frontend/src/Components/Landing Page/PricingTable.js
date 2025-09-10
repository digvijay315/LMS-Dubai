// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const PricingTable = () => {
//   const [hoveredBasic, setHoveredBasic] = useState(false);
//   const [hoveredStandard, setHoveredStandard] = useState(false);
//   const [hoveredPremium, setHoveredPremium] = useState(false);
//   const [isYearly, setIsYearly] = useState(false);
  
//   // Define pricing tiers for corporate plan
//   const corporatePricing = {
//     '2000': { monthly: 156, yearly: 1497.60 }, // yearly with 20% discount
//     '3000': { monthly: 234, yearly: 2246.40 },
//     '4000': { monthly: 312, yearly: 2995.20 }
//   };
  
//   // Define pricing tiers for academic plan
//   const academicPricing = {
//     '500-1000': { monthly: 176, yearly: 1689.60 }, // yearly with 20% discount
//     '1000-1500': { monthly: 220, yearly: 2112.00 },
//     '1500-2000': { monthly: 264, yearly: 2534.40 }
//   };
  
//   // State for selected user counts
//   const [corporateUsers, setCorporateUsers] = useState('2000');
//   const [academicUsers, setAcademicUsers] = useState('500-1000');
  
//   // Calculate corporate price based on selected users and billing period
//   const getCorporatePrice = () => {
//     return isYearly ? 
//       corporatePricing[corporateUsers].yearly : 
//       corporatePricing[corporateUsers].monthly;
//   };
  
//   // Calculate academic price based on selected users and billing period
//   const getAcademicPrice = () => {
//     return isYearly ? 
//       academicPricing[academicUsers].yearly : 
//       academicPricing[academicUsers].monthly;
//   };
  
//   // Format price with commas for thousands
//   const formatPrice = (price) => {
//     return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
//   };

//   const navigate = useNavigate();
//   const navigateHandler = () => {
//     navigate('/talents-bulder/login/signin/');
//   }

//   return (
//     <div className="pricing-container">
//       <div className="pricing-header">
//         <div className="pricing-label">PRICING TABLE</div>
//         <h1 className="pricing-title">Our Membership Price Plan</h1>
//       </div>
      
//       {/* Toggle button for monthly/yearly */}
//       <div className="billing-toggle" style={{ display: 'flex', justifyContent: 'center', margin: '20px 0 50px 0px', alignItems: 'center' }}>
//         <span style={{ color: !isYearly ? '#0075ff' : '#666', fontWeight: !isYearly ? 'bold' : 'normal' }}>Monthly</span>
//         <div 
//           onClick={() => setIsYearly(!isYearly)}
//           style={{ 
//             width: '60px', 
//             height: '30px', 
//             backgroundColor: '#e1e1e1', 
//             borderRadius: '15px', 
//             margin: '0 15px', 
//             position: 'relative', 
//             cursor: 'pointer' 
//           }}
//         >
//           <div 
//             style={{ 
//               position: 'absolute', 
//               width: '26px', 
//               height: '26px', 
//               backgroundColor: '#0075ff', 
//               borderRadius: '50%', 
//               top: '2px', 
//               left: isYearly ? '32px' : '2px', 
//               transition: 'left 0.3s ease' 
//             }} 
//           />
//         </div>
//         <span style={{ color: isYearly ? '#0075ff' : '#666', fontWeight: isYearly ? 'bold' : 'normal' }}>Yearly (Save 20%)</span>
//       </div>
      
//       <div className="pricing-cards">
//         {/* Corporate Plan Card */}
//         <div 
//           className="pricing-card"
//           onMouseEnter={() => setHoveredBasic(true)}
//           onMouseLeave={() => setHoveredBasic(false)}
//         >
//           <div className="card-header" style={{ borderColor: '#164276' }}>
//             <h2 className="plan-name">Corporate</h2>
//             <p style={{padding:"16px 32px 0px 32px"}}>Harness the potential of collaborative learning to empower your employees</p>
//             <button className='contact-for-quote-btn' onClick={navigateHandler}>Contact for Quote</button>
//           </div>
          
//           <div className="price-container">
//             <div className='users-capacity'>
//               <select 
//                 className='users-capacity-select'
//                 value={corporateUsers}
//                 onChange={(e) => setCorporateUsers(e.target.value)}
//                 style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd', width: '100%' }}
//               >
//                 <option value="2000">2000 Users</option>
//                 <option value="3000">3000 Users</option>
//                 <option value="4000">4000 Users</option>
//               </select>
//             </div>

//             <div className="price" style={{ marginTop: '15px' }}>
//               <span className="currency">$</span>
//               <span className="amount" style={{ color: '#164276', fontSize: '2rem', fontWeight: 'bold' }}>
//                 {formatPrice(getCorporatePrice())}
//               </span>
//             </div>
//             <div className="billing-period">
//               {isYearly ? '/PER YEAR' : '/PER MONTH'}
//             </div>
//           </div>
          
//           <div className="features">
//             <div className="feature">
//               <div className="icon-included" style={{ color: '#164276' }}>✓</div>
//               <span>Unlimited course creation</span>
//             </div>
//             <div className="feature">
//               <div className="icon-included" style={{ color: '#164276' }}>✓</div>
//               <span>Assessment and survey tools</span>
//             </div>
//             <div className="feature">
//               <div className="icon-included" style={{ color: '#164276' }}>✓</div>
//               <span>Mentoring platform for one to one or group learning</span>
//             </div>
//             <div className="feature">
//               <div className="icon-excluded" style={{ color: '#164276' }}>✓</div>
//               <span>Competency assessment tool</span>
//             </div>
//             <div className="feature">
//               <div className="icon-excluded" style={{ color: '#164276' }}>✓</div>
//               <span>Competency mapping platform</span>
//             </div>
//             <div className="feature">
//               <div className="icon-included" style={{ color: '#164276' }}>✓</div>
//               <span>Manage external trainings and budget</span>
//             </div>
//           </div>
          
//           <button 
//             className="choose-plan-btn"
//             style={{ 
//               backgroundColor: '#164276',
//               color: '#fff',
//               padding: '12px 20px',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               fontWeight: 'bold',
//               width: '100%',
//               marginTop: '20px'
//             }}
//             onClick={() => navigateHandler()}
//           >
//             CHOOSE THE PLAN →
//           </button>
//         </div>

//         {/* Academic Plan Card */}
//         <div 
//           className="pricing-card"
//           onMouseEnter={() => setHoveredStandard(true)}
//           onMouseLeave={() => setHoveredStandard(false)}
//         >
//           <div className="card-header" style={{ borderColor: '#0075ff' }}>
//             <h2 className="plan-name" style={{ color: '#0075ff' }}>Academic</h2>
//             <p style={{padding:"16px 32px 0px 32px"}}>Unlock the power of collaborative learning to empower your students</p>
//             <button className='contact-for-quote-btn' onClick={navigateHandler}>Contact for Quote</button>
//           </div>
          
//           <div className="price-container">
//             <div className='users-capacity'>
//               <select 
//                 className='users-capacity-select'
//                 value={academicUsers}
//                 onChange={(e) => setAcademicUsers(e.target.value)}
//                 style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd', width: '100%' }}
//               >
//                 <option value="500-1000">500 - 1000 Users</option>
//                 <option value="1000-1500">1000 - 1500 Users</option>
//                 <option value="1500-2000">1500 - 2000 Users</option>
//               </select>
//             </div>

//             <div className="price" style={{ marginTop: '15px' }}>
//               <span className="currency" style={{ color: '#0075ff' }}>$</span>
//               <span className="amount" style={{ color: '#0075ff', fontSize: '2rem', fontWeight: 'bold' }}>
//                 {formatPrice(getAcademicPrice())}
//               </span>
//             </div>
//             <div className="billing-period">
//               {isYearly ? '/PER YEAR' : '/PER MONTH'}
//             </div>
//           </div>
          
//           <div className="features">
//             <div className="feature">
//               <div className="icon-included" style={{ color: '#0075ff' }}>✓</div>
//               <span>Unlimited course creation</span>
//             </div>
//             <div className="feature">
//               <div className="icon-included" style={{ color: '#0075ff' }}>✓</div>
//               <span>Assessment and survey tools	Assessment and survey tools	</span>
//             </div>
//             <div className="feature">
//               <div className="icon-included" style={{ color: '#0075ff' }}>✓</div>
//               <span>Mentoring platform for one to one or group learning</span>
//             </div>
//             <div className="feature">
//               <div className="icon-included" style={{ color: '#0075ff' }}>✓</div>
//               <span>Competency assessment tool	Competency assessment tool	</span>
//             </div>
//             <div className="feature">
//               <div className="icon-excluded" style={{ color: '#0075ff' }}>✓</div>
//               <span>Competency mapping platform</span>
//             </div>
//           </div>
          
//           <button 
//             className="choose-plan-btn"
//             style={{ 
//               backgroundColor: '#0075ff',
//               color: '#fff',
//               padding: '12px 20px',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               fontWeight: 'bold',
//               width: '100%',
//               marginTop: '20px'
//             }}
//             onClick={() => navigateHandler()}
//           >
//             CHOOSE THE PLAN →
//           </button>
//         </div>

//         {/* Individual Plan Card */}
//         <div 
//           className="pricing-card"
//           onMouseEnter={() => setHoveredPremium(true)}
//           onMouseLeave={() => setHoveredPremium(false)}
//         >
//           <div className="card-header" style={{ borderColor: '#6bcaff' }}>
//             <h2 className="plan-name">Individual</h2>
//             <p>Coming soon...</p>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default PricingTable;



import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PricingTable = () => {
  // Original hover states kept intact
  const [hoveredBasic, setHoveredBasic] = useState(false);
  const [hoveredStandard, setHoveredStandard] = useState(false);
  const [hoveredPremium, setHoveredPremium] = useState(false);
  
  // Monthly/yearly toggle functionality kept but commented out
  // const [isYearly, setIsYearly] = useState(false);
  
  // Always set to yearly now
  const isYearly = true;
  
  // Define pricing tiers for corporate plan
  const corporatePricing = {
    '2000': { 
      /* monthly: 156, */ 
      yearly: 1497.60 
    }, // yearly with 20% discount
    '3000': { 
      /* monthly: 234, */ 
      yearly: 2246.40 
    },
    '4000': { 
      /* monthly: 312, */ 
      yearly: 2995.20 
    }
  };
  
  // Define pricing tiers for academic plan
  const academicPricing = {
    '500-1000': { 
      /* monthly: 176, */ 
      yearly: 1689.60 
    }, // yearly with 20% discount
    '1000-1500': { 
      /* monthly: 220, */ 
      yearly: 2112.00 
    },
    '1500-2000': { 
      /* monthly: 264, */ 
      yearly: 2534.40 
    }
  };
  
  // State for selected user counts
  const [corporateUsers, setCorporateUsers] = useState('2000');
  const [academicUsers, setAcademicUsers] = useState('500-1000');
  
  // Calculate corporate price based on selected users and billing period
  const getCorporatePrice = () => {
    return corporatePricing[corporateUsers].yearly;
    // Original code commented out
    /* return isYearly ? 
      corporatePricing[corporateUsers].yearly : 
      corporatePricing[corporateUsers].monthly; */
  };
  
  // Calculate academic price based on selected users and billing period
  const getAcademicPrice = () => {
    return academicPricing[academicUsers].yearly;
    // Original code commented out
    /* return isYearly ? 
      academicPricing[academicUsers].yearly : 
      academicPricing[academicUsers].monthly; */
  };
  
  // Format price with commas for thousands
  const formatPrice = (price) => {
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate('/talents-bulder/login/signin/');
  }

  return (
    <div className="pricing-container">
      <div className="pricing-header">
        <div className="pricing-label">PRICING TABLE</div>
        <h1 className="pricing-title">Our Membership Price Plan</h1>
      </div>
      
      {/* Toggle button for monthly/yearly - COMMENTED OUT
      <div className="billing-toggle" style={{ display: 'flex', justifyContent: 'center', margin: '20px 0 50px 0px', alignItems: 'center' }}>
        <span style={{ color: !isYearly ? '#0075ff' : '#666', fontWeight: !isYearly ? 'bold' : 'normal' }}>Monthly</span>
        <div 
          onClick={() => setIsYearly(!isYearly)}
          style={{ 
            width: '60px', 
            height: '30px', 
            backgroundColor: '#e1e1e1', 
            borderRadius: '15px', 
            margin: '0 15px', 
            position: 'relative', 
            cursor: 'pointer' 
          }}
        >
          <div 
            style={{ 
              position: 'absolute', 
              width: '26px', 
              height: '26px', 
              backgroundColor: '#0075ff', 
              borderRadius: '50%', 
              top: '2px', 
              left: isYearly ? '32px' : '2px', 
              transition: 'left 0.3s ease' 
            }} 
          />
        </div>
        <span style={{ color: isYearly ? '#0075ff' : '#666', fontWeight: isYearly ? 'bold' : 'normal' }}>Yearly (Save 20%)</span>
      </div>
      */}
      
      {/* Display "Yearly Plans (Save 20%)" label */}
      <div style={{ textAlign: 'center', margin: '20px 0 50px 0px' }}>
        <span style={{ color: '#0075ff', fontWeight: 'bold', fontSize: '1.2rem' }}>Yearly Plans (Save 20%)</span>
      </div>
      
      <div className="pricing-cards">
        {/* Corporate Plan Card */}
        <div 
          className="pricing-card"
          onMouseEnter={() => setHoveredBasic(true)}
          onMouseLeave={() => setHoveredBasic(false)}
        >
          <div className="card-header" style={{ borderColor: '#164276' }}>
            <h2 className="plan-name">Corporate</h2>
            <p style={{padding:"16px 32px 0px 32px"}}>Harness the potential of collaborative learning to empower your employees</p>
            <button className='contact-for-quote-btn' onClick={navigateHandler}>Contact for Quote</button>
          </div>
          
          <div className="price-container">
            <div className='users-capacity'>
              <select 
                className='users-capacity-select'
                value={corporateUsers}
                onChange={(e) => setCorporateUsers(e.target.value)}
                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd', width: '100%' }}
              >
                <option value="2000">2000 Users</option>
                <option value="3000">3000 Users</option>
                <option value="4000">4000 Users</option>
              </select>
            </div>

            <div className="price" style={{ marginTop: '15px' }}>
              <span className="currency">$</span>
              <span className="amount" style={{ color: '#164276', fontSize: '2rem', fontWeight: 'bold' }}>
                {formatPrice(getCorporatePrice())}
              </span>
            </div>
            <div className="billing-period">
              /PER YEAR
              {/* Original code commented out */}
              {/* {isYearly ? '/PER YEAR' : '/PER MONTH'} */}
            </div>
          </div>
          
          <div className="features">
            <div className="feature">
              <div className="icon-included" style={{ color: '#164276' }}>✓</div>
              <span>Unlimited course creation</span>
            </div>
            <div className="feature">
              <div className="icon-included" style={{ color: '#164276' }}>✓</div>
              <span>Assessment and survey tools</span>
            </div>
            <div className="feature">
              <div className="icon-included" style={{ color: '#164276' }}>✓</div>
              <span>Mentoring platform for one to one or group learning</span>
            </div>
            <div className="feature">
              <div className="icon-excluded" style={{ color: '#164276' }}>✓</div>
              <span>Competency assessment tool</span>
            </div>
            <div className="feature">
              <div className="icon-excluded" style={{ color: '#164276' }}>✓</div>
              <span>Competency mapping platform</span>
            </div>
            <div className="feature">
              <div className="icon-included" style={{ color: '#164276' }}>✓</div>
              <span>Manage external trainings and budget</span>
            </div>
          </div>
          
          <button 
            className="choose-plan-btn"
            style={{ 
              backgroundColor: '#164276',
              color: '#fff',
              padding: '12px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              width: '100%',
              marginTop: '20px'
            }}
            onClick={() => navigateHandler()}
          >
            CHOOSE THE PLAN →
          </button>
        </div>

        {/* Academic Plan Card */}
        <div 
          className="pricing-card"
          onMouseEnter={() => setHoveredStandard(true)}
          onMouseLeave={() => setHoveredStandard(false)}
        >
          <div className="card-header" style={{ borderColor: '#0075ff' }}>
            <h2 className="plan-name" style={{ color: '#0075ff' }}>Academic</h2>
            <p style={{padding:"16px 32px 0px 32px"}}>Unlock the power of collaborative learning to empower your students</p>
            <button className='contact-for-quote-btn' onClick={navigateHandler}>Contact for Quote</button>
          </div>
          
          <div className="price-container">
            <div className='users-capacity'>
              <select 
                className='users-capacity-select'
                value={academicUsers}
                onChange={(e) => setAcademicUsers(e.target.value)}
                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd', width: '100%' }}
              >
                <option value="500-1000">500 - 1000 Users</option>
                <option value="1000-1500">1000 - 1500 Users</option>
                <option value="1500-2000">1500 - 2000 Users</option>
              </select>
            </div>

            <div className="price" style={{ marginTop: '15px' }}>
              <span className="currency" style={{ color: '#0075ff' }}>$</span>
              <span className="amount" style={{ color: '#0075ff', fontSize: '2rem', fontWeight: 'bold' }}>
                {formatPrice(getAcademicPrice())}
              </span>
            </div>
            <div className="billing-period">
              /PER YEAR
              {/* Original code commented out */}
              {/* {isYearly ? '/PER YEAR' : '/PER MONTH'} */}
            </div>
          </div>
          
          <div className="features">
            <div className="feature">
              <div className="icon-included" style={{ color: '#0075ff' }}>✓</div>
              <span>Unlimited course creation</span>
            </div>
            <div className="feature">
              <div className="icon-included" style={{ color: '#0075ff' }}>✓</div>
              <span>Assessment and survey tools	Assessment and survey tools	</span>
            </div>
            <div className="feature">
              <div className="icon-included" style={{ color: '#0075ff' }}>✓</div>
              <span>Mentoring platform for one to one or group learning</span>
            </div>
            <div className="feature">
              <div className="icon-included" style={{ color: '#0075ff' }}>✓</div>
              <span>Competency assessment tool	Competency assessment tool	</span>
            </div>
            <div className="feature">
              <div className="icon-excluded" style={{ color: '#0075ff' }}>✓</div>
              <span>Competency mapping platform</span>
            </div>
          </div>
          
          <button 
            className="choose-plan-btn"
            style={{ 
              backgroundColor: '#0075ff',
              color: '#fff',
              padding: '12px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              width: '100%',
              marginTop: '20px'
            }}
            onClick={() => navigateHandler()}
          >
            CHOOSE THE PLAN →
          </button>
        </div>

        {/* Individual Plan Card */}
        <div 
          className="pricing-card"
          onMouseEnter={() => setHoveredPremium(true)}
          onMouseLeave={() => setHoveredPremium(false)}
        >
          <div className="card-header" style={{ borderColor: '#6bcaff' }}>
            <h2 className="plan-name">Individual</h2>
            <p>Coming soon...</p>
          </div>
        </div>
      </div>

            <style jsx>{`
  .pricing-container {
    font-family: 'Arial', sans-serif;
    max-width: 1200px;
    margin: 4rem auto;
    padding: 40px 20px;
    color: #164276;
  //   background-color: #2E073F
  }
  
  .pricing-header {
    text-align: center;
    margin-bottom: 60px;
  }

  .contact-for-quote-btn {
    background-color: transparent;
    color: #164276;
    border: 1px solid #164276;
    }

    .contact-for-quote-btn:hover {
      background-color: #164276;
      color: #fff;
    }
  
  .pricing-label {
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    color: #164276;
    margin-bottom: 16px;
  }
  
  .pricing-label::before {
    content: "";
    width: 20px;
    height: 20px;
    margin-right: 8px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232E73FF'%3E%3Cpath d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-2h2v2zm0-4h-2V7h2v6z'/%3E%3C/svg%3E");
    background-size: contain;
  }
  
  .pricing-title {
    font-size: 38px;
    font-weight: 700;
    margin: 0;
    color: #000;
  }
  
  .pricing-cards {
    display: flex;
    justify-content: center;
    gap: 24px;
    flex-wrap: wrap;
  //   border: 2px solid #000;
  }
  
  .pricing-card {
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    width: 100%;
    max-width: 350px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: transform 0.3s ease;
  }
  
  .pricing-card:hover {
    transform: translateY(-10px);
  }
  
  .card-header {
    padding: 24px 0;
    text-align: center;
    border-top: 4px solid;
  }
  
  .plan-name {
    font-size: 24px;
    font-weight: 700;
    margin: 0;
  }
  
  .price-container {
    background-color: #f8f9fc;
    padding: 24px 16px;
    text-align: center;
  }
  
  .price {
    display: flex;
    align-items: baseline;
    justify-content: center;
  }
  
  .currency {
    font-size: 48px;
    font-weight: 600;
    margin-right: 4px;
  }
  
  .amount {
    font-size: 48px;
    font-weight: 700;
    line-height: 1;
  }
  
  .billing-period {
    font-size: 14px;
    color: #6b7280;
    margin-top: 8px;
  }
  
  .features {
    padding: 16px 24px;
  //   flex-grow: 1;
  //   border: 1px solid #000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // align-items: center;
    gap: 10px;
  }
  
  .feature {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    font-size: 12px;
  //   border: 1px solid #000;
  }
  
  .icon-included, .icon-excluded {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    font-size: 14px;
    font-weight: bold;
  }
  
  .icon-included {
    background-color: rgba(46, 115, 255, 0.1);
  }
  
  .icon-excluded {
    background-color: #f8f9fc;
    color: #ff2e2e;
  }
  
  .choose-plan-btn {
    margin: 16px;
    padding: 14px 24px;
    border: none;
    border-radius: 5px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  //   display: flex;
  //   align-items: center;
  //   justify-content: space-around;
  }
  
  // .arrow {
  //   margin-left: 8px;
  //   font-size: 18px;
  // }
  
  .featured .choose-plan-btn {
    background-color: #FF2E2E;
  }

  @media (max-width: 1024px) {
    .pricing-cards {
      gap: 16px;
    }
    
    .pricing-card {
      max-width: 300px;
    }
  }
  
  @media (max-width: 768px) {
    .pricing-cards {
      flex-direction: column;
      align-items: center;
    }
    
    .pricing-card {
      max-width: 400px;
      margin-bottom: 24px;
    }
  }
           `}</style>


    </div>
  );
};

export default PricingTable;



