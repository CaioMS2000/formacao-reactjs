import { google } from "googleapis";
import { prisma } from "./prisma";
import dayjs from "dayjs";

export async function getGoogleOAuthToken(userId: string){
    const account = await prisma.account.findFirstOrThrow({
        where: {
            provider: 'google',
            userId,
        }
    })
    const auth = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
    )

    auth.setCredentials({
        access_token: account.accessToken,
        refresh_token: account.refreshToken,
        expiry_date: account.expiresAt ? account.expiresAt * 1000 : null,
    })

    if(!account.expiresAt){
        return auth
    }

    const isTokenExpired = dayjs(account.expiresAt * 1000).isBefore(new Date())

    if(isTokenExpired){
        const { credentials } = await auth.refreshAccessToken()
        const {
            access_token,
            expiry_date,
            refresh_token
        } = credentials

        await prisma.account.update({
            where: {
                id: account.id
            },
            data: {
                accessToken: access_token,
                expiresAt: expiry_date ? Math.floor(expiry_date / 1000) : null,
                refreshToken: refresh_token
            }
        })
        auth.setCredentials({
            access_token,
            refresh_token,
            expiry_date
        })

    }
    
    return auth
}