import { registerRestaurant } from '@/api/register-restaurant'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

const signUpformSchema = z.object({
    email: z.string().email('Informe um e-mail válido'),
    restaurantName: z.string().min(2, 'Informe o nome do seu restaurante'),
    managerName: z.string(),
    phone: z.string(),
})
type SignUpFormData = z.infer<typeof signUpformSchema>

export function SignUp() {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<SignUpFormData>()
    const { mutateAsync: registerRestaurantFn } = useMutation({
        mutationFn: registerRestaurant,
    })

    async function handleSignUp(data: SignUpFormData) {
        try {
            registerRestaurantFn({
                email: data.email,
                restaurantName: data.restaurantName,
                phone: data.phone,
                managerName: data.managerName,
            })
            toast.success('Restaurante cadastrado com sucesso', {
                action: {
                    label: 'Login',
                    onClick: () => {
                        navigate(`/sign-in?email=${data.email}`)
                    },
                },
            })
        } catch (error) {
            toast.error('Erro ao criar sua conta')
        }
    }

    return (
        <>
            <Helmet title="Cadastro" />
            <div className="p-8">
                <Button
                    asChild
                    variant="link"
                    className="absolute right-8 top-8"
                >
                    <Link to="/sign-in">Fazer login</Link>
                </Button>
                <div className="w-[350px] flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Criar conta gratuitamente
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Seja um parceiro e comece a vender agora!
                        </p>
                    </div>
                    <form
                        className="space-y-4"
                        onSubmit={handleSubmit(handleSignUp)}
                    >
                        <div className="space-y-2">
                            <Label htmlFor="restaurantName">
                                Nome do estabelecimento
                            </Label>
                            <Input
                                id="restaurantName"
                                type="text"
                                {...register('restaurantName')}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="managerName">Seu nome</Label>
                            <Input
                                id="managerName"
                                type="text"
                                {...register('managerName')}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input
                                id="email"
                                type="email"
                                {...register('email')}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Telefone</Label>
                            <Input
                                id="phone"
                                type="tel"
                                {...register('phone')}
                            />
                        </div>
                        <Button
                            disabled={isSubmitting}
                            className="w-full"
                            type="submit"
                        >
                            Concluir
                        </Button>

                        <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                            Ao continuar você concorda com nossos{' '}
                            <a
                                className="underline underline-offset-4"
                                href="#"
                            >
                                termos de serviço
                            </a>
                            {' e '}{' '}
                            <a
                                className="underline underline-offset-4"
                                href="#"
                            >
                                políticas de privacidade
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}
