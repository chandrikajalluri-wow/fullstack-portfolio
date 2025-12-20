import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBook } from '../services/bookService';
import { issueBook, getMyBorrows } from '../services/borrowService';
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from '../services/wishlistService';
import { getBookReviews, addReview } from '../services/reviewService';
import { toast } from 'react-toastify';

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<any>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistItemId, setWishlistItemId] = useState<string | null>(null);
  const [expectedReturnDate, setExpectedReturnDate] = useState<string | null>(
    null
  );
  const [reviews, setReviews] = useState<any[]>([]);
  const [hasBorrowed, setHasBorrowed] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchBook(id);
      checkWishlist(id);
      fetchReviews(id);
      checkBorrowStatus(id);
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
        setExpectedReturnDate(item.expectedReturnDate || null);
      } else {
        setIsWishlisted(false);
        setWishlistItemId(null);
        setExpectedReturnDate(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const checkBorrowStatus = async (bookId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const myBorrows = await getMyBorrows();
      const borrowed = myBorrows.some((b: any) => b.book_id._id === bookId);
      setHasBorrowed(borrowed);
    } catch (err) {
      console.error('Error checking borrow status:', err);
    }
  };

  const fetchReviews = async (bookId: string) => {
    try {
      const data = await getBookReviews(bookId);
      setReviews(data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
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
        console.log(err);
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

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setIsSubmitting(true);
    try {
      await addReview({ book_id: id, ...newReview });
      toast.success('Review submitted!');
      setNewReview({ rating: 5, comment: '' });
      fetchReviews(id);
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
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
            <strong>Copies:</strong> <span>{book.noOfCopies} available</span>
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
              {book.noOfCopies > 0 ? (
                <button
                  onClick={handleBorrow}
                  className="btn-primary"
                  style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
                >
                  Borrow This Book
                </button>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <button
                    disabled
                    className="btn-secondary"
                    style={{ opacity: 0.7, cursor: 'not-allowed' }}
                  >
                    Currently Unavailable
                  </button>
                  {isWishlisted && expectedReturnDate && (
                    <p
                      style={{
                        color: 'var(--primary-color)',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                      }}
                    >
                      Expected return:{' '}
                      {new Date(expectedReturnDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
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

      {/* Reviews Section */}
      <div style={{ marginTop: '3rem' }}>
        <h2
          style={{
            marginBottom: '1.5rem',
            borderBottom: '2px solid #eee',
            paddingBottom: '0.5rem',
          }}
        >
          Customer Reviews
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: hasBorrowed ? '1.5fr 1fr' : '1fr',
            gap: '3rem',
          }}
        >
          {/* Reviews List */}
          <div>
            {reviews.length > 0 ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                }}
              >
                {reviews.map((r) => (
                  <div
                    key={r._id}
                    style={{
                      padding: '1.5rem',
                      border: '1px solid #f3f4f6',
                      borderRadius: '12px',
                      backgroundColor: 'white',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <strong style={{ fontSize: '1.1rem' }}>
                        {r.user_id?.name || 'Anonymous'}
                      </strong>
                      <div style={{ color: '#fbbf24' }}>
                        {'★'.repeat(r.rating)}
                        {'☆'.repeat(5 - r.rating)}
                      </div>
                    </div>
                    <p
                      style={{
                        color: 'var(--text-secondary)',
                        lineHeight: '1.6',
                      }}
                    >
                      {r.comment}
                    </p>
                    <small
                      style={{
                        color: '#9ca3af',
                        marginTop: '1rem',
                        display: 'block',
                      }}
                    >
                      {new Date(r.reviewed_at).toLocaleDateString()}
                    </small>
                  </div>
                ))}
              </div>
            ) : (
              <p
                style={{
                  color: 'var(--text-secondary)',
                  textAlign: 'center',
                  padding: '2rem',
                }}
              >
                No reviews yet. Be the first to share your thoughts!
              </p>
            )}
          </div>

          {/* Review Form */}
          {hasBorrowed && (
            <div>
              <div
                style={{
                  position: 'sticky',
                  top: '2rem',
                  padding: '2rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '12px',
                }}
              >
                <h3 style={{ marginBottom: '1rem' }}>Write a Review</h3>
                <form onSubmit={handleSubmitReview}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label
                      style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '600',
                      }}
                    >
                      Rating
                    </label>
                    <select
                      value={newReview.rating}
                      onChange={(e) =>
                        setNewReview({
                          ...newReview,
                          rating: parseInt(e.target.value),
                        })
                      }
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: '1px solid #d1d5db',
                      }}
                    >
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Very Good</option>
                      <option value="3">3 - Good</option>
                      <option value="2">2 - Fair</option>
                      <option value="1">1 - Poor</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label
                      style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '600',
                      }}
                    >
                      Your Experience
                    </label>
                    <textarea
                      rows={4}
                      value={newReview.comment}
                      onChange={(e) =>
                        setNewReview({ ...newReview, comment: e.target.value })
                      }
                      placeholder="What did you think of this book?"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: '1px solid #d1d5db',
                        fontFamily: 'inherit',
                      }}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                    style={{ width: '100%', padding: '1rem' }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Post Review'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
