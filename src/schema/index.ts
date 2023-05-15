import path from 'path'

import { DateTimeResolver, JSONObjectResolver } from 'graphql-scalars'
import { makeSchema, asNexusMethod } from 'nexus'

import customSchema from './schema'

const jsonScalar = asNexusMethod(JSONObjectResolver, 'json')
const dateTimeScalar = asNexusMethod(DateTimeResolver, 'date')

const schema = makeSchema({
  types: {
    jsonScalar,
    dateTimeScalar,
    ...customSchema,
  },
  outputs: {
    schema: path.join(process.cwd(), 'schema.graphql'),
    typegen: path.join(process.cwd(), 'src/generated/types.d.ts'),
  },
  sourceTypes: {
    modules: [{ module: '@prisma/client', alias: 'prisma' }],
  },
  contextType: {
    module: path.join(process.cwd(), 'src/context.ts'),
    export: 'Context',
  },
})

export default schema
