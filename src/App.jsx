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
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '28px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
      }}
    >
      <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#0f172a', marginBottom: '20px' }}>
        Student Marks
      </h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#475569', marginBottom: '6px' }}>
            Student Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            style={{
              width: '100%',
              padding: '10px 12px',
              fontSize: '14px',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#475569', marginBottom: '6px' }}>
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
              padding: '10px 12px',
              fontSize: '14px',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {error && (
          <p style={{ color: '#ef4444', fontSize: '13px', margin: 0 }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          style={{
            marginTop: '4px',
            padding: '10px 16px',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
          }}
        >
          Add Student
        </button>
      </form>

      <div style={{ marginTop: '28px', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a', marginBottom: '14px' }}>
          Submitted Records
        </h3>

        {records.length === 0 ? (
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>
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
                  borderColor: record.status === 'Pass' ? '#bbf7d0' : '#fecaca',
                  backgroundColor: record.status === 'Pass' ? '#f0fdf4' : '#fef2f2',
                }}
              >
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#0f172a' }}>
                    {record.name}
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
                    Score: {record.marks} / 100
                  </div>
                </div>

                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    color: record.status === 'Pass' ? '#15803d' : '#b91c1c',
                    backgroundColor: record.status === 'Pass' ? '#dcfce7' : '#fee2e2',
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
