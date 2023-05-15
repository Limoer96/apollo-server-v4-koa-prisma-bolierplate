import {
  inputObjectType,
  intArg,
  mutationType,
  nonNull,
  objectType,
  queryType,
  stringArg,
} from 'nexus'

import { authMiddleWare } from '@/middleware/auth'

import {
  allUsersResolver,
  loginResolver,
  registResolver,
  userInfoResolver,
} from './user.resolvers'

export const UserUniqueInput = inputObjectType({
  name: 'UserUniqueInput',
  definition(t) {
    t.string('name')
    t.nonNull.string('email')
  },
})

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.string('name')
    t.nonNull.string('email')
  },
})

export const UserQuery = queryType({
  definition(t) {
    t.nonNull.list.nonNull.field('allUsers', {
      type: 'User',
      resolve: authMiddleWare(allUsersResolver),
    })
    t.field('user', {
      type: 'User',
      args: {
        id: nonNull(intArg()),
      },
      resolve: authMiddleWare(userInfoResolver),
    })
  },
})

export const UserMutation = mutationType({
  definition(t) {
    t.field('regist', {
      type: 'Int',
      args: {
        name: stringArg(),
        email: nonNull('String'),
      },
      resolve: registResolver,
    })
    t.field('login', {
      type: 'String',
      args: {
        email: nonNull(stringArg()),
      },
      resolve: loginResolver,
    })
  },
})
