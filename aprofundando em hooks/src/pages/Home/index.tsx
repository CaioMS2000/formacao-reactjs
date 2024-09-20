import { HandPalm, Play } from 'phosphor-react'
import {
    HomeContainer,
    StartCountDownButton,
    StopCountDownButton,
} from './style'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useContext } from 'react'
import { NewCycleForm } from './components/NewCycleForm'
import { CountDown } from './components/CountDown'
import { CyclesContext } from '../../context/CyclesContext'

const newCycleFormValidationSchema = z.object({
    task: z.string().min(1, 'Informe a tarefa'),
    minutesAmount: z
        .number()
        .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
        .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

type NewCycleFormData = z.infer<typeof newCycleFormValidationSchema>

export function Home() {
    const {activeCycle, createNewCycle, interruptCycle} = useContext(CyclesContext)
    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        },
    })
    const { handleSubmit, watch, reset } = newCycleForm
    const task = watch('task')
    const isSubmitDisabled = !task

    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data)
        reset()
    }

    return (
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <CountDown />

                {activeCycle ? (
                    <StopCountDownButton
                        type="button"
                        onClick={interruptCycle}
                    >
                        <HandPalm size={24} />
                        Parar
                    </StopCountDownButton>
                ) : (
                    <StartCountDownButton
                        type="submit"
                        disabled={isSubmitDisabled}
                    >
                        <Play size={24} />
                        Começar
                    </StartCountDownButton>
                )}
            </form>
        </HomeContainer>
    )
}
