import { Adapter } from "next-auth/adapters"
import { NextApiRequest, NextApiResponse, NextPageContext } from "next"
import { parseCookies, destroyCookie } from 'nookies'
import { User, Account } from '@prisma/client'
import { prisma } from "../prisma"

export function PrismaAdapter(req: NextApiRequest | NextPageContext['req'], res: NextApiResponse | NextPageContext['res']): Adapter {
    return {
      async createUser(user: User) {
        const {'@ignitecall:userId': userIdOnCookies} = parseCookies({req})

        if (!userIdOnCookies) {
            throw new Error('User ID not found on cookies.')
          }
    
          const prismaUser = await prisma.user.update({
            where: {
              id: userIdOnCookies,
            },
            data: {
              name: user.name,
              email: user.email,
              avatarUrl: user.avatarUrl,
            },
          })
    
          destroyCookie({ res }, '@ignitecall:userId', {
            path: '/',
          })
    
          return {
            id: prismaUser.id,
            name: prismaUser.name,
            username: prismaUser.username,
            email: prismaUser.email!,
            emailVerified: null,
            avatarUrl: prismaUser.avatarUrl!,
          }
      },
      async getUser(id) {
        const user = await prisma.user.findUnique({where:{id}})

        if(!user) return null;

        return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email!,
            avatarUrl: user.avatarUrl!,
            emailVerified: null,
        }
      },
      async getUserByEmail(email) {
        const user = await prisma.user.findUnique({where:{email}})

        if(!user) return null;

        return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email!,
            avatarUrl: user.avatarUrl!,
            emailVerified: null,
        }
      },
      async getUserByAccount({ providerAccountId, provider }) {
        const account = await prisma.account.findUnique({where:{
            provider_providerAccountId:{
                provider,
                providerAccountId
            }
        }, include: {user: true}})

        if(!account) return null;

        const {user} = account

        return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email!,
            avatarUrl: user.avatarUrl!,
            emailVerified: null,
        }
      },
      async updateUser(user) {
        const prismaUser = await prisma.user.update({
            where: {id: user.id!},
            data: {
                name: user.name,
                email: user.email,
                avatarUrl: user.avatarUrl,
            }
        })

        return {
            id: prismaUser.id,
            name: prismaUser.name,
            username: prismaUser.username,
            email: prismaUser.email!,
            avatarUrl: prismaUser.avatarUrl!,
            emailVerified: null,
        }
      },
      async linkAccount(account: Account) {
        await prisma.account.create({
            data: {
              userId: account.userId,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              refreshToken: account.refreshToken,
              accessToken: account.accessToken,
              expiresAt: account.expiresAt,
              tokenType: account.tokenType,
              scope: account.scope,
              idToken: account.idToken,
              sessionState: account.sessionState,
            },
          })
      },
      async createSession({ sessionToken, userId, expires }) {
        await prisma.session.create({
            data:{
                userId,
                expires,
                sessionToken,
            }
        })

        return {
            userId,
            expires,
            sessionToken,
        }
      },
      async getSessionAndUser(sessionToken) {
        const prismaSession = await prisma.session.findUnique({
            where: {
              sessionToken: sessionToken,
            },
            include: {
              user: true,
            },
          })
    
          if (!prismaSession) {
            return null
          }
    
          const { user, ...session } = prismaSession
    
          return {
            session: {
              userId: session.userId,
              expires: session.expires,
              sessionToken: session.sessionToken,
            },
            user: {
              id: user.id,
              name: user.name,
              username: user.username,
              email: user.email!,
              emailVerified: null,
              avatarUrl: user.avatarUrl!,
            },
          }
      },
      async updateSession({ sessionToken, userId, expires }) {
        const prismaSession = await prisma.session.update({
            where: {
              sessionToken: sessionToken,
            },
            data: {
              expires,
              userId: userId,
            },
          })
    
          return {
            sessionToken: prismaSession.sessionToken,
            userId: prismaSession.userId,
            expires: prismaSession.expires,
          }
      },

      async deleteSession(sessionToken) {
        await prisma.session.delete({
          where: {
            sessionToken: sessionToken,
          },
        })
      },
    }
  }