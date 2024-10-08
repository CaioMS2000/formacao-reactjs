import { Button } from './ui/button'
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from 'lucide-react'

interface PaginationsProps {
    pageIndex: number
    totalPages: number
    perPage: number
    onPageChange: (page: number) => void | Promise<void>
}

export function Pagination({
    pageIndex,
    perPage,
    totalPages,
    onPageChange,
}: PaginationsProps) {
    const pages = Math.ceil(totalPages / perPage) || 1
    const isFirstPage = pageIndex === 0
    const isLastPage = pageIndex === pages - 1

    return (
        <>
            <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                    Total de {totalPages} item(s)
                </span>
                <div className="flex items-center gap-6 lg:gap-8">
                    <div className="text-sm font-medium">
                        Página {pageIndex + 1} de {pages}
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant={'outline'}
                            className="h-8 w-8 p-0"
                            disabled={isFirstPage}
                            onClick={() => onPageChange(0)}
                        >
                            <ChevronsLeft className="h-4 w-4" />
                            <span className="sr-only">Primeira</span>
                        </Button>
                        <Button
                            variant={'outline'}
                            className="h-8 w-8 p-0"
                            disabled={isFirstPage}
                            onClick={() => onPageChange(pageIndex - 1)}
                        >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Anterior</span>
                        </Button>
                        <Button
                            variant={'outline'}
                            className="h-8 w-8 p-0"
                            disabled={isLastPage}
                            onClick={() => onPageChange(pageIndex + 1)}
                        >
                            <ChevronRight className="h-4 w-4" />
                            <span className="sr-only">Próxima</span>
                        </Button>
                        <Button
                            variant={'outline'}
                            className="h-8 w-8 p-0"
                            disabled={isLastPage}
                            onClick={() => onPageChange(pages - 1)}
                        >
                            <ChevronsRight className="h-4 w-4" />
                            <span className="sr-only">Última</span>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
