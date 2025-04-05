"use client"

import { useState, FormEvent } from 'react';

export default function Form() {
  const [topic, setTopic] = useState<string>('');
  const [plan, setPlan] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPlan('');

    try {
      const res = await fetch('/api/learn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      const data: { plan?: string; error?: string } = await res.json();
      if (data.error) {
        setError(data.error);
      } else if (data.plan) {
        setPlan(data.plan);
      }
    } catch (err) {
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Personal Learning Assistant</h1>
      <form onSubmit={handleSubmit} className='flex justify-center items-center space-x-2'>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic (e.g., Learn Python)"
        //   style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        className='border-2 w-full p-2 outline-0'
        />
        <button
          type="submit"
          disabled={loading}
        //   style={{ padding: '10px 20px' }}
        className='bg-orange-400 w-full rounded hover:scale-105 duration-1000 p-2'
        >
          {loading ? 'Generating...' : 'Get Learning Plan'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {plan && (
        <div style={{ marginTop: '20px' }}>
          <h2>Your Learning Plan</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{plan}</pre>
        </div>
      )}
    </div>
  );
}