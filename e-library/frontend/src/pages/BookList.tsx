import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBooks } from '../services/bookService';
import { getCategories } from '../services/categoryService';
import type { Book } from '../types';

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    loadData();
  }, [search, selectedCategory]);

  const loadData = async () => {
    try {
      // Build query string
      let query = `search=${search}`;
      if (selectedCategory) query += `&category=${selectedCategory}`;

      const bookData = await getBooks(query);
      setBooks(bookData);

      if (categories.length === 0) {
        const catData = await getCategories();
        setCategories(catData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard-container">
      <header
        className="navbar"
        style={{ marginBottom: '2rem', borderRadius: '8px' }}
      >
        <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Library Catalog</h1>
        <div>
          <Link
            to="/dashboard"
            className="btn-secondary"
            style={{ marginRight: '1rem' }}
          >
            My Dashboard
          </Link>
        </div>
      </header>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Search books, authors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, margin: 0 }}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ width: '200px', margin: 0 }}
        >
          <option value="">All Categories</option>
          {categories.map((c: any) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid-books">
        {books.map((book) => (
          <div
            key={book._id}
            className="card"
            style={{ display: 'flex', flexDirection: 'column', padding: '0' }}
          >
            <div
              style={{
                height: '250px',
                overflow: 'hidden',
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
              }}
            >
              {book.cover_image_url ? (
                <img
                  src={book.cover_image_url}
                  alt={book.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: '#e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6b7280',
                  }}
                >
                  No Image
                </div>
              )}
            </div>
            <div
              style={{
                padding: '1.5rem',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                  color: 'var(--primary-color)',
                  fontWeight: 600,
                }}
              >
                {typeof book.category_id === 'object' &&
                book.category_id !== null
                  ? (book.category_id as any).name
                  : 'Uncategorized'}
              </div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>
                {book.title}
              </h3>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.875rem',
                  marginBottom: '1rem',
                }}
              >
                {book.author}
              </p>

              <div
                style={{
                  marginTop: 'auto',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  className={`status-badge status-${book.status}`}
                  style={{ fontSize: '0.75rem' }}
                >
                  {book.status}
                </span>
                <Link
                  to={`/books/${book._id}`}
                  className="btn-primary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {books.length === 0 && (
        <p
          style={{
            textAlign: 'center',
            color: 'var(--text-secondary)',
            marginTop: '2rem',
          }}
        >
          No books found matching your criteria.
        </p>
      )}
    </div>
  );
};

export default BookList;
