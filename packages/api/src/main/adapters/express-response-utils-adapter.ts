import { type HttpResponseUtils } from '@/adapters/presentation/controllers/ports/http'
import { type Response } from 'express'

export const adaptResponseUtils = (res: Response): HttpResponseUtils => ({
  ok (body: any) {
    return () => res.status(200).json(body)
  },
  badRequest (error: Error) {
    return () => res.status(400).json({ error: error.message })
  },
  serverError (reason: string) {
    return () => res.status(500).json({ error: reason })
  }
})
