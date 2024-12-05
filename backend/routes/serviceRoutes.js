const express = require('express');
const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');

const router = express.Router();

// CRUD Endpoints for Services
router.get('/', getAllServices);             // GET all services
router.get('/:id', getServiceById);          // GET service by ID
router.post('/', createService);             // CREATE new service
router.put('/:id', updateService);           // UPDATE service
router.delete('/:id', deleteService);        // DELETE service

module.exports = router;
