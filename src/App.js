import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/error-boundary';
import SpecificBook from './components/specific-book/specific-book';
import Signin from './components/signin/signin';
import BookList from './components/book-list/book-list';
import Cart from './components/cart/cart';
import Layout from './routes/Layout';
import NotFoundPage from './routes/NotFoundPage';
import { User } from './context/use-user';
import { Books } from './context/use-books';
import { Order } from './context/use-order';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.scss';

function App() {
  const [userName, setUserName] = useState('');

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Флаг завантаження

  const [order, setOrder] = useState([]);

  const getBookList = async () => {
    const response = await fetch(
      'https://run.mocky.io/v3/3fd7186f-82a1-4b6d-9cd2-d32d7587d436'
    ).then((res) => res.json());
    setBooks(response.books);
    setLoading(false); // Позначаємо, що дані готові
  };

  useEffect(() => {
    getBookList();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Books.Provider value={{ books, getBookList }}>
        <User.Provider value={{ userName, setUserName }}>
          <Order.Provider value={{ order, setOrder }}>
            <ErrorBoundary>
              <HashRouter>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Signin />} />
                    <Route path="books" element={<BookList />} />
                    <Route path="books/:id" element={<SpecificBook />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Route>
                </Routes>
              </HashRouter>
            </ErrorBoundary>
          </Order.Provider>
        </User.Provider>
      </Books.Provider>
    </>
  );
}

export default App;
