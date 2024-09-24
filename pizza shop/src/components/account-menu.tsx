import { Building, ChevronDown, LogOut } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'

export function AccountMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={'outline'}
                    className="flex items-center gap-2 select-none"
                >
                    Pizza Shop <ChevronDown className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-56'>
				<DropdownMenuLabel className='flex flex-col'>
					<span className="">Diego Fernandes</span>
					<span className="text-xs font-normal text-muted-foreground">diego@rocketseat.com.br</span>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Building className="w-4 h-4 mr-2" />
					<span className="">Perfil da loja</span>
				</DropdownMenuItem>
				<DropdownMenuItem className='text-rose-500 dark:text-rose-400'>
					<LogOut className="w-4 h-4 mr-2" />
					<span className="">Sair</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
        </DropdownMenu>
    )
}
