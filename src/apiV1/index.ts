import { Router } from 'express';
import auth from './auth/auth.route';
import clients from './clients/client.route';

const router: Router = Router();

router.use('/', auth);
router.use('/clients', clients);

export default router;
