import { Router } from 'express'
import AuthRoutes from '@modules/auth/infra/http/routes/auth'

const router = Router()

router.use('/auth', AuthRoutes)

export default router
