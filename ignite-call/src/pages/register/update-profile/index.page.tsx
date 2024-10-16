import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Avatar, Button, Heading, MultiStep, Text, TextArea } from '@ignite-ui/react'
import { FormAnnotation, ProfileBox } from './styles'
import { Container, Header } from '../styles'
import { ArrowRight } from 'phosphor-react'
import { useSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import { unstable_getServerSession, getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../../api/auth/[...nextauth].api'
import { useRouter } from 'next/router'
import { api } from '../../../lib/axios'

const updateProfileSchema = z.object({
    bio: z.string(),
})

type UpdateProfileData = z.infer<typeof updateProfileSchema>

export default function UpdateProfile() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<UpdateProfileData>({
        resolver: zodResolver(updateProfileSchema),
    })
    const session = useSession()
    const router = useRouter()

    async function handleUpdateProfile(data: UpdateProfileData) {
        await api.put('/users/profile', {bio: data.bio})
        await router.push(`/schecule/${session.data?.user.username}`)
    }

    return (
        <>
            <Container>
                <Header>
                    <Heading as="strong">Bem-vindo ao Ignite Call</Heading>
                    <Text>
                        Precisamos de algumas informações para criar seu perfil!
                        Ah, você pode editar essas informações depois
                    </Text>
                    <MultiStep size={4} currentStep={4} />
                </Header>
                <ProfileBox
                    as="form"
                    onSubmit={handleSubmit(handleUpdateProfile)}
                >
                    <label>
                        <Text size={'sm'}>Foto de perfil</Text>
                        <Avatar src={session.data?.user.avatarUrl} />
                    </label>
                    <label>
                        <Text size={'sm'}>Sobre você</Text>
                        <TextArea {...register('bio')} />
                        <FormAnnotation size={'sm'}>
                            Fale um pouco sobre você
                        </FormAnnotation>
                    </label>
                    <Button type="submit" disabled={isSubmitting}>
                        Finalizar <ArrowRight />
                    </Button>
                </ProfileBox>
            </Container>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    // const
    let session = await unstable_getServerSession(
        req,
        res,
        buildNextAuthOptions(req, res)
    ) // aparentemente 'unstable_getServerSession' foi renomeado para 'getServerSession'
    session = await getServerSession(req, res, buildNextAuthOptions(req, res))
    return { props: { session } }
}
