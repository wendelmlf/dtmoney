import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import Modal from 'react-modal';
import { NewTransactionModal } from "./components/NewTransactionModal";
import {  TransactionsProvider } from "./components/hooks/useTransactions";


Modal.setAppElement('#root');

export function App() {

  const [isNewTransactionsModalOpen, setIsNewTransactionModalOpen]= useState(false); //aqui a variavel 'isNewTransactionsModalOpen' armazena o estado e a função 'setIsNewTransactionModalOpen' par atrocar o estado da variavel
    
  function handleOpenNewTransactionModal() {
      setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
      setIsNewTransactionModalOpen(false);
  }

  return (

    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
      <Dashboard />
      <NewTransactionModal 
        isOpen={ isNewTransactionsModalOpen }
        onRequestClose = { handleCloseNewTransactionModal }
      />
      <GlobalStyle />
    </TransactionsProvider>
  );
}


