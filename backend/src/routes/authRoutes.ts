import express from 'express';
import { registerUser, loginUser } from '../ controllers/authController';
import { validate } from '../middlewares/validateRequest';
import { registerSchema, loginSchema } from '../validations/authValidation';

const router = express.Router();

router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);

export default router;