import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import senderRoutes from './routes/sender.route.js';
import receiverRoutes from './routes/receiver.route.js';
import otpRoutes from './routes/otp.route.js';



dotenv.config();



const app = express();

app.use(express.json());


mongoose.connect(process.env.MONGO)
.then(()=>{
  console.log('mongodb connected');

})
.catch((err)=>{
  console.log(err);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});






app.use('/api/auth', authRoutes);
app.use('/api/sender', senderRoutes);
app.use('/api/receiver', receiverRoutes);
app.use('/api/otp', otpRoutes);





//middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 501;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
