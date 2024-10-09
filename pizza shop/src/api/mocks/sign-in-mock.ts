import { http, HttpResponse } from 'msw'

import { SignInRequest } from '../sign-in'

export const signInMock = http.post<never, SignInRequest>(
  '/authenticate',
  async ({ request }) => {
    const { email } = await request.json()
    console.log("mock")
    console.log(email)

    if (email === 'email@mail.com') {
      return new HttpResponse(null, {
        headers: {
          'Set-Cookie': 'auth=sample-jwt-token',
        },
      })
    } else {
      return new HttpResponse(null, { status: 401, statusText: 'Mock-Unauthorized' })
    }
  },
)
