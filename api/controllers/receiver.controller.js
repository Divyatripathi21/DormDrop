import Receiver from '../models/receiver.model.js';
import { errorHandler } from '../utils/error.js';

export const receiverForm = async (req, res, next) =>{
  const { name, registrationNumber, mobileNumber,block,room,waitTime } = req.body;

  if (
    !name ||
    !registrationNumber ||
    !mobileNumber ||
    !block||
    !room||
    !waitTime||
    name === '' ||
    registrationNumber === '' ||
    mobileNumber === ''||
    block===''||
    room===''||
    waitTime===''
  ) {
    next(errorHandler(400, 'All fields are required'));
  }

  const newReceiver = new Receiver({
    name,
    registrationNumber,
    mobileNumber,
    block,
    room,
    waitTime,
  });


  try {
    await newReceiver.save();
    res.json('Receiver data successfully received');
  } 

  catch (error)
   {
    next(error);
  }
}