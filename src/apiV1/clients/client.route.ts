import Controller from './client.controller';
import { Router } from 'express';
import verifyToken from '../../helpers/verifyToken';

const router: Router = Router();
const controller = new Controller();

// Retrieve all Clients
router.get('/', controller.findAll);

// Register New Client
router.post('/register', controller.register);

// Retrieve a Specific client
router.get('/:id', verifyToken, controller.findOne);

// Update a client with Id
router.put('/:id', verifyToken, controller.update);

// Delete a client with Id
router.delete('/:id', verifyToken, controller.remove);

export default router;
