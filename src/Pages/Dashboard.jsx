import React, { useEffect, useState } from "react";
import Header from "../Component/Header";
import Cards from "../Component/Cards";
import { Modal } from "antd";
import AddExpenseModal from "../Component/Modals/AddExpense";
import AddIncomeModal from "../Component/Modals/AddIncome";
import { toast } from "react-toastify";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import TransactionsTable from "../Component/TransactionsTable";
import ChartComponenets from "../Component/Charts";
import NoTransactions from "../Component/TransactionsTable/NoTransactions";

const Dashboard = () => {
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalBalance, setTotalBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [reset, setReset] = useState(false);

  const [user] = useAuthState(auth);
  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"), //moment allows to create global date and time
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
  };

  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      let newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr);
      calculateBalance();

      if (!many) toast.success("Transaction Added!");
    } catch (e) {
      console.error("Error adding document: ", e);

      if (!many) toast.error("Couldn't add transaction");
    }
  }

  async function fetchTransactions() {
    console.log("fetch called");
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      toast.success("Transactions Fetched!");
    }
    setLoading(false);
  }
  const calculateBalance = () => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpenses(expensesTotal);
    setTotalBalance(incomeTotal - expensesTotal);
  };
  let sortedTransactions = transactions.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };
  const handleReset = async (e, many) => {
    const q = query(collection(db, `users/${user.uid}/transactions`));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((docSnapshot) => {
      deleteDoc(doc(db, `users/${user.uid}/transactions/${docSnapshot.id}`))
        .then(() => {
          if (!many) toast.success("Transaction Reset Successfully");
        })
        .catch((error) => {
          if (!many) toast.error(error.message);
        });
    });

    setReset(!reset);
  };
  useEffect(() => {
    fetchTransactions();
  }, [user, reset]);
  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Header />
          <Cards
            handleReset={handleReset}
            income={income}
            expenses={expenses}
            totalBalance={totalBalance}
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
          />
          {/* <Modal visible={isExpenseModalVisible} onCancel={handleExpenseCancel} style={{fontWeight:600}} title="Add Expenses" footer={null}>Input</Modal>
        <Modal visible={isIncomeModalVisible} onCancel={handleIncomeCancel} style={{fontWeight:600}} title="Add Income" footer={null}>Expenses</Modal> */}
          {transactions && transactions.length != 0 ? (
            <ChartComponenets sortedTransactions={sortedTransactions} />
          ) : (
            <NoTransactions />
          )}
          <AddExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />
          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            showIncomeModal={showIncomeModal}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />
          <TransactionsTable
            transactions={transactions}
            addTransaction={addTransaction}
            fetchTransactions={fetchTransactions}
          />
        </>
      )}
    </>
  );
};

export default Dashboard;
