import { Button, Text, TextInput } from '@ignite-ui/react'
import { Form, FormAnnotation } from './style'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

const claimUsernameFormSchema = z.object({
    userName: z
        .string()
        .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
        .regex(/^([a-z\\-]+)$/i, {
            message: 'O usuário pode ter apenas letras e hifens.',
        })
        .transform(username => username.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ClaimUsernameFormData>({
        resolver: zodResolver(claimUsernameFormSchema),
    })
    const router = useRouter()

    async function handleClaimUsername({userName}: ClaimUsernameFormData) {
        await router.push(`/register?username=${userName}`)
    }

    return (
        <>
            <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
                <TextInput
                    {...register('userName')}
                    size={'sm'}
                    prefix="ignite.com/"
                    placeholder="seu-usuario"
                />
                <Button size={'sm'} type="submit" disabled={isSubmitting}>
                    Reservar usuário <ArrowRight />
                </Button>
            </Form>
            <FormAnnotation>
                <Text size={'sm'}>
                    {errors.userName
                        ? errors.userName.message
                        : 'Digite o nome do usuário desejado'}
                </Text>
            </FormAnnotation>
        </>
    )
}
