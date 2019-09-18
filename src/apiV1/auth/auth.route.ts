import Controller from './auth.controller';
import { Router } from 'express';

const router: Router = Router();
const controller = new Controller();

// Sign In
router.post('/authenticate', controller.authenticate);

export default router;
