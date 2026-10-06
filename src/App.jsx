import { useState } from 'react';

export default function App() {
  const [name, setName] = useState('');
  const [marks, setMarks] = useState('');
  const [error, setError] = useState('');
  const [records, setRecords] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Please enter a student name.');
      return;
    }

    const numericMarks = Number(marks);
    if (marks.trim() === '' || isNaN(numericMarks) || numericMarks < 0 || numericMarks > 100) {
      setError('Marks must be a valid number between 0 and 100.');
      return;
    }

    const newRecord = {
      id: Date.now(),
      name: name.trim(),
      marks: numericMarks,
      status: numericMarks >= 40 ? 'Pass' : 'Fail',
    };

    setRecords([newRecord, ...records]);
    setName('');
    setMarks('');
    setError('');
  };

  return (
    <div
      style={{
        backgroundColor: '#111827',
        border: '1px solid #1f2937',
        borderRadius: '16px',
        padding: '28px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
      }}
    >
      <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#f9fafb', marginBottom: '20px', letterSpacing: '-0.01em' }}>
        Student Marks
      </h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#9ca3af', marginBottom: '6px' }}>
            Student Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            style={{
              width: '100%',
              padding: '10px 14px',
              fontSize: '14px',
              color: '#f9fafb',
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#9ca3af', marginBottom: '6px' }}>
            Marks (0 - 100)
          </label>
          <input
            type="number"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            placeholder="Enter marks"
            min="0"
            max="100"
            style={{
              width: '100%',
              padding: '10px 14px',
              fontSize: '14px',
              color: '#f9fafb',
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {error && (
          <p style={{ color: '#f87171', fontSize: '13px', margin: 0 }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          style={{
            marginTop: '4px',
            padding: '11px 16px',
            backgroundColor: '#6366f1',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#4f46e5')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#6366f1')}
        >
          Add Student
        </button>
      </form>

      <div style={{ marginTop: '28px', borderTop: '1px solid #1f2937', paddingTop: '20px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#e5e7eb', marginBottom: '14px' }}>
          Submitted Records
        </h3>

        {records.length === 0 ? (
          <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
            No records submitted yet.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {records.map((record) => (
              <div
                key={record.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: record.status === 'Pass' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)',
                  backgroundColor: record.status === 'Pass' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(244, 63, 94, 0.08)',
                }}
              >
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#f9fafb' }}>
                    {record.name}
                  </div>
                  <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '2px' }}>
                    Score: {record.marks} / 100
                  </div>
                </div>

                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: '700',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    color: record.status === 'Pass' ? '#34d399' : '#fb7185',
                    backgroundColor: record.status === 'Pass' ? 'rgba(16, 185, 129, 0.18)' : 'rgba(244, 63, 94, 0.18)',
                  }}
                >
                  {record.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
