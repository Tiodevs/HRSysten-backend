import { hash, genSalt } from 'bcryptjs'
import prismaClient from "../../prisma"

interface UserRequest {
  userId: string
  day: string
}

class CreatePresenceDayService {
  async execute({ userId, day}: UserRequest) {

    // Verifica se tem alguim campo vazio
    if (!userId) {
      throw new Error("User não enviado")
    }
    if (!day) {
      throw new Error("Data não enviado")
    }

    // Cria o registro do dia presencial
    const presenceDay = await prismaClient.presenceDay.create({
      data: {
        userId,
        day: new Date(day), // Armazena a data enviada
      },
    });

    return presenceDay

  }
}

export { CreatePresenceDayService }