import { MagnifyingGlass } from 'phosphor-react'
import { SearchhFormContainer } from './style'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../../../contexts/TransactionsContext'
import { useContext } from 'react'

const searchFormSchema = z.object({
    query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema),
    })
    const { fetchTransactions } = useContext(TransactionsContext)

    async function handleSearchTransactions(data: SearchFormInputs) {
        await fetchTransactions(data.query)
    }

    return (
        <SearchhFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
            <input
                type="text"
                placeholder="Busque por transações"
                {...register('query')}
            />
            <button type="submit" disabled={isSubmitting}>
                Buscar <MagnifyingGlass size={20} />
            </button>
        </SearchhFormContainer>
    )
}
