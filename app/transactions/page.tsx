'use client';

import { useState } from 'react';

export default function Transactions() {
  const [filter, setFilter] = useState('all');

  const transactions = [
    { id: 1, description: 'Salary Deposit', amount: '+5200', date: 'May 18, 2026', type: 'income', category: 'Salary' },
    { id: 2, description: 'Whole Foods Market', amount: '-120.50', date: 'May 17, 2026', type: 'expense', category: 'Groceries' },
    { id: 3, description: 'Electric Company', amount: '-85.20', date: 'May 16, 2026', type: 'expense', category: 'Utilities' },
    { id: 4, description: 'Restaurant Dinner', amount: '-45.75', date: 'May 15, 2026', type: 'expense', category: 'Food' },
    { id: 5, description: 'Gas Station', amount: '-52.00', date: 'May 14, 2026', type: 'expense', category: 'Transportation' },
    { id: 6, description: 'Gym Membership', amount: '-50', date: 'May 13, 2026', type: 'expense', category: 'Health' },
    { id: 7, description: 'Online Transfer In', amount: '+1000', date: 'May 12, 2026', type: 'income', category: 'Transfer' },
    { id: 8, description: 'Shopping Mall', amount: '-150', date: 'May 11, 2026', type: 'expense', category: 'Shopping' },
  ];

  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === filter);

  return (
    <div className="transactions-container">
      <h1 className="page-title">Transactions</h1>

      <div className="filter-buttons">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filter === 'income' ? 'active' : ''}`}
          onClick={() => setFilter('income')}
        >
          Income
        </button>
        <button 
          className={`filter-btn ${filter === 'expense' ? 'active' : ''}`}
          onClick={() => setFilter('expense')}
        >
          Expenses
        </button>
      </div>

      <div className="transactions-table-wrapper">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Category</th>
              <th>Date</th>
              <th className="amount-column">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id} className={`transaction-row ${transaction.type}`}>
                <td className="description-cell">{transaction.description}</td>
                <td className="category-cell">{transaction.category}</td>
                <td className="date-cell">{transaction.date}</td>
                <td className={`amount-cell ${transaction.type}`}>
                  {transaction.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="transactions-summary">
        <div className="summary-item">
          <span>Total Income:</span>
          <span className="income">+$6,200</span>
        </div>
        <div className="summary-item">
          <span>Total Expenses:</span>
          <span className="expense">-$503.45</span>
        </div>
        <div className="summary-item highlight">
          <span>Net:</span>
          <span>$5,696.55</span>
        </div>
      </div>
    </div>
  );
}
