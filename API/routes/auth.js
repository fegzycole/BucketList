import express from 'express';
import login from '../controllers/login';
import validatelogin from '../middlewares/validations/login';
import logout from '../controllers/logout';
import auth from '../middlewares/authentication/auth';

const router = express.Router();

router.post('/login', validatelogin, login);
router.get('/logout', auth, logout);

export default router;
