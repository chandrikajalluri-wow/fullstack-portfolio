/* eslint-disable react-hooks/immutability */
import React, { useEffect, useState } from 'react';
import { getMyBorrows, returnBook } from '../services/borrowService';
import { getWishlist, removeFromWishlist } from '../services/wishlistService';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const UserDashboard: React.FC = () => {
  const [borrows, setBorrows] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const bData = await getMyBorrows();
      setBorrows(bData);
      const wData = await getWishlist();
      setWishlist(wData);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load dashboard data');
    }
  };

  const handleReturn = async (borrowId: string) => {
    try {
      await returnBook(borrowId);
      toast.success('Return requested successfully. Admin will process it.');
      loadData(); // Refresh
    } catch (err) {
      console.error(err);
      toast.error('Failed to return book');
    }
  };

  const handleRemoveWishlist = async (id: string) => {
    try {
      await removeFromWishlist(id);
      toast.success('Removed from wishlist');
      loadData();
    } catch (err) {
      console.log(err);
      toast.error('Failed to remove from wishlist');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>My Dashboard</h1>
      <Link to="/books">Back to Catalog</Link>

      <section className="card" style={{ marginTop: '2rem' }}>
        <h2>My Borrows</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr
              style={{
                textAlign: 'left',
                color: 'var(--text-secondary)',
                borderBottom: '1px solid #e5e7eb',
              }}
            >
              <th style={{ padding: '1rem' }}>Book</th>
              <th>Issued Date</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {borrows.map((b) => (
              <tr key={b._id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '1rem', fontWeight: 500 }}>
                  {b.book_id?.title || 'Unknown Book (Deleted)'}
                </td>
                <td>{new Date(b.issued_date).toLocaleDateString()}</td>
                <td
                  style={{
                    color:
                      new Date() > new Date(b.return_date)
                        ? 'var(--danger-color)'
                        : 'inherit',
                  }}
                >
                  {new Date(b.return_date).toLocaleDateString()}
                </td>
                <td>
                  <span className={`status-badge status-${b.status}`}>
                    {b.status}
                  </span>
                </td>
                <td>
                  {(b.status === 'borrowed' || b.status === 'overdue') && (
                    <button
                      onClick={() => handleReturn(b._id)}
                      className="btn-secondary"
                    >
                      Request Return
                    </button>
                  )}
                  {b.status === 'return_requested' && (
                    <span
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.875rem',
                      }}
                    >
                      Pending Admin Approval
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {borrows.length === 0 && (
          <p
            style={{
              padding: '1rem',
              textAlign: 'center',
              color: 'var(--text-secondary)',
            }}
          >
            You haven't borrowed any books.
          </p>
        )}
      </section>

      <section className="card" style={{ marginTop: '2rem' }}>
        <h2>My Wishlist</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr
              style={{
                textAlign: 'left',
                color: 'var(--text-secondary)',
                borderBottom: '1px solid #e5e7eb',
              }}
            >
              <th style={{ padding: '1rem' }}>Book</th>
              <th>Author</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {wishlist.map((w) => (
              <tr key={w._id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '1rem', fontWeight: 500 }}>
                  {w.book_id ? (
                    <Link
                      to={`/books/${w.book_id._id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {w.book_id.title}
                    </Link>
                  ) : (
                    <span
                      style={{
                        color: 'var(--text-secondary)',
                        fontStyle: 'italic',
                      }}
                    >
                      Book Removed
                    </span>
                  )}
                </td>
                <td>{w.book_id?.author || '-'}</td>
                <td>
                  <button
                    onClick={() => handleRemoveWishlist(w._id)}
                    className="btn-secondary"
                    style={{
                      color: 'var(--danger-color)',
                      borderColor: 'var(--danger-color)',
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {wishlist.length === 0 && (
          <p
            style={{
              padding: '1rem',
              textAlign: 'center',
              color: 'var(--text-secondary)',
            }}
          >
            Your wishlist is empty.
          </p>
        )}
      </section>
    </div>
  );
};

export default UserDashboard;
