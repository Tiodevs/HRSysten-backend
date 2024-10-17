import { Request, Response } from "express"
import { CreatePresenceDayService } from "../../services/PresenceDay/CreatePresenceDayService"

export class CreatePresenceDayController {
    async handle(req: Request, res: Response) {

        const { userId, day } = req.body

        
        const createPresenceDayService = new CreatePresenceDayService()

        const presenceDay = await createPresenceDayService.execute({
            userId, 
            day
        })
        
        return res.json(presenceDay)
    }
  }