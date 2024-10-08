import { render } from '@testing-library/react'
import { Pagination } from './pagination'
import userEvent from '@testing-library/user-event';

const onPageChangeCallback = vi.fn()

describe('Pagination', () => {
    beforeEach(() => {
        onPageChangeCallback.mockClear()
    })

  it('should display the right amount of pages and results', () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        perPage={10}
        totalPages={100}
        onPageChange={() => {}}
      />
    )

    expect(wrapper.getByText('Página 1 de 10')).toBeInTheDocument()
    expect(wrapper.getByText('Total de 100 item(s)')).toBeInTheDocument()
  })

  it('should be able to navigate to the next page', async () => {
    const user = userEvent.setup()

    const wrapper = render(
      <Pagination
        pageIndex={0}
        perPage={10}
        totalPages={100}
        onPageChange={onPageChangeCallback}
      />
    )

    const nextPageButton = wrapper.getByRole('button', { name: 'Próxima' })

    await user.click(nextPageButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(1)
  })

  it('should be able to navigate to the previous page', async () => {
    const user = userEvent.setup()

    const wrapper = render(
      <Pagination
        pageIndex={5}
        perPage={10}
        totalPages={100}
        onPageChange={onPageChangeCallback}
      />
    )

    const nextPageButton = wrapper.getByRole('button', { name: 'Anterior' })

    await user.click(nextPageButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(4)
  })

  it('should be able to navigate to the first page', async () => {
    const user = userEvent.setup()

    const wrapper = render(
      <Pagination
        pageIndex={5}
        perPage={10}
        totalPages={100}
        onPageChange={onPageChangeCallback}
      />
    )

    const nextPageButton = wrapper.getByRole('button', { name: 'Primeira' })

    await user.click(nextPageButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(0)
  })

  it('should be able to navigate to the first page', async () => {
    const user = userEvent.setup()

    const wrapper = render(
      <Pagination
        pageIndex={0}
        perPage={10}
        totalPages={100}
        onPageChange={onPageChangeCallback}
      />
    )

    const nextPageButton = wrapper.getByRole('button', { name: 'Última' })

    await user.click(nextPageButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(9)
  })
})