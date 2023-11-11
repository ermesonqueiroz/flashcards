import { type Controller } from '@/adapters/presentation/controllers/ports/controller'
import { type Request, type Response } from 'express'

export function adaptRoute (controller: Controller) {
  return async ({ body }: Request, res: Response) => {
    const response = await controller.handle({ body })
    res.status(response.statusCode).json(response.body)
  }
}
