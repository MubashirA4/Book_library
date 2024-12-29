import React, { useState } from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';
import Book1 from '../assets/Great gatsby.jpg'
import Book2 from '../assets/1984.jpg'
import Book3 from '../assets/To_Kill_a_Mockingbird_(first_edition_cover).jpg'
import Book4 from '../assets/the-lord-of-the-rings-book-cover.jpg'
import Book5 from '../assets/The republic.jpeg'

const booksData = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Classic', borrowed: false, image: Book1 },
  { id: 2, title: '1984', author: 'George Orwell', category: 'Dystopian', borrowed: false, image: Book2 },
  { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Classic', borrowed: true, image: Book3 },
  { id: 4, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', category: 'Fantasy', borrowed: false, image: Book4 },
  { id: 5, title: 'The Republic', author: 'Plato', category: 'Philosophy', borrowed: false, image: Book5 },
];

const BookLibrary = () => {
  const [books, setBooks] = useState(booksData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newBook, setNewBook] = useState({ title: '', author: '', category: '', image: null });

  const [categories, setCategories] = useState(['All', ...new Set(booksData.map((book) => book.category))]);

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  
  const toggleBorrowedStatus = (id) => {
    setBooks(books.map(book => book.id === id ? { ...book, borrowed: !book.borrowed } : book));
  };

  const handleAddBook = () => {
    if (newBook.title && newBook.author && newBook.category) {
      const imageUrl = newBook.image ? URL.createObjectURL(newBook.image) : '';
      setBooks([...books, { id: books.length + 1, ...newBook, image: imageUrl, borrowed: false }]);
      setNewBook({ title: '', author: '', category: '', image: null });
    }
  };

  const filteredBooks = books.filter(book => {
    return book.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === 'All' || book.category === selectedCategory);
  });

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <Header />

      <div className="flex flex-col md:flex-row justify-between items-center mt-4 mb-6 gap-4">
        <input
          type="text"
          className="w-full md:w-1/4 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
          placeholder="Search books..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <select
          className="w-full md:w-1/4 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Add New Book Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add a New Book</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
            placeholder="Book Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          />
          <input
            type="text"
            className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
            placeholder="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          />
          <input
            type="text"
            className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
            placeholder="Category"
            value={newBook.category}
            onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
          />
          <input
            type="file"
            accept="image/*"
            className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setNewBook({ ...newBook, image: e.target.files[0] })}
          />
        </div>
        {newBook.image && (
          <img
            src={URL.createObjectURL(newBook.image)}
            alt="Preview"
            className="w-32 h-32 mt-4"
          />
        )}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow"
          onClick={handleAddBook}
        >
          Add Book
        </button>
      </div>

      {/* Display Books */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="bg-white p-5 rounded-lg shadow-md flex flex-col justify-between"
          >
            {book.image && (
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-96 rounded-lg mb-4"
              />
            )}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{book.title}</h2>
              <p className="text-gray-600">Author: {book.author}</p>
              <p className="text-gray-600">Category: {book.category}</p>
            </div>
            <button
              className={`mt-4 px-4 py-2 rounded-lg shadow text-white ${
                book.borrowed ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              }`}
              onClick={() => toggleBorrowedStatus(book.id)}
            >
              {book.borrowed ? 'Return Book' : 'Borrow Book'}
            </button>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default BookLibrary;
