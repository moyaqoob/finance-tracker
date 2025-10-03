import axios from "axios";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
const API_URL = "https://localhost:3000/api/transactions";
function useTransaction(userId: any) {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/${userId}`);
      const data = response.data;

      setTransactions(data);
    } catch (error) {
      console.error("Error fetching summary", error);
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/summary/${userId}`);
      const data = response.data;
      setSummary(data);
    } catch (error) {
      console.error("Error fetching summary", error);
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      console.error("Error loading data :", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchTransactions, fetchSummary, userId]);

  const deleteTransaction = async (id: any) => {
    try {
      const response = await axios.delete(`${API_URL}/transactions/${id}`);
      if (!response.statusText) throw new Error("Failed to delete transaction");

      loadData();
      Alert.alert("Sucess", "Transaction deleted Successfully");
    } catch (error: any) {
      console.error("Error deleting transaction", error);
      Alert.alert("Error", error.message);
    }
  };

  return {transactions,summary,isLoading,loadData,deleteTransaction}
}

export default useTransaction;
