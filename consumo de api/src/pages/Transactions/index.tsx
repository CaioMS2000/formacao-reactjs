import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { SearchForm } from './components/SearchForm'
import { TransactionsContainer, TransactionsTable, PriceHighlight } from './styles'

export function Transactions() {
    return (
        <div>
            <Header />
            <Summary />

            <TransactionsContainer>
            <SearchForm />
                <TransactionsTable>
                    <tbody>
                        <tr>
                            <td width="50%">Desenvolvimento de site</td>
                            <td>
                                <PriceHighlight variant="income">
                                    R$ 12.000,00
                                </PriceHighlight>
                            </td>
                            <td>Venda</td>
                            <td>13/04/2024</td>
                        </tr>
                        <tr>
                            <td width="50%">Aluguel do escritório</td>
                            <td>
                                <PriceHighlight variant="outcome">
                                    - R$ 1.500,00
                                </PriceHighlight>
                            </td>
                            <td>Despesa</td>
                            <td>05/05/2024</td>
                        </tr>
                        <tr>
                            <td width="50%">Consultoria em marketing</td>
                            <td>
                                <PriceHighlight variant="income">
                                    R$ 3.000,00
                                </PriceHighlight>
                            </td>
                            <td>Venda</td>
                            <td>20/05/2024</td>
                        </tr>
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </div>
    )
}