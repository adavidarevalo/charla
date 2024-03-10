import { Router } from 'express'
import AuthRoutes from '@modules/auth/infra/http/routes/auth.routes'
import ConversationRoutes from '@modules/conversation/infra/http/routes/conversation.routes'
import MessageRoutes from '@modules/messages/infra/http/routes/message.routes'

const router = Router()

router.use('/auth', AuthRoutes)
router.use('/conversation', ConversationRoutes)
router.use('/message', MessageRoutes)

export default router
