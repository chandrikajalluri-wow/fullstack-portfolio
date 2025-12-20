import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createBook } from '../services/bookService';
import { createCategory, getCategories } from '../services/categoryService';
import { getAllBorrows, acceptReturn } from '../services/borrowService';
import type { Book, Category, Borrow } from '../types';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('books');
  const [categories, setCategories] = useState<Category[]>([]);
  const [borrows, setBorrows] = useState<Borrow[]>([]);

  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    category_id: '',
    price: '',
    status: 'available',
    isbn: '',
    description: '',
    pages: '',
    publishedYear: '',
    cover_image_url: '',
    pdf_url: '',
    genre: '',
    language: '',
    noOfCopies: '1',
  });
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });

  const fetchCommonData = async () => {
    try {
      const cats = await getCategories();
      setCategories(cats);
    } catch (err: unknown) {
      console.error(err);
    }
  };

  const fetchBorrows = async () => {
    try {
      const data = await getAllBorrows();
      setBorrows(data);
    } catch (err: unknown) {
      console.error(err);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCommonData();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (activeTab === 'borrows') fetchBorrows();
  }, [activeTab]);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCategory(newCategory);
      toast.success('Category created');
      setNewCategory({ name: '', description: '' });
      fetchCommonData();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: unknown) {
      toast.error('Failed to create category');
    }
  };

  const handleCreateBook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: Partial<Book> = {
        ...newBook,
        price: parseFloat(newBook.price) || 0,
        pages: parseInt(newBook.pages) || 0,
        publishedYear: parseInt(newBook.publishedYear) || 0,
        noOfCopies: parseInt(newBook.noOfCopies) || 1,
      };
      await createBook(payload);
      toast.success('Book created');
      setNewBook({
        title: '',
        author: '',
        category_id: '',
        price: '',
        status: 'available',
        isbn: '',
        description: '',
        pages: '',
        publishedYear: '',
        cover_image_url: '',
        pdf_url: '',
        genre: '',
        language: '',
        noOfCopies: '1',
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: unknown) {
      toast.error('Failed to create book');
    }
  };

  const handleAcceptReturn = async (borrowId: string) => {
    try {
      await acceptReturn(borrowId);
      toast.success('Return request accepted');
      fetchBorrows();
    } catch (err) {
      console.log(err);
      toast.error('Failed to accept return');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); // if stored
    toast.info('Logged out');
    navigate('/');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '2rem',
        }}
      >
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button onClick={() => setActiveTab('books')}>Manage Books</button>
        <button onClick={() => setActiveTab('categories')}>
          Manage Categories
        </button>
        <button onClick={() => setActiveTab('requests')}>
          Return Requests
        </button>
        <button onClick={() => setActiveTab('borrows')}>View Borrows</button>
      </div>

      {activeTab === 'books' && (
        <section>
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h2>Add New Book</h2>
            <form
              onSubmit={handleCreateBook}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
              }}
            >
              {/* Basic Info */}
              <input
                type="text"
                placeholder="Title"
                value={newBook.title}
                onChange={(e) =>
                  setNewBook({ ...newBook, title: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Author"
                value={newBook.author}
                onChange={(e) =>
                  setNewBook({ ...newBook, author: e.target.value })
                }
                required
              />

              <select
                value={newBook.category_id}
                onChange={(e) =>
                  setNewBook({ ...newBook, category_id: e.target.value })
                }
                required
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Price ($)"
                value={newBook.price}
                onChange={(e) =>
                  setNewBook({ ...newBook, price: e.target.value })
                }
              />

              {/* Details */}
              <input
                type="text"
                placeholder="ISBN"
                value={newBook.isbn}
                onChange={(e) =>
                  setNewBook({ ...newBook, isbn: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Pages"
                value={newBook.pages}
                onChange={(e) =>
                  setNewBook({ ...newBook, pages: e.target.value })
                }
              />

              <input
                type="number"
                placeholder="Published Year"
                value={newBook.publishedYear}
                onChange={(e) =>
                  setNewBook({ ...newBook, publishedYear: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Language"
                value={newBook.language}
                onChange={(e) =>
                  setNewBook({ ...newBook, language: e.target.value })
                }
              />

              {/* URLs & Extra */}
              <input
                type="text"
                placeholder="Genre (Specific)"
                value={newBook.genre}
                onChange={(e) =>
                  setNewBook({ ...newBook, genre: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Cover Image URL"
                value={newBook.cover_image_url}
                onChange={(e) =>
                  setNewBook({ ...newBook, cover_image_url: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Number of Copies"
                value={newBook.noOfCopies}
                onChange={(e) =>
                  setNewBook({ ...newBook, noOfCopies: e.target.value })
                }
                required
              />

              <input
                type="text"
                style={{ gridColumn: 'span 2' }}
                placeholder="PDF URL (Optional)"
                value={newBook.pdf_url}
                onChange={(e) =>
                  setNewBook({ ...newBook, pdf_url: e.target.value })
                }
              />

              <textarea
                placeholder="Description"
                value={newBook.description}
                onChange={(e) =>
                  setNewBook({ ...newBook, description: e.target.value })
                }
                style={{
                  gridColumn: 'span 2',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  minHeight: '100px',
                  fontFamily: 'inherit',
                }}
              />

              <div style={{ gridColumn: 'span 2' }}>
                <button type="submit" className="btn-primary">
                  Add Book
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      {activeTab === 'categories' && (
        <section>
          <h2>Add New Category</h2>
          <form
            onSubmit={handleCreateCategory}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              maxWidth: '400px',
            }}
          >
            <input
              type="text"
              placeholder="Name"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={newCategory.description}
              onChange={(e) =>
                setNewCategory({ ...newCategory, description: e.target.value })
              }
            />
            <button type="submit">Add Category</button>
          </form>
          <h3>Existing Categories</h3>
          <ul>
            {categories.map((c) => (
              <li key={c._id}>{c.name}</li>
            ))}
          </ul>
        </section>
      )}

      {activeTab === 'requests' && (
        <section>
          <h2>Pending Return Requests</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left' }}>
                <th style={{ padding: '1rem' }}>User</th>
                <th>Book</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {borrows
                .filter((b) => b.status === 'return_requested')
                .map((b) => (
                  <tr key={b._id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '1rem' }}>
                      {b.user_id?.name || 'Unknown'}
                    </td>
                    <td>{b.book_id?.title || 'Unknown'}</td>
                    <td>
                      <span
                        className="status-badge"
                        style={{ backgroundColor: '#fef3c7', color: '#92400e' }}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleAcceptReturn(b._id)}
                        className="btn-primary"
                        style={{ padding: '0.5rem 1rem' }}
                      >
                        Accept Return
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {borrows.filter((b) => b.status === 'return_requested').length ===
            0 && (
            <p
              style={{
                textAlign: 'center',
                padding: '2rem',
                color: 'var(--text-secondary)',
              }}
            >
              No pending return requests.
            </p>
          )}
        </section>
      )}

      {activeTab === 'borrows' && (
        <section>
          <h2>All Borrows</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left' }}>
                <th>User</th>
                <th>Book</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {borrows.map((b) => (
                <tr key={b._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td>{b.user_id?.name || 'Unknown'}</td>
                  <td>{b.book_id?.title || 'Unknown'}</td>
                  <td>{new Date(b.return_date).toLocaleDateString()}</td>
                  <td>{b.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
};

export default AdminDashboard;
