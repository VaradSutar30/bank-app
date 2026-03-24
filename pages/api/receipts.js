// pages/api/receipts.js
import { db } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, amount, account } = req.body;

    // Validation
    if (!name || !amount || !account) {
      return res.status(400).json({ message: "Name, amount, and account required" });
    }

    // Insert - PERFECT columns
    const [result] = await db.execute(
      `INSERT INTO receipts (customer_name, account, amount) 
       VALUES (?, ?, ?)`,
      [name, account, parseFloat(amount)]
    );

    console.log("✅ Inserted:", result); // Debug log

    res.status(200).json({ 
      message: `✅ Saved successfully! ID: ${result.insertId}`,
      data: { name, account, amount }
    });

  } catch (error) {
    console.error("🚨 FULL ERROR:", error);
    res.status(500).json({ 
      message: "Database Error: " + error.message,
      sqlError: error.sqlMessage || "Unknown"
    });
  }
}