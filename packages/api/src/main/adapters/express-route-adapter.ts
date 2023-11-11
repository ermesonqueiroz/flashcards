import { type Controller } from '@/adapters/presentation/controllers/ports/controller'
import { adaptResponseUtils } from './express-response-utils-adapter'
import { type Request, type Response } from 'express'

export function adaptRoute (controller: Controller) {
  return async ({ body }: Request, res: Response) => {
    const httpResponseUtils = adaptResponseUtils(res)
    const response = await controller.handle({ body }, httpResponseUtils)

    response()
  }
}
