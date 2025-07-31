import express from 'express';
const router = express.Router();
import {createUser ,login} from '../Controller/user'

router.post('/createUser',createUser  )
router.post('/login',login  )

export default router;
