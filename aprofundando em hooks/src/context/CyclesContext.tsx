import { createContext, ReactNode, useReducer, useState } from 'react'
import { Cycle, cyclesReducer } from '../reducers/cycle/reducer'
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from '../reducers/cycle/actions'

interface CreateCycleData {
    task: string
    minutesAmount: number
}

export interface CyclesContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    markCurrentCycleAsFinished: () => void
    setSecondsPassed: (seconds: number) => void
    createNewCycle: (data: CreateCycleData) => void
    interruptCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
    children: ReactNode
}

export function CyclesContextProvider({
    children,
}: CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(cyclesReducer, {cycles: [], activeCycleId: null})
    const {cycles, activeCycleId} = cyclesState
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleAsFinishedAction())
    }

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function createNewCycle(data: CreateCycleData) {
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        dispatch(addNewCycleAction(newCycle))
        setAmountSecondsPassed(0)
    }

    function interruptCycle() {
        dispatch(interruptCurrentCycleAction())
    }

    return (
        <CyclesContext.Provider
            value={{
                cycles,
                activeCycle,
                activeCycleId,
                amountSecondsPassed,
                markCurrentCycleAsFinished,
                setSecondsPassed,
                createNewCycle,
                interruptCycle,
            }}
        >
            {children}
        </CyclesContext.Provider>
    )
}
