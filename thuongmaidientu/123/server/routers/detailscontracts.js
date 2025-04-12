import express from 'express';
import { getDetailsContracts, createDetailsContract, updateDetailsContract,removeDetailsContract, getDetailsContractsByUser, getDetailsContractsAdmin, getMostRentedCars } from '../controllers/DetailsContracts.js';

const router = express.Router();
//http://localhost:5000/posts

router.get('/', getDetailsContracts);
router.post('/by-useId', getDetailsContractsByUser);

router.get('/admin', getDetailsContractsAdmin);

router.post('/', createDetailsContract);

router.post('/update', updateDetailsContract);

router.post('/remove', removeDetailsContract);

router.get('/most-rented', getMostRentedCars); 

export default router;
