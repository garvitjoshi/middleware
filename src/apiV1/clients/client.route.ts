import Controller from './client.controller';
import { Router } from 'express';
import verifyToken from '../../helpers/verifyToken';

const router: Router = Router();
const controller = new Controller();

// Retrieve all Clients
router.get('/findAll', controller.findAll);

// Register New Client
router.post('/register', controller.register);

// Retrieve a Specific client
router.get('/:client_id', verifyToken, controller.findOne);

// Update a client with Id
router.put('/:client_id', verifyToken, controller.update);

// Delete a client with Id
// router.delete('/:client_id', verifyToken, controller.remove);

export default router;
