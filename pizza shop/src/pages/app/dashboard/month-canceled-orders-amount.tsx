import { PropsWithChildren, HTMLProps } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign } from 'lucide-react'

interface MonthCanceledOrdersAmountProps extends PropsWithChildren, HTMLProps<HTMLElement> {
}
	  
export default function MonthCanceledOrdersAmount({...rest}:MonthCanceledOrdersAmountProps){
	  
	return(
		<>
        <Card>
                <CardHeader className="flex-row space-y-0 items-center justify-between pb-2">
                    <CardTitle className="text-base font-semibold">
                        Cancelamentos (mês)
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="space-y-1">
                    <span className="text-2xl font-bold tracking-tight">
                        15
                    </span>
                    <p className="text-xs text-muted-foreground">
                        <span className="text-emerald-500 dark:text-emerald-400">
                            -3%
                        </span>{' '}
                        em relação ao mês passado
                    </p>
                </CardContent>
            </Card>
		</>
	)
}