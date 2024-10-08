import { render } from '@testing-library/react'
import { NavLink } from './nav-link'
import { MemoryRouter } from 'react-router-dom'

describe('Navlink', () => {
    it('should highlight nav link is the current page link', () => {
        const wrapper = render(
            <>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/">Home</NavLink>
            </>,
            {
                wrapper: ({ children }) => (
                    <MemoryRouter initialEntries={['/about']}>
                        {children}
                    </MemoryRouter>
                ),
            }
        )

        expect(wrapper.getByText('About').dataset.current).toEqual('true')
        expect(wrapper.getByText('Home').dataset.current).toEqual('false')
    })
})
