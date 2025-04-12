import express from 'express';  
import { getCars, createCar, updateCar,removeCar,getCar } from '../controllers/cars.js'; 


const router = express.Router();



router.get('/', getCars); 

router.post('/get', getCar); 
router.post('/', createCar);
router.post('/update', updateCar); 
router.delete('/remove', removeCar); 
export default router;