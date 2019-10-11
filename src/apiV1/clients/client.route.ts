import Controller from './client.controller';
import { Router } from 'express';

const router: Router = Router();
const controller = new Controller();

// Register New Client
router.post('/register', controller.register);

// Retrieve all Clients
router.get('/findAll', controller.findAll);

// Retrieve a Specific client
router.get('/:client_id', controller.findOne);

// Update a client with Id
router.put('/:client_id', controller.update);

// Delete a client with Id
// router.delete('/:client_id', controller.remove);

export default router;
