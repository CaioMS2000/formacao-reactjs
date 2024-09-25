import { PropsWithChildren, HTMLProps } from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationsProps extends PropsWithChildren, HTMLProps<HTMLDivElement> {
    pageIndex: number
    totallPages: number
    perPage: number
}
	  
export default function Paginations({pageIndex, perPage, totallPages, ...rest}:PaginationsProps){
    const pages = Math.ceil(totallPages / perPage) || 1
	  
	return(
		<>
        <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
                Total de {totallPages} item(s)
            </span>
            <div className="flex items-center gap-6 lg:gap-8">
                <div className="text-sm font-medium">Página {pageIndex + 1} de {pages}</div>
                <div className="flex items-center gap-2">
                    <Button variant={'outline'} className='h-8 w-8 p-0'>
                        <ChevronsLeft className='h-4 w-4' />
                        <span className="sr-only">Primeira</span>
                    </Button>
                    <Button variant={'outline'} className='h-8 w-8 p-0'>
                        <ChevronLeft className='h-4 w-4' />
                        <span className="sr-only">Anterior</span>
                    </Button>
                    <Button variant={'outline'} className='h-8 w-8 p-0'>
                        <ChevronRight className='h-4 w-4' />
                        <span className="sr-only">Próxima</span>
                    </Button>
                    <Button variant={'outline'} className='h-8 w-8 p-0'>
                        <ChevronsRight className='h-4 w-4' />
                        <span className="sr-only">Última</span>
                    </Button>
                </div>
            </div>
        </div>
		</>
	)
}