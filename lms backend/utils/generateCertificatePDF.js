// utils/certificateGenerator.js
const fs = require('fs').promises;
const path = require('path');
const puppeteer = require('puppeteer');

// Function to generate certificate PDF
const generateCertificatePDF = async (certificate) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    // Create HTML for certificate
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Certificate</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: ${certificate.bg_color};
            color: ${certificate.text_color};
          }
          .certificate-container {
            width: 1000px;
            height: 700px;
            padding: 50px;
            position: relative;
            overflow: hidden;
          }
          .certificate-title {
            font-size: 48px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 10px;
          }
          .certificate-subtitle {
            font-size: 24px;
            text-align: center;
            margin-bottom: 50px;
            color: ${certificate.accent_color};
          }
          .recipient-name {
            font-size: 36px;
            font-style: italic;
            text-align: center;
            margin: 30px 0;
            padding: 10px 0;
            border-top: 1px solid ${certificate.text_color};
            border-bottom: 1px solid ${certificate.text_color};
          }
          .description {
            font-size: 18px;
            text-align: center;
            max-width: 600px;
            margin: 0 auto 60px auto;
          }
          .signature-container {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .signature-line {
            width: 200px;
            height: 50px;
            margin-bottom: 10px;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10%2C35 C30%2C5 50%2C40 70%2C20 C90%2C0 110%2C30 130%2C25 C150%2C20 170%2C5 190%2C15' fill='none' stroke='${encodeURIComponent(certificate.text_color.replace('#', '%23'))}' stroke-width='2'/%3E%3C/svg%3E");
          }
          .signer-name {
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 5px;
          }
          .signer-title {
            font-size: 18px;
          }
          .accent-line {
            position: absolute;
            background-color: ${certificate.accent_color};
          }
          .top-right {
            top: 70px;
            right: 50px;
            width: 120px;
            height: 4px;
          }
          .top-right-small {
            top: 85px;
            right: 100px;
            width: 60px;
            height: 4px;
          }
          .bottom-left {
            bottom: 70px;
            left: 50px;
            width: 120px;
            height: 4px;
          }
          .bottom-left-small {
            bottom: 85px;
            left: 100px;
            width: 60px;
            height: 4px;
          }
        </style>
      </head>
      <body>
        <div class="certificate-container">
          <div class="accent-line top-right"></div>
          <div class="accent-line top-right-small"></div>
          <div class="accent-line bottom-left"></div>
          <div class="accent-line bottom-left-small"></div>
          
          <div class="certificate-title">CERTIFICATE</div>
          <div class="certificate-subtitle">OF ${certificate.certificate_type.toUpperCase()}</div>
          
          <p>This certificate is proudly presented to</p>
          
          <div class="recipient-name">${certificate.employee_name}</div>
          
          <div class="description">${certificate.description}</div>
          
          <div class="signature-container">
            <div class="signature-line"></div>
            <div class="signer-name">${certificate.signer_name}</div>
            <div class="signer-title">${certificate.signer_title}</div>
          </div>
        </div>
      </body>
      </html>
    `;
    
    await page.setContent(html);
    
    // Create directory if it doesn't exist
    const certificatesDir = path.join(__dirname, '../public/certificates');
    try {
      await fs.mkdir(certificatesDir, { recursive: true });
    } catch (err) {
      if (err.code !== 'EEXIST') throw err;
    }
    
    // Generate PDF
    const pdfPath = path.join(certificatesDir, `${certificate._id}.pdf`);
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      landscape: true,
      printBackground: true
    });
    
    await browser.close();
    
    return pdfPath;
  } catch (error) {
    console.error('Error generating certificate PDF:', error);
    throw error;
  }
};

module.exports = {
  generateCertificatePDF
};