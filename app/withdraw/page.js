"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WithdrawPage() {
  const [accountNo, setAccountNo] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [showBalance, setShowBalance] = useState(false);

  useEffect(() => {
    // Simulate fetching balance
    const timer = setTimeout(() => {
      setBalance(12500.50);
      setShowBalance(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (parseFloat(amount) > balance) {
      alert("❌ Insufficient balance!");
      return;
    }
    
    setLoading(true);

    try {
      const response = await fetch("/api/receipts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Varad Sutar",
          amount: parseFloat(amount),
          account: accountNo
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Withdraw failed");
      }

      alert(`✅ ${data.message}`);
      setAccountNo("");
      setAmount("");
      setBalance(prev => prev - parseFloat(amount));

    } catch (error) {
      alert("❌ " + (error.message || "Something went wrong!"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900/90 to-purple-900 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 10 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${i * 5}%`,
              top: `${i * 3}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-2xl"
        >
          {/* Bank Header */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl px-8 py-4 rounded-3xl border border-white/20 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-2xl font-bold">🏦</span>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl">
                  SecureBank Pro
                </h1>
                <p className="text-blue-200/80 text-sm font-medium tracking-wide">Digital Banking Platform</p>
              </div>
            </div>
          </motion.div>

          {/* Glassmorphism Card */}
          <div className="bg-white/5 backdrop-blur-3xl border border-white/20 rounded-4xl p-10 shadow-3xl shadow-blue-500/20">
            {/* Balance Display */}
            <AnimatePresence>
              {showBalance && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center mb-10 p-6 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-3xl border border-emerald-400/30"
                >
                  <p className="text-blue-200/90 text-lg font-semibold mb-2">Available Balance</p>
                  <p className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                    ₹{balance.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleWithdraw} className="space-y-8">
              {/* Header */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-24 h-24 bg-gradient-to-r from-red-500/30 to-pink-500/30 rounded-3xl flex items-center justify-center mx-auto mb-6 border-4 border-red-400/40 shadow-2xl"
                >
                  <span className="text-3xl">💸</span>
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-red-300 via-pink-300 to-rose-400 bg-clip-text text-transparent drop-shadow-2xl mb-2">
                  Quick Withdraw
                </h2>
                <p className="text-blue-200/80 text-lg font-medium">Fast & Secure Transaction</p>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* Account Number */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-lg font-bold mb-4 text-blue-100 tracking-wide flex items-center gap-2">
                    🆔 Account Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your 10-digit account number"
                    value={accountNo}
                    onChange={(e) => setAccountNo(e.target.value)}
                    className="w-full p-6 bg-white/10 backdrop-blur-xl rounded-3xl text-white font-semibold text-xl placeholder-blue-200/60 border-2 border-white/20 
                             focus:border-gradient-to-r focus:border-transparent focus:bg-gradient-to-r focus:from-blue-500/20 focus:to-purple-500/20
                             focus:outline-none focus:ring-4 focus:ring-blue-500/40 hover:border-blue-400/50
                             transition-all duration-500 shadow-xl hover:shadow-2xl hover:scale-[1.02]
                             disabled:bg-white/5 disabled:cursor-not-allowed disabled:shadow-none"
                    required
                    disabled={loading}
                    maxLength={20}
                  />
                </motion.div>

                {/* Amount */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-lg font-bold mb-4 text-blue-100 tracking-wide flex items-center gap-2">
                    💰 Amount (₹)
                  </label>
                  <div className="relative group">
                    <input
                      type="number"
                      placeholder="Enter amount (e.g., 5000)"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full p-6 pl-16 bg-white/10 backdrop-blur-xl rounded-3xl text-white font-bold text-2xl placeholder-blue-200/60 border-2 border-white/20 
                               focus:border-gradient-to-r focus:border-transparent focus:bg-gradient-to-r focus:from-emerald-500/20 focus:to-blue-500/20
                               focus:outline-none focus:ring-4 focus:ring-emerald-500/40 hover:border-emerald-400/50
                               transition-all duration-500 shadow-2xl hover:shadow-3xl hover:scale-[1.02]
                               disabled:bg-white/5 disabled:cursor-not-allowed disabled:shadow-none
                               [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
                               group-hover:shadow-emerald-500/25"
                      required
                      min="0"
                      step="0.01"
                      disabled={loading}
                    />
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-400 font-black text-2xl group-hover:scale-110 transition-transform duration-300">₹</span>
                  </div>
                </motion.div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading || !accountNo || !amount || parseFloat(amount) <= 0 || parseFloat(amount) > balance}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 
                           hover:from-red-500 hover:via-rose-500 hover:to-pink-500 
                           disabled:from-gray-700 disabled:via-gray-700 disabled:to-gray-800
                           py-8 px-12 rounded-3xl font-black text-2xl shadow-3xl shadow-red-500/40
                           transition-all duration-500 hover:shadow-4xl hover:shadow-red-500/60
                           border-2 border-transparent hover:border-white/30
                           disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-4">
                    <motion.div
                      className="w-8 h-8 border-3 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="font-semibold tracking-wide">Processing Securely...</span>
                  </div>
                ) : (
                  <span>🚀 Withdraw Instantly</span>
                )}
              </motion.button>
            </form>

            {/* Security Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 pt-8 border-t border-white/10 text-center space-y-4"
            >
              <div className="flex items-center justify-center gap-4 text-sm text-blue-300/80">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span>🔒 256-bit SSL Encrypted</span>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <a 
                href="/dashboard" 
                className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 text-lg font-semibold transition-all duration-500 hover:scale-105 group"
              >
                ← Back to Dashboard
                <motion.span 
                  className="w-2 h-2 bg-blue-400 rounded-full group-hover:translate-x-2 transition-all duration-300"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}