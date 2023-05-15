import type { User } from '@prisma/client'

import type { MutationResolver, QueryResolver, ResolverHandler } from '@/types'

import { UserService } from './user.service'

export const allUsersResolver: ResolverHandler<Promise<User[]>> = (
  __,
  _,
  context,
) => {
  return UserService.getAllUsers(context.prisma)
}

export const userInfoResolver: QueryResolver<'user'> = (__, args, context) => {
  return UserService.getUser(context.prisma, args.id)
}

export const loginResolver: MutationResolver<'login'> = (_, args, context) => {
  return UserService.login(context.prisma, args.email)
}

export const registResolver: MutationResolver<'regist'> = (
  __,
  args,
  context,
) => {
  return UserService.regist(context.prisma, args.email, args.name)
}
