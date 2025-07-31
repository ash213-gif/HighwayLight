import express from 'express';
const router = express.Router();
import { Request,Response } from 'express'
import {createUser ,login} from '../Controller/user'

router.post('/createUser',createUser  )
router.post('/login',login  )
router.get('/', (req: Request ,res : Response)=>{
    res.json('thish hdiuhdi db my route ashis pancjal')
} )

export default router;
