import { createContext, ReactNode, useEffect, useReducer, useState } from 'react'
import { Cycle, cyclesReducer } from '../reducers/cycle/reducer'
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from '../reducers/cycle/actions'
import { differenceInSeconds } from 'date-fns'

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
    const [cyclesState, dispatch] = useReducer(cyclesReducer, {cycles: [], activeCycleId: null}, (initialState) => {
        const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')

        if (storedStateAsJSON) {
            return JSON.parse(storedStateAsJSON)
        }

        return initialState
    })
    const {cycles, activeCycleId} = cyclesState
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if(activeCycle){
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
        }
        
        return 0
    })

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

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState)

        localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
    }, [cyclesState])

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
