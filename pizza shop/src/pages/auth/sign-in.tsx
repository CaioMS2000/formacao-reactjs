import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

const signInformSchema = z.object({
    email: z.string().email('Informe um e-mail válido'),
})
type SignInSchema = z.infer<typeof signInformSchema>

export function SignIn() {
    const [searchParams] = useSearchParams()
    const {register, handleSubmit, formState:{isSubmitting}} = useForm<SignInSchema>({
        defaultValues: {
            email: searchParams.get('email') ?? '',
        },
    })
    const {mutateAsync: authenticate} = useMutation({
        mutationFn: signIn
    })

    async function handleAuthenticate({ email }: SignInSchema) {
        try {
          await authenticate({ email })
    
          toast.success('Link de autenticação enviado para o seu e-mail', {
            action: {
              label: 'Reenviar',
              onClick: () => authenticate({ email }),
            },
          })
        } catch (err) {
          toast.error('Credenciais inválidas')
        }
      }

    return (
        <>
            <Helmet title="Login" />
            <div className="p-8">
                <Button asChild variant="link" className='absolute right-8 top-8'>
                    <Link to="/sign-up">Novo estabelecimento</Link>
                </Button>
                <div className="w-[350px] flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Acessar painel
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Acompanhe suas vendas pelo painel do parceiro!
                        </p>
                    </div>
                    <form className="space-y-4" onSubmit={handleSubmit(handleAuthenticate)}>
                        <div className="space-y-2">
                            <Label htmlFor="email">Seu e-mail</Label>
                            <Input id="email" type="email" {...register('email')} />
                        </div>
                        <Button disabled={isSubmitting} className='w-full' type="submit">Acessar painel</Button>
                    </form>
                </div>
            </div>
        </>
    )
}
