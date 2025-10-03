import axios from "axios";
import { CANCELLED } from "dns";
import { useCallback, useState } from "react";
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

  const loadData = useCallback(async()=>{
    if(!userId) return;

    setIsLoading(true);
    try{
        await Promise.all([fetchTransactions(),fetchSummary()]);
    }
    catch(error){
        console.error("Error loading data :", error)
    }finally{
        setIsLoading(false)
    }
  },[fetchTransactions,fetchSummary,userId]);
}

export default useTransaction;
