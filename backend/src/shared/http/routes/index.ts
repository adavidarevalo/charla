import { Router } from 'express'
import AuthRoutes from '@modules/auth/infra/http/routes/auth'
import ConversationRoutes from '@modules/conversation/infra/http/routes/conversation'

const router = Router()

router.use('/auth', AuthRoutes)
router.use('/conversation', ConversationRoutes)

export default router
