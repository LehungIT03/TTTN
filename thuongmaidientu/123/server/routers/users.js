import express from 'express';
import { getUsers, createUser, updateUser,removeUser,checkloginUser } from '../controllers/users.js';

const router = express.Router();
//http://localhost:5000/posts

router.get('/', getUsers);

router.post('/', createUser);

router.post('/update', updateUser);

router.post('/remove', removeUser);

router.post('/login', checkloginUser);

export default router;
