import { ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
	  
export function AccountMenu(){
	  
	return(
        <DropdownMenu>
			<DropdownMenuTrigger asChild>
				
				<Button variant={'outline'} className="flex items-center gap-2 select-none">
					Pizza Shop <ChevronDown className='w-4 h-4' />
				</Button>
			</DropDownMenuTrigger>
		</DropDownMenu>
	)
}
