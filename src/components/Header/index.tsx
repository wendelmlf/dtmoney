import logoImg from '../../assets/logo.svg'
import { Container, Content } from './styles';


interface HeaderPropos {
    onOpenNewTransactionModal: () => void;
}

export function Header({onOpenNewTransactionModal}: HeaderPropos) {

    return (
        <Container>
            <Content>
           <img src={logoImg} alt="dtMoney" />
           <button type= "button" 
           onClick={onOpenNewTransactionModal}>
            Nova transação   
            </button>
            </Content> 
        </Container>
    );
}