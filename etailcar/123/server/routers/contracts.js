import express from 'express';
import { getContracts, createContract, updateContract,removeContract, getRevenueByStatusPaid } from '../controllers/contracts.js';
import { getDetailsContractsAdmin } from '../controllers/DetailsContracts.js';

const router = express.Router();
//http://localhost:5000/posts

router.get('/', getContracts);

router.post('/', createContract);

router.post('/update', updateContract);

router.post('/remove', removeContract);

router.get('/revenue-report', getRevenueByStatusPaid);


export default router;
