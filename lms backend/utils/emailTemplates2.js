
const mongoose = require('mongoose')

const generateEmailContent = ({candidate, documents, project}) => {
    // // Format date for display
    // const formatDate = (dateString) => {
    // if (!dateString) return 'To be determined';
    // const date = new Date(dateString);
    // return date.toLocaleDateString('en-US', {
    //   day: 'numeric',
    //   month: 'long',
    //   year: 'numeric'
    // });
    // };

    let content = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Required Documents for Project: ${project.name}</h2>
        <p>Dear ${candidate.candidateName},</p>
        <p>As part of the visa process for the ${project.name} project, please provide the following documents:</p>
        <ul>
    `;
  
    documents.forEach(doc => {
      content += `<li>${doc}</li>`;
    });
  
    content += `
        </ul>
        <p>Please log in to the portal to submit these documents as soon as possible.</p>
        <p>If you have any questions, please don't hesitate to contact us.</p>
        <p>Thank you,</p>
        <p>HR Department</p>
      </div>
    `;
  
    return content;
};


module.exports = generateEmailContent;
module.exports.generateEmailContent = generateEmailContent;