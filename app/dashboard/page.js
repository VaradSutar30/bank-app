"use client";
import Link from "next/link";
import { FaReceipt, FaUsers, FaExchangeAlt, FaChartBar, FaCog, FaMoneyBillWave, FaHandHoldingUsd } from "react-icons/fa";

export default function Dashboard() {
  const options = [
    { name: "Create Receipt", path: "/receipt", icon: <FaReceipt />, color: "bg-blue-300 hover:bg-blue-400" },
    { name: "View Customers", path: "/customers", icon: <FaUsers />, color: "bg-blue-300 hover:bg-blue-400" },
    { name: "Transactions", path: "/transactions", icon: <FaExchangeAlt />, color: "bg-blue-300 hover:bg-blue-400" },
    { name: "Deposit Money", path: "/deposit", icon: <FaMoneyBillWave />, color: "bg-blue-300 hover:bg-blue-400" },
    { name: "Withdraw Money", path: "/withdraw", icon: <FaHandHoldingUsd />, color: "bg-blue-300 hover:bg-blue-400" },
    { name: "Reports", path: "/reports", icon: <FaChartBar />, color: "bg-blue-300 hover:bg-blue-400" },
    { name: "Settings", path: "/settings", icon: <FaCog />, color: "bg-blue-300 hover:bg-blue-400" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 bg-blue-950 shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide">
          🏦 State Bank of India - Satara Branch
        </h1>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <h2 className="text-3xl font-semibold mb-6">Dashboard</h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {options.map((item, index) => (
            <Link key={index} href={item.path}>
              <div
                className={`${item.color} p-6 rounded-2xl shadow-xl hover:scale-105 transform transition duration-300 cursor-pointer flex items-center gap-4`}
              >
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-sm opacity-80">Click to open</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4 text-sm bg-blue-950 mt-10">
        © 2026 Bank System | Developed by Varad Sutar
      </div>
    </div>
  );
}


/* ================= DEPOSIT PAGE ================= */
export function DepositPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900 text-white">
      <form className="bg-blue-800 p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-4 text-center">💰 Deposit Money</h2>

        <input
          type="text"
          placeholder="Account Number"
          className="w-full p-2 mb-3 rounded text-black"
        />

        <input
          type="number"
          placeholder="Amount"
          className="w-full p-2 mb-3 rounded text-black"
        />

        <button className="w-full bg-green-600 py-2 rounded hover:bg-green-700 transition duration-300 cursor-pointer">
          Deposit
        </button>
      </form>
    </div>
  );
}


/* ================= WITHDRAW PAGE ================= */
export function WithdrawPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900 text-white">
      <form className="bg-blue-800 p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-4 text-center">💸 Withdraw Money</h2>

        <input
          type="text"
          placeholder="Account Number"
          className="w-full p-2 mb-3 rounded text-black"
        />

        <input
          type="number"
          placeholder="Amount"
          className="w-full p-2 mb-3 rounded text-black"
        />

        <button className="w-full bg-red-600 py-2 rounded hover:bg-red-700 transition duration-300 cursor-pointer">
          Withdraw
        </button>
      </form>
    </div>
  );
}
