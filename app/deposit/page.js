"use client";
import { useState } from "react";

export default function DepositPage() {
  // ✅ State variables properly declared
  const [accountNo, setAccountNo] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDeposit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/receipts", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          name: "Varad Sutar",
          amount: parseFloat(amount),
          account: accountNo  // ✅ Now defined!
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Deposit failed");
      }

      alert(data.message);
      
      // Clear form
      setAccountNo("");
      setAmount("");

    } catch (error) {
      console.error("Deposit Error:", error);
      alert("❌ " + (error.message || "Something went wrong!"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white p-4">
      <form
        onSubmit={handleDeposit}
        className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border-4 border-green-400/50">
            💰
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
            Deposit Money
          </h2>
          <p className="text-sm opacity-75 mt-1">Enter details to deposit</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-green-200">Account Number</label>
            <input
              type="text"
              placeholder="Enter account number"
              value={accountNo}
              onChange={(e) => setAccountNo(e.target.value)}
              className="w-full p-4 bg-white/10 backdrop-blur-sm rounded-xl text-white placeholder-white/60 border-2 border-white/20 focus:border-green-400 focus:outline-none focus:ring-4 focus:ring-green-400/30 transition-all duration-300"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-green-200">Amount</label>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-4 bg-white/10 backdrop-blur-sm rounded-xl text-white placeholder-white/60 border-2 border-white/20 focus:border-green-400 focus:outline-none focus:ring-4 focus:ring-green-400/30 transition-all duration-300"
              required
              min="0"
              step="0.01"
              disabled={loading}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !accountNo || !amount}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-500 disabled:to-gray-600 py-4 rounded-2xl font-bold text-lg shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Processing...
              </span>
            ) : (
              "💰 Deposit Now"
            )}
          </button>
        </div>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <a href="/dashboard" className="text-blue-300 hover:text-blue-200 text-sm font-medium transition-colors">
            ← Back to Dashboard
          </a>
        </div>
      </form>
    </div>
  );
}