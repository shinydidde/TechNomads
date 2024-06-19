const Service = require('../models/Service');

exports.getServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
