import { PrismaClient } from '../lib/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import config from './config'

const globalForPrisma = global as unknown as {
    prisma: PrismaClient
}

const adapter = new PrismaPg({
    connectionString: config.DATABASE_URL,
})

const prisma = globalForPrisma.prisma || new PrismaClient({
    adapter,
})

if (config.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma

