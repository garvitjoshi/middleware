import { Router } from 'express';
import auth from './auth/auth.route';
import clients from './clients/client.route';
import snow from './snow/snow.route';

const router: Router = Router();

router.use('/', auth);
router.use('/clients', clients);
router.use('/snow', snow);

export default router;
