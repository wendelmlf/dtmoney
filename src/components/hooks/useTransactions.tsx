import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../../services/api';

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

type TransactionInput= Omit<Transaction, 'id' | 'createdAt'>; // TransactionInput é uma Transaction sem os atributos id e createdAt pois os mesmo foram omitidos

//type TransactionInput= Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>;// neste caso o metodo Pick seleciona os atributos desejados


interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContexData {
    transactions: Transaction[];
    createTransaction: (Transaction: TransactionInput) => Promise<void>;
}

export const TransactionsContext= createContext<TransactionsContexData>(
    {} as TransactionsContexData
);

export function TransactionsProvider({children}: TransactionsProviderProps) {

    const [transactions, setTransactions]= useState<Transaction[]>([]);

    useEffect(() => {
        api.get('http://localhost:3000/api/transactions')
        .then(response => setTransactions(response.data.transactions))
    }, []);

     async function createTransaction(transactioninput: TransactionInput){

        const response=  await api.post('/transactions', {
            ...transactioninput,
            createdAt: new Date(),
        })

        const { transaction }= response.data;

        setTransactions([       //criando um novo vetor de transactions adicionando uma nova transação no final
            ...transactions, //copiando todas as informações que já estão na transaction
            transaction, //adicionando a nova informação no final
        ]);

    }

    return(
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    );
}

export function useTransactions() {
    const context= useContext(TransactionsContext);

    return context;
}