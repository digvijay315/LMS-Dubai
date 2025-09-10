// controllers/certificateController.js
const CertificateData = require('../Modal/certificate_data');

const getCertificateData = async (req, res) => {
  const data = await CertificateData.findOne();
  res.json(data);
};

const saveOrUpdateCertificateData = async (req, res) => {
  const update = req.body;
    data = await CertificateData.create(update);
    res.json(data);
};

module.exports = {
  getCertificateData,
  saveOrUpdateCertificateData,
};
