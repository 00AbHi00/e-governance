'use client';

import React, { useState } from 'react';

type Pool = {
  id: string;
  title: string;
  subCategory: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
};

type Question = {
  id: string;
  text: string;
  type: 'SELECT_ONE' | 'SELECT_MANY' | 'TEXT' | 'NUMBER';
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
};

export default function PendingReviewPage() {
  const [pendingPools, setPendingPools] = useState<Pool[]>([
    { id: '1', title: 'Maternal Health Survey', subCategory: 'Health', status: 'PENDING' },
    { id: '2', title: 'Rural Internet Use', subCategory: 'Technology', status: 'PENDING' },
  ]);

  const [pendingQuestions, setPendingQuestions] = useState<Question[]>([
    { id: 'q1', text: 'How often do you visit a health facility?', type: 'SELECT_ONE', status: 'PENDING' },
    { id: 'q2', text: 'What devices do you use to access the internet?', type: 'SELECT_MANY', status: 'PENDING' },
  ]);

  const handlePoolApproval = (id: string, approve: boolean) => {
    setPendingPools(prev =>
      prev.filter(pool => pool.id !== id)
    );
    console.log(`${approve ? 'Approved' : 'Rejected'} Pool ID:`, id);
  };

  const handleQuestionApproval = (id: string, approve: boolean) => {
    setPendingQuestions(prev =>
      prev.filter(q => q.id !== id)
    );
    console.log(`${approve ? 'Approved' : 'Rejected'} Question ID:`, id);
  };

  return (
    <div className="min-h-screen p-8 bg-slate-100 text-slate-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Pending Submissions Review</h1>

        {/* Pools */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">📋 Pending Pools</h2>
          {pendingPools.length === 0 ? (
            <p className="text-slate-500">No pending pools to review.</p>
          ) : (
            pendingPools.map(pool => (
              <div key={pool.id} className="bg-white rounded-lg shadow p-4 mb-4">
                <h3 className="text-lg font-semibold">{pool.title}</h3>
                <p className="text-slate-500">Category: {pool.subCategory}</p>
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => handlePoolApproval(pool.id, true)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handlePoolApproval(pool.id, false)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Questions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">❓ Pending Questions</h2>
          {pendingQuestions.length === 0 ? (
            <p className="text-slate-500">No pending questions to review.</p>
          ) : (
            pendingQuestions.map(q => (
              <div key={q.id} className="bg-white rounded-lg shadow p-4 mb-4">
                <h3 className="text-lg">{q.text}</h3>
                <p className="text-slate-500">Type: {q.type}</p>
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => handleQuestionApproval(q.id, true)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleQuestionApproval(q.id, false)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
