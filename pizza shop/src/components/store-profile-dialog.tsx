import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from './ui/button'
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { getManagedRestaurant, GetManagedRestaurantResponse } from '@/api/get-managed-restaurant'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateProfile } from '@/api/update-profile'
import { toast } from 'sonner'

const storeProfileSchema = z.object({
    name: z.string().min(3),
    description: z.string().min(3),
})
type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog() {
    const queryClient = useQueryClient()
    const { data: managedRestaurant } = useQuery({
        queryKey: ['managed-restaurant'],
        queryFn: getManagedRestaurant,
        staleTime: Number.POSITIVE_INFINITY,
    })
    const { register, handleSubmit, formState:{isSubmitting} } = useForm<StoreProfileSchema>({
        resolver: zodResolver(storeProfileSchema),
        values: {
            name: managedRestaurant?.name ?? '',
            description: managedRestaurant?.description ?? '',
        },
    })

    function updateManagedRestaurantCache({name, description}: StoreProfileSchema){
        const cached = queryClient.getQueryData<GetManagedRestaurantResponse>(['managed-restaurant'])

            if(cached){
                queryClient.setQueryData(['managed-restaurant'], {
                    ...cached,
                    name,
                    description,
                })
            }

            return {cached}
    }

    const { mutateAsync: updateProfileFn } = useMutation({
        mutationFn: updateProfile,
        onMutate: ({name, description}) => {
            const {cached} = updateManagedRestaurantCache({name, description})

            return {previousProfile: cached}
        },
        onError: (_, __, context) => {
            if(context?.previousProfile){
                updateManagedRestaurantCache(context.previousProfile)
            }
        }
    })

    async function handleUpdateProfile(data: StoreProfileSchema){
        try {
            await updateProfileFn(data)

            toast.success('Perfil atualizado com sucesso!')
        } catch (error) {
            toast.error('Ocorreu um erro ao atualizar o perfil')
        }
    }

    return (
        <>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Perfil da loja</DialogTitle>
                    <DialogDescription>
                        Atualize as informações do seu estabelecimento visíveis
                        ao seu cliente
                    </DialogDescription>
                </DialogHeader>
                <form action="" onSubmit={handleSubmit(handleUpdateProfile)}>
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Nome
                            </Label>
                            <Input
                                {...register('name')}
                                className="col-span-3"
                                id="name"
                            />
                        </div>
                    </div>
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Descrição
                            </Label>
                            <Textarea
                                {...register('description')}
                                className="col-span-3"
                                id="description"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={'ghost'} className="">
                                Cancelar
                            </Button>
                        </DialogClose>
                        <Button type="submit" variant={'success'} disabled={isSubmitting} className="">
                            Salvar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </>
    )
}
