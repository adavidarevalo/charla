import { type DraftHeadersVersion } from 'express-rate-limit'

export default {
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: 'draft-7' as DraftHeadersVersion,
  legacyHeaders: false
}
