import * as Dialog from '@radix-ui/react-dialog'
import {
    CloseButton,
    Content,
    Overlay,
    TransactionTypeButton,
    TrasactionType,
} from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
    const { createTransaction } = useContextSelector(TransactionsContext, (context) => {
        return {
            createTransaction: context.createTransaction,
        }
    })
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { isSubmitting },
    } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues: {
            type: 'income',
        },
    })

    async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
        createTransaction({
            category: data.category,
            description: data.description,
            price: data.price,
            type: data.type,
        })

        reset()
    }

    return (
        <>
            <Dialog.Portal>
                <Overlay />
                <Content>
                    <Dialog.Title>Nova transação</Dialog.Title>
                    <CloseButton>
                        <X size={24} />
                    </CloseButton>
                    <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                        <input
                            {...register('description')}
                            type="text"
                            placeholder="Descrição"
                            required
                        />
                        <input
                            {...register('price', { valueAsNumber: true })}
                            type="number"
                            placeholder="Preço"
                            required
                        />
                        <input
                            {...register('category')}
                            type="text"
                            placeholder="Categoria"
                            required
                        />

                        <Controller
                            control={control}
                            name="type"
                            render={({ field }) => {
                                return (
                                    <TrasactionType
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <TransactionTypeButton
                                            variant="income"
                                            value="income"
                                        >
                                            <ArrowCircleUp size={24} />
                                            Entrada
                                        </TransactionTypeButton>
                                        <TransactionTypeButton
                                            variant="outcome"
                                            value="outcome"
                                        >
                                            <ArrowCircleDown size={24} />
                                            Saída
                                        </TransactionTypeButton>
                                    </TrasactionType>
                                )
                            }}
                        />
                        <button type="submit" disabled={isSubmitting}>
                            Cadastrar
                        </button>
                    </form>
                </Content>
            </Dialog.Portal>
        </>
    )
}
