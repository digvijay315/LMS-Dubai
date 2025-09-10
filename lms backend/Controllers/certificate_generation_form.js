const Certificate = require('../Modal/certficate_generation');
const { generatePDF } = require('../utils/pdfGenerator');

exports.generateCertificate = async (req, res) => {
  try {
    const {
      course_id,
      user_id,
      course_name,
      user_name,
      from_date,
      to_date,
      employeeId
    } = req.body;

    console.log("📥 Request body:", req.body);

    let certificate = await Certificate.findOne({
      employee_id: user_id,
      training_id: course_id
    });

    if (!certificate || !certificate.pdfData) {
      console.log("⚙️ Generating new certificate...");

      const pdfBuffer = await generatePDF({
        userName: user_name,
        courseName: course_name,
        date: new Date()
      });

      if (!certificate) {
        certificate = new Certificate({
          employeeId,
          employee_id: user_id,
          employee_name: user_name,
          training_id: course_id,
          training_name: course_name,
          from_date,
          to_date,
          pdfData: pdfBuffer
        });
      } else {
        certificate.pdfData = pdfBuffer;
      }

      await certificate.save();
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=certificate_${user_name.replace(/\s+/g, '_')}.pdf`
    );

    res.send(certificate.pdfData);
  } catch (error) {
    console.error("❌ Error generating certificate:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};






exports.downloadCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }

    if (!certificate.pdfData) {
      return res.status(404).json({ success: false, message: 'PDF not found in database' });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=certificate_${certificate._id}.pdf`);
    res.send(certificate.pdfData);

  } catch (error) {
    console.error("❌ Error in downloadCertificate:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};