import type { PrismaClient } from '@prisma/client'
import { GraphQLError } from 'graphql'

import { generateToken } from '@/utils/token'

export class UserService {
  public static async getAllUsers(prisma: PrismaClient) {
    return prisma.user.findMany()
  }
  public static async getUser(prisma: PrismaClient, id: number) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    })
  }
  public static async regist(
    prisma: PrismaClient,
    email: string,
    name?: string | null,
  ) {
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    })
    return user.id
  }
  public static async login(prisma: PrismaClient, email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (!user) {
      throw new GraphQLError('Email does not exist!')
    }
    return generateToken(user.id)
  }
}
