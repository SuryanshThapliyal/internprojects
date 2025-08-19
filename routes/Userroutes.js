import express from 'express'
import { addSchool, listSchool } from '../controllers/userControler.js'

const router = express.Router()

router.post('/addSchool', addSchool )

router.get('/listSchool', listSchool)

export default router;