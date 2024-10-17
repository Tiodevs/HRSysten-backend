import { hash, genSalt } from 'bcryptjs'
import prismaClient from "../../prisma"

interface UserRequest {
  name: string
  email: string
  password: string
  phoneNumber: string
  profilePhoto: string
  role: string
}

class CreateUserService {
  async execute({ name, email, password, phoneNumber, profilePhoto, role }: UserRequest) {

    // Verifica se tem alguim campo vazio
    if (!email) {
      throw new Error("E-mail incorreto")
    }
    if (!name) {
      throw new Error("Nome não informado")
    }
    if (!password) {
      throw new Error("Senha não informada")
    }
    if (!phoneNumber) {
      throw new Error("phoneNumber não informada")
    }
    if (!profilePhoto) {
      throw new Error("profilePhoto não informada")
    }
    if (!role) {
      throw new Error("role não informada")
    }


    // Verifica se já existe o use com o email
    const userExists = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })

    if (userExists) {
      throw new Error("Usuário já cadastrado")
    }

    // Cria a criptografia da senha
    const hashedPassword = await hash(password, 8)

    // Cria o user
    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        phoneNumber: phoneNumber,
        role: role,
        profilePhoto: profilePhoto
      },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        role: true,
        active: true,
        profilePhoto: true,
      }
    })

    return user

  }
}

export { CreateUserService }