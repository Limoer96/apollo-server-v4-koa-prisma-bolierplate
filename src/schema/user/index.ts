import { GraphQLError } from 'graphql'

import prisma from 'prisma/prisma'

import { generateToken } from '@/utils/token'

import { builder } from '../../builder'

const UserUniqueInput = builder.inputType('UserUniqueInput', {
  fields: t => ({
    name: t.string(),
    email: t.string({ required: true }),
  }),
})

const User = builder.prismaObject('User', {
  fields: t => ({
    id: t.exposeInt('id', { nullable: false }),
    name: t.exposeString('name', { nullable: true }),
    email: t.exposeString('email', { nullable: false }),
  }),
})

builder.queryType({
  fields: t => ({
    allUsers: t.prismaField({
      type: [User],
      nullable: true,
      resolve: () => prisma.user.findMany(),
    }),
    user: t.prismaField({
      type: User,
      nullable: true,
      args: {
        id: t.arg.int({ required: true }),
      },
      resolve: async (_, __, args) =>
        prisma.user.findUnique({
          where: {
            id: args.id,
          },
        }),
    }),
  }),
})

builder.mutationType({
  fields: t => ({
    regist: t.prismaField({
      type: 'User',
      args: {
        input: t.arg({ type: UserUniqueInput, required: true }),
      },
      resolve: async (_, __, args) =>
        prisma.user.create({
          data: {
            name: args.input.name,
            email: args.input.email,
          },
        }),
    }),
    login: t.field({
      args: {
        email: t.arg.string({ required: true }),
      },
      type: 'String',
      resolve: async (_, args, ctx) => {
        const user = await prisma.user.findUnique({
          where: {
            email: args.email,
          },
        })
        if (!user) {
          throw new GraphQLError('Email does not exist!')
        }
        return generateToken(user.id)
      },
    }),
  }),
})
