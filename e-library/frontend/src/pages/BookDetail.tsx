import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBook } from '../services/bookService';
import { issueBook } from '../services/borrowService';
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from '../services/wishlistService';
import { toast } from 'react-toastify';

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<any>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistItemId, setWishlistItemId] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchBook(id);
      checkWishlist(id);
    }
  }, [id]);

  const fetchBook = async (bookId: string) => {
    try {
      const data = await getBook(bookId);
      setBook(data);
    } catch (err) {
      console.error(err);
    }
  };

  const checkWishlist = async (bookId: string) => {
    try {
      const wishlist = await getWishlist();
      const item = wishlist.find((item: any) => item.book_id._id === bookId);
      if (item) {
        setIsWishlisted(true);
        setWishlistItemId(item._id);
      } else {
        setIsWishlisted(false);
        setWishlistItemId(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleBorrow = async () => {
    if (!book) return;
    try {
      await issueBook(book._id);
      toast.success('Book borrowed successfully!');
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to borrow book');
    }
  };

  const handleToggleWishlist = async () => {
    if (!book) return;

    if (isWishlisted && wishlistItemId) {
      // Remove
      try {
        await removeFromWishlist(wishlistItemId);
        toast.info('Removed from wishlist');
        setIsWishlisted(false);
        setWishlistItemId(null);
      } catch (err: any) {
        toast.error('Failed to remove');
      }
    } else {
      // Add
      try {
        await addToWishlist(book._id);
        toast.success('Added to wishlist');
        setIsWishlisted(true);
        // Assuming res is the newItem, or valid response.
        // To be safe, re-fetch to get the correct ID.
        checkWishlist(book._id);
      } catch (err: any) {
        toast.error(err.response?.data?.error || 'Failed to add to wishlist');
      }
    }
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">
      <button
        onClick={() => navigate(-1)}
        className="btn-secondary"
        style={{ marginBottom: '1rem' }}
      >
        &larr; Back to Catalog
      </button>
      <div
        className="card"
        style={{ display: 'flex', gap: '2rem', flexDirection: 'row' }}
      >
        <div style={{ flex: 1, maxWidth: '300px' }}>
          {book.cover_image_url ? (
            <img
              src={book.cover_image_url}
              alt={book.title}
              style={{
                width: '100%',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
          ) : (
            <div
              style={{
                height: '400px',
                background: '#f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
              }}
            >
              No Image Cards
            </div>
          )}
        </div>
        <div style={{ flex: 2, padding: '1rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <span className={`status-badge status-${book.status}`}>
              {book.status.toUpperCase()}
            </span>
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
            {book.title}
          </h1>
          <h2
            style={{
              fontSize: '1.25rem',
              color: 'var(--text-secondary)',
              fontWeight: 400,
              marginBottom: '1.5rem',
            }}
          >
            by {book.author}
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '1rem 2rem',
              marginBottom: '2rem',
              color: 'var(--text-secondary)',
            }}
          >
            <strong>Genre:</strong> <span>{book.genre}</span>
            <strong>Pages:</strong> <span>{book.pages}</span>
            <strong>Price:</strong> <span>${book.price}</span>
            <strong>ISBN:</strong> <span>{book.isbn}</span>
          </div>

          <p
            style={{
              lineHeight: '1.7',
              marginBottom: '2rem',
              maxWidth: '600px',
            }}
          >
            {book.description}
          </p>

          <div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {book.status === 'available' ? (
                <button
                  onClick={handleBorrow}
                  className="btn-primary"
                  style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
                >
                  Borrow This Book
                </button>
              ) : (
                <button
                  disabled
                  className="btn-secondary"
                  style={{ opacity: 0.7, cursor: 'not-allowed' }}
                >
                  Currently Unavailable
                </button>
              )}
              <button
                onClick={handleToggleWishlist}
                className="btn-secondary"
                style={{
                  padding: '0.75rem',
                  fontSize: '1.5rem',
                  backgroundColor: 'white',
                  color: '#ef4444', // Red color for icon
                  border: '1px solid #e5e7eb', // Subtle gray border
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '50px',
                  height: '50px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                }}
                title={
                  isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'
                }
              >
                {isWishlisted ? '♥' : '♡'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
