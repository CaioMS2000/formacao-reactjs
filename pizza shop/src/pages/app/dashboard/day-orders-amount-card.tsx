import { PropsWithChildren, HTMLProps } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Utensils } from 'lucide-react'

interface DayOrdersAmountCardProps
    extends PropsWithChildren,
        HTMLProps<HTMLElement> {}

export function DayOrdersAmountCard({ ...rest }: DayOrdersAmountCardProps) {
    return (
        <>
            <Card>
                <CardHeader className="flex-row space-y-0 items-center justify-between pb-2">
                    <CardTitle className="text-base font-semibold">
                        Pedidos (dia)
                    </CardTitle>
                    <Utensils className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="space-y-1">
                    <span className="text-2xl font-bold tracking-tight">
                        10
                    </span>
                    <p className="text-xs text-muted-foreground">
                        <span className="text-rose-500 dark:text-rose-400">
                            -4%
                        </span>{' '}
                        em relação a ontem
                    </p>
                </CardContent>
            </Card>
        </>
    )
}
