'use client';

import { useState } from 'react';

export default function Dashboard() {
  const [balance] = useState(15420.50);
  const [income] = useState(5200);
  const [expenses] = useState(1890);
  const [savingsRate] = useState(63.7);

  const recentTransactions = [
    { id: 1, description: 'Salary', amount: '+5200', date: 'May 18, 2026', type: 'income' },
    { id: 2, description: 'Grocery Store', amount: '-120', date: 'May 17, 2026', type: 'expense' },
    { id: 3, description: 'Electric Bill', amount: '-85', date: 'May 16, 2026', type: 'expense' },
    { id: 4, description: 'Restaurant', amount: '-45', date: 'May 15, 2026', type: 'expense' },
  ];

  const spendingByCategory = [
    { name: 'Groceries', amount: 320, percentage: 35 },
    { name: 'Utilities', amount: 200, percentage: 22 },
    { name: 'Transportation', amount: 250, percentage: 27 },
    { name: 'Entertainment', amount: 180, percentage: 16 },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">💼 Financial Dashboard</h1>
        <p className="dashboard-subtitle">Welcome back! Here's your financial overview</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-header">Total Balance</div>
          <div className="stat-amount">${balance.toFixed(2)}</div>
          <div className="stat-change positive">+2.5% from last month</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-header">This Month Income</div>
          <div className="stat-amount income">${income.toFixed(2)}</div>
          <div className="stat-change positive">+5.2% increase</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📉</div>
          <div className="stat-header">This Month Expenses</div>
          <div className="stat-amount expense">${expenses.toFixed(2)}</div>
          <div className="stat-change positive">-2.1% decrease</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-header">Savings Rate</div>
          <div className="stat-amount">{savingsRate}%</div>
          <div className="stat-change positive">Excellent performance</div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="transactions-section">
          <h2 className="section-title">Recent Transactions</h2>
          <div className="transactions-list">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-info">
                  <div className="transaction-description">{transaction.description}</div>
                  <div className="transaction-date">{transaction.date}</div>
                </div>
                <div className={`transaction-amount ${transaction.type}`}>
                  {transaction.amount}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="spending-section">
          <h2 className="section-title">Spending by Category</h2>
          <div className="spending-list">
            {spendingByCategory.map((category) => (
              <div key={category.name} className="spending-item">
                <div className="spending-info">
                  <div className="spending-name">{category.name}</div>
                  <div className="spending-amount">${category.amount}</div>
                </div>
                <div className="spending-bar-container">
                  <div 
                    className="spending-bar" 
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
