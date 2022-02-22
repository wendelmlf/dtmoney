import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeImg from '../../assets/close.svg';
import iconImage from '../../assets/income.svg';
import outcomImage from '../../assets/outcome.svg';
import { FormEvent, useState } from 'react';
import {  useTransactions } from '../hooks/useTransactions';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {

    const {createTransaction}= useTransactions()

    const [type, setType]= useState('deposit');
    const [title, setTitle]= useState('');
    const [amount, setamount]= useState(0);
    const [category, setCategory]= useState('');

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type,
        })

    // limpando os dados na tela do modal após fecha-lo 
        setTitle('');
        setamount(0);
        setCategory('');
        setType('deposit');
        onRequestClose();

    }

    return (
        <Modal 
        isOpen={isOpen}
        onRequestClose= {onRequestClose}
        overlayClassName= "react-modal-overlay"
        className="react-modal-content"
        > 
        <button type='button' onClick={onRequestClose} className="react-modal-close">
            <img src={closeImg} alt="Fechar modal" />
        </button>
        <Container onSubmit={handleCreateNewTransaction}>
            <h2> Cadastrar Transação </h2>

            <input 
            placeholder='Título' 
            value={title}
            onChange={event => setTitle(event.target.value)}
            />

            <input
            placeholder='Valor'
            type="number" 
            value={amount}
            onChange={event => setamount(Number(event.target.value))} 
            />

            <TransactionTypeContainer>
                <RadioBox
                type='button'
                onClick={() => {setType('deposit'); }}
                isActive= {type === 'deposit'}
                activeColor= 'green'
                >
                    <img src={iconImage} alt="Entrada" />
                    <span> Entrada </span>
                </RadioBox>

                <RadioBox
                type='button'
                onClick={() => {setType('withdraw'); }}
                isActive= {type === 'withdraw'}
                activeColor= 'red'
                >
                    <img src={outcomImage} alt="Saida" />
                    <span> Saída </span>
                </RadioBox>

            </TransactionTypeContainer>

            <input 
            placeholder='Categoria'
            value={category}
            onChange={event => setCategory(event.target.value)}
            />

            <button type="submit">
                Cadastrar
            </button>
        </Container>
        </Modal>
    );
}