import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'
import { CalendarBlank, Clock } from 'phosphor-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const confirmFormSchema = z.object({
    name: z.string().min(3, 'O nome precisa ter pelomenos 3 caracteres'),
    email: z.string().email({message: 'Este email não é válido'}),
    observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

export function ConfirmStep() {
    const {register, handleSubmit, formState:{isSubmitting, errors}} = useForm<ConfirmFormData>({resolver: zodResolver(confirmFormSchema)})

    async function handleConfirmScheduling(data: ConfirmFormData) {}

    return (
        <>
            <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
                <FormHeader>
                    <Text><CalendarBlank /> 22 de abril de 2021</Text>
                    <Text><Clock /> 11:00h</Text>
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
                    <Button type="button" variant={'tertiary'}>Cancelar</Button>
                    <Button type="submit" disabled={isSubmitting}>Confirmar</Button>
                </FormActions>
            </ConfirmForm>
        </>
    )
}
