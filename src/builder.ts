/* eslint-disable import/no-named-as-default */
import SchemaBuilder from '@pothos/core'
import DataloaderPlugin from '@pothos/plugin-dataloader'
import PrismaPlugin from '@pothos/plugin-prisma'
import PrismaUtilsPlugin from '@pothos/plugin-prisma-utils'
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects'
import { DateTimeResolver, JSONObjectResolver } from 'graphql-scalars'

import client from 'prisma/prisma'

import type PrismaTypes from '../prisma/generated'

import type { Context } from './context'

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes
  Scalars: {
    ID: {
      Output: number | string
      Input: string
    }
    DateTime: {
      Output: Date
      Input: Date
    }
    JSON: {
      Input: unknown
      Output: unknown
    }
  }
  Context: Context
}>({
  plugins: [
    PrismaPlugin,
    PrismaUtilsPlugin,
    DataloaderPlugin,
    SimpleObjectsPlugin,
  ],
  prisma: {
    client,
  },
})

builder.addScalarType('DateTime', DateTimeResolver)
builder.addScalarType('JSON', JSONObjectResolver)
