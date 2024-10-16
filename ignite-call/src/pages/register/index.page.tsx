import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { Container, Form, FormError, Header } from './styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { api } from '../../lib/axios'
import { NextSeo } from 'next-seo'

const registerFormSchema = z.object({
    name: z
        .string()
        .min(3, { message: 'O nome precisa ter pelo menos 3 letras.' }),
    username: z
        .string()
        .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
        .regex(/^([a-z\\-]+)$/i, {
            message: 'O usuário pode ter apenas letras e hifens.',
        })
        .transform(username => username.toLowerCase()),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerFormSchema),
    })

    async function handleRegister(data: RegisterFormData) {
        try {
            await api.post('/users', {
                name: data.name,
                username: data.username,
            })

            await router.push('/register/connect-calendar')
        } catch (error) {
            console.warn(error)
        }
    }

    useEffect(() => {
        if (router.query.username) {
            setValue('username', String(router.query.username))
        }
    }, [router.query?.username, setValue])

    return (
        <>
        <NextSeo
        title='Crie uma conta | Ignite Call'
        />
            <Container>
                <Header>
                    <Heading as="strong">Bem vindo ao Ignite Call</Heading>
                    <Text>
                        Precisamos de algumas informações para criar seu perfil!
                        Ah, você pode editar essas informações depois
                    </Text>
                    <MultiStep size={4} currentStep={1} />
                </Header>
                <Form as="form" onSubmit={handleSubmit(handleRegister)}>
                    <label>
                        <Text size="sm">Nome de usuário</Text>
                        <TextInput
                            {...register('username')}
                            prefix="ignite.com/"
                            placeholder="seu-usuario"
                        />
                        {errors.username && (
                            <FormError size="sm">
                                {errors.username.message}
                            </FormError>
                        )}
                    </label>
                    <label>
                        <Text size="sm">Nome completo</Text>
                        <TextInput
                            {...register('name')}
                            placeholder="Seu nome"
                        />
                        {errors.name && (
                            <FormError size="sm">
                                {errors.name.message}
                            </FormError>
                        )}
                    </label>

                    <Button type={'submit'}>
                        Próximo passo <ArrowRight />
                    </Button>
                </Form>
            </Container>
        </>
    )
}
