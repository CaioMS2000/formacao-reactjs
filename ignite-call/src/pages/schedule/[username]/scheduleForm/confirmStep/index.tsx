import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'
import { CalendarBlank, Clock } from 'phosphor-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { api } from '../../../../../lib/axios'
import { useRouter } from 'next/router'

const confirmFormSchema = z.object({
    name: z.string().min(3, 'O nome precisa ter pelomenos 3 caracteres'),
    email: z.string().email({message: 'Este email não é válido'}),
    observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

interface ConfirmStepProps{
    schedulingDate: Date
    onCancelConfirmation: () => void

}

export function ConfirmStep({schedulingDate, onCancelConfirmation}: ConfirmStepProps) {
    const {register, handleSubmit, formState:{isSubmitting, errors}} = useForm<ConfirmFormData>({resolver: zodResolver(confirmFormSchema)})
    const router = useRouter()
    const username = String(router.query.username)
    const describedDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
    const describedTime = dayjs(schedulingDate).format('HH:mm[h]')

    async function handleConfirmScheduling(data: ConfirmFormData) {
        await api.post(`/users/${username}/schedule`, {
            name: data.name,
            email: data.email,
            observations: data.observations,
            date: schedulingDate,
        })
        await router.push((`/schedule/${username}`))
    }

    return (
        <>
            <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
                <FormHeader>
                    <Text><CalendarBlank />{describedDate}</Text>
                    <Text><Clock />{describedTime}</Text>
                </FormHeader>
                <label>
                    <Text size={'sm'}>Nome completo</Text>
                    <TextInput {...register('name')} placeholder='Seu nome' />
                    {errors.name && (<FormError size='sm'>{errors.name.message}</FormError>)}
                </label>
                <label>
                    <Text size={'sm'}>Email</Text>
                    <TextInput {...register('email')} type='email' placeholder='Seu email' />
                    {errors.email && (<FormError size='sm'>{errors.email.message}</FormError>)}
                </label>
                <label>
                    <Text size={'sm'}>Observações</Text>
                    <TextArea {...register('observations')} />
                </label>
                <FormActions>
                    <Button type="button" variant={'tertiary'} onClick={onCancelConfirmation}>Cancelar</Button>
                    <Button type="submit" disabled={isSubmitting}>Confirmar</Button>
                </FormActions>
            </ConfirmForm>
        </>
    )
}
