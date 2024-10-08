import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { SignIn } from "./sign-in"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryCLient } from "@/lib/react-query"
import { HelmetProvider } from "react-helmet-async"

describe("SignIn", () => {
    it("should set default email input value if email is present on search params", () => {
        const wrapper = render(<SignIn />, {
            wrapper: ({ children }) => (
                <HelmetProvider>
                    <MemoryRouter initialEntries={['/sign-in?email=test@test.com']}>
                        <QueryClientProvider client={queryCLient}>{children}</QueryClientProvider>
                    </MemoryRouter>
                </HelmetProvider>
            ),
        })
        const emailInput = wrapper.getByLabelText('Seu e-mail') as HTMLInputElement

        expect(emailInput.value).toEqual('test@test.com')
    })
})