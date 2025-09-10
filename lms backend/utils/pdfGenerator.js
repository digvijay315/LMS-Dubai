const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

exports.generatePDF = ({ userName, courseName, date }) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margins: { top: 50, bottom: 50, left: 50, right: 50 }
      });

      const buffers = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });

      // ✅ Light Background Color
      doc
        .rect(0, 0, doc.page.width, doc.page.height)
        .fill('#fffce6'); // soft cream background

      // 🟦 Border
      doc
        .save()
        .lineWidth(4)
        .strokeColor('#3366cc')
        .rect(30, 30, doc.page.width - 60, doc.page.height - 60)
        .stroke()
        .restore();

      // 🖼️ Logo at top center (adjust path as needed)
      const logoPath = path.join(__dirname, '../assets/logo.png'); // adjust to actual logo path
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, doc.page.width / 2 - 50, 40, { width: 100 });
        doc.moveDown(4);
      } else {
        console.warn('⚠️ Logo image not found at:', logoPath);
        doc.moveDown(6); // add space if logo missing
      }

      // 🎓 Title
      doc
        .fillColor('#003366')
        .fontSize(30)
        .font('Helvetica-Bold')
        .text('Certificate of Completion', {
          align: 'center',
          underline: true
        });

      doc.moveDown(2);

      // Subtitle
      doc
        .fillColor('black')
        .fontSize(16)
        .font('Helvetica')
        .text('This is to certify that', { align: 'center' });

      doc.moveDown(1);

      // Name
      doc
        .fillColor('#1a75ff')
        .fontSize(22)
        .font('Helvetica-Bold')
        .text(userName || 'Recipient Name', {
          align: 'center',
          underline: true
        });

      doc.moveDown(1);

      doc
        .fillColor('black')
        .fontSize(16)
        .font('Helvetica')
        .text('has successfully completed the course', {
          align: 'center'
        });

      doc.moveDown(1);

      // Course name
      doc
        .fillColor('#009933')
        .fontSize(20)
        .font('Helvetica-BoldOblique')
        .text(courseName || 'Course Name', {
          align: 'center',
          underline: true
        });

      doc.moveDown(2);

      // Date
      doc
        .fillColor('black')
        .fontSize(14)
        .font('Helvetica')
        .text(`Date: ${new Date(date).toLocaleDateString('en-IN')}`, {
          align: 'center'
        });

      doc.moveDown(5);

      // Signature
      doc
        .fontSize(14)
        .fillColor('black')
        .text('________________________', { align: 'right' })
        .text('Authorized Signature', { align: 'right' });

      doc.moveDown(2);

      // Footer - Company name
      doc
        .fontSize(12)
        .fillColor('gray')
        .font('Helvetica-Oblique')
        .text('Issued by Dubai Institute of Computer Science', {
          align: 'center'
        });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};
