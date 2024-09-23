import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const signInformSchema = z.object({
    email: z.string().email('Informe um e-mail válido'),
    // password: z.string().min(6, 'A senha deve conter pelo menos 6 caracteres'),
})
type SignInFormData = z.infer<typeof signInformSchema>

export function SignIn() {
    const {register, handleSubmit, formState:{isSubmitting}} = useForm<SignInFormData>()

    async function handleSignIn(data: SignInFormData) {
        try {
            console.log(data)
            toast.success("Link de autenticação enviado para o seu e-mail", {
                action:{
                    label: "Tentar novamente",
                    onClick: () => {handleSignIn(data)},
                }
            })
        } catch (error) {
            toast.error("Credenciais inválidas")
        }
    }

    return (
        <>
            <Helmet title="Login" />
            <div className="p-8">
                <div className="w-[350px] flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Acessar painel
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Acompanhe suas vendas pelo painel do parceiro!
                        </p>
                    </div>
                    <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
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
