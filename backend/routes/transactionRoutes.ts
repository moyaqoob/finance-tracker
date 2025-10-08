import express from "express"
import { sql } from "../config/db.js";


const router = express.Router();


router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await sql`
            SELECT * FROM transactions
            WHERE user_id = ${userId} ORDER BY created_at DESC`;
    console.log("get teh transactions",transactions);
    res.status(200).json({
      transactions:transactions
    });
  } catch (error) {
    console.log("Error occured in the server", error);
    res.status(500).json({ message: "Server error occured" });
  }
});

router.get("/summary/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const balanceResult = await sql`
        SELECT COALESCE(SUM(amount),0) as balance FROM transactions WHERE user_id=${userId}`;

    const incomeResult = await sql`
    SELECT COALESCE(SUM(amount),0) as income FROM transactions WHERE user_id=${userId} AND amount>0`

    const expenseResult = await sql`
    SELECT COALESCE(SUM(amount),0) as expense FROM transactions WHERE user_id=${userId} AND amount<0`

    console.log("summary Result",balanceResult[0]?.balance,incomeResult[0]?.income,expenseResult[0]?.expense)
    
    res.status(200).json({
        balance:balanceResult[0]?.balance!,
        income:incomeResult[0]?.income!,
        expense:expenseResult[0]?.expense!
    })
  } catch (error) {
    console.log("Error occured in the server", error);
    res.status(500).json({ message: "Server error occured" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { title, amount, category, user_id } = req.body;

    if (!title || !amount || !category || !user_id) {
      return res.status(400).json({ message: "Empty fields" });
    }
    console.log("req body",title,amount,category,user_id)

    const transaction =
      await sql`INSERT INTO transactions(user_id,title,amount,category)
        VALUES(${user_id},${title},${amount},${category})
        RETURNING *`;

    console.log("transaction",transaction[0])

    res.status(200).json(transaction[0]);
  } catch (error) {
    console.log("Error occured in the server", error);
    res.status(500).json({ message: "Server error occured" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ message: "Not a number" });
    }

    const results = await sql`
        DELETE FROM transactions WHERE id=${id}
        RETURNING *`;

    if (results.length == 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    return res
      .status(200)
      .json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.log("Error occured in the server", error);
    res.status(500).json({ message: "Server error occured" });
  }
});




export default router;
