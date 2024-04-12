import express from 'express';
import { sendotp } from '../controllers/sendOTP.controller.js';
const router = express.Router();


router.post('/sendotp', sendotp);





export default router;