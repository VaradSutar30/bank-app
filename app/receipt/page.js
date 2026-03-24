"use client";

import { useState } from "react";
import axios from "axios";
import { FaCashRegister, FaCreditCard, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ReceiptForm() {
  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [date, setDate] = useState("");
  const [customerData, setCustomerData] = useState(null);
  const [showAccount, setShowAccount] = useState(false);

  // Save receipt
  const handleSubmit = async () => {
    if (!name || !accountNumber || !amount || !date) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await axios.post("/api/receipts", {
        name,
        accountNumber,
        amount,
        paymentMethod,
        date,
      });
      alert("Receipt saved successfully");
      setName("");
      setAccountNumber("");
      setAmount("");
      setPaymentMethod("cash");
      setDate("");
      setShowAccount(false);
    } catch (err) {
      alert("Error saving data");
    }
  };

  // Fetch customer account info
  const fetchCustomerAccount = async () => {
    if (!accountNumber) {
      alert("Enter account number to view details");
      return;
    }
    try {
      const res = await axios.get(`/api/customers/${accountNumber}`);
      setCustomerData(res.data);
      setShowAccount(true);
    } catch (err) {
      alert("Customer not found");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8"
      >
        {/* Bank Header */}
        <h1 className="text-3xl font-bold text-blue-900 mb-2 text-center">
          Bank Of Next.js
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Receipt Entry & Account Portal
        </p>

        {/* Customer Info */}
        <input
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded p-3 w-full mb-4 focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          placeholder="Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="border border-gray-300 rounded p-3 w-full mb-4 focus:ring-2 focus:ring-blue-500 transition"
        />

        {/* Amount */}
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-300 rounded p-3 w-full mb-4 focus:ring-2 focus:ring-blue-500 transition"
        />

        {/* Date */}
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 rounded p-3 w-full mb-4 focus:ring-2 focus:ring-blue-500 transition"
        />

        {/* Payment Method */}
        <div className="flex gap-4 mb-6 justify-center">
          <button
            onClick={() => setPaymentMethod("cash")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              paymentMethod === "cash"
                ? "bg-yellow-400 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FaCashRegister /> Cash
          </button>
          <button
            onClick={() => setPaymentMethod("online")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              paymentMethod === "online"
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FaCreditCard /> Online
          </button>
          <button
            onClick={() => setPaymentMethod("cheque")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              paymentMethod === "cheque"
                ? "bg-purple-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FaUserCircle /> Cheque
          </button>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="bg-blue-900 text-white w-full p-3 rounded-lg shadow-md hover:bg-blue-800 transition"
          >
            Save Receipt
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchCustomerAccount}
            className="bg-gray-800 text-white w-full p-3 rounded-lg shadow-md hover:bg-gray-700 transition"
          >
            View Customer Account
          </motion.button>
        </div>

        {/* Customer Account Details */}
        {showAccount && customerData && (
          <div className="mt-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-inner text-gray-800 dark:text-gray-200">
            <h2 className="text-xl font-semibold mb-2">{customerData.name}</h2>
            <p>
              <span className="font-semibold">Account Number:</span>{" "}
              {customerData.accountNumber}
            </p>
            <p>
              <span className="font-semibold">Balance:</span> ${customerData.balance.toFixed(2)}
            </p>
            <h3 className="font-semibold mt-3 mb-1">Transaction History:</h3>
            <ul className="list-disc pl-5 max-h-40 overflow-y-auto">
              {customerData.transactions.map((t, index) => (
                <li key={index}>
                  {t.date}: {t.type} - ${t.amount}
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );
}