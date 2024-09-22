import { MagnifyingGlass } from "phosphor-react";
import { SearchhFormContainer } from "./style";

export function SearchForm(){
    return (
        <SearchhFormContainer>
            <input type="text" name="" id="" placeholder="Busque por transações" />
            <button type="submit">Buscar <MagnifyingGlass size={20} /></button>
        </SearchhFormContainer>
    )
}