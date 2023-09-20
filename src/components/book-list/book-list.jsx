import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import Select from 'react-select';
import BookCard from '../book-card';
import { User } from '../../context/use-user';
import { Books } from '../../context/use-books';
import magnifyingGlass from '../../images/magnifying-glass.png';
import './book-list.scss';

export default function BookList() {
  const { setUserName } = useContext(User);
  const { books } = useContext(Books);
  const navigate = useNavigate();

  const [currentBooks, setCurrentBooks] = useState(books);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    const person = JSON.parse(user);

    if (user) {
      setUserName(person.name);
    } else {
      navigate('/');
    }
  }, [navigate, setUserName]);

  const selectableOptions = [
    { value: 'All', label: 'All' },
    { value: '0-15', label: '0-15' },
    { value: '15-30', label: '15-30' },
    { value: '30 or more', label: '30 or more' },
  ];

  const chooseCurrentPrice = (options) => {
    if (options.value === 'All') {
      setCurrentBooks(books);
    } else if (options.value === '0-15') {
      setCurrentBooks(books.filter((el) => el.price > 0 && el.price <= 15));
    } else if (options.value === '15-30') {
      setCurrentBooks(books.filter((el) => el.price > 15 && el.price <= 30));
    } else if (options.value === '30 or more') {
      setCurrentBooks(books.filter((el) => el.price > 30));
    }
  };

  const searchBooks = currentBooks.filter((el) =>
    el.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="book__search">
        <img src={magnifyingGlass} alt="" className="magnifying_glass" />
        <input
          type="text"
          placeholder="Search by book name"
          className="input-lg search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          className="price"
          placeholder="Select price"
          options={selectableOptions}
          onChange={chooseCurrentPrice}
          autoFocus={true}
        />
      </div>
      <Row className="d-flex content">
        {search.length > 0
          ? searchBooks.map((item) => <BookCard book={item} key={item.id} />)
          : currentBooks.map((item) => <BookCard book={item} key={item.id} />)}
      </Row>
    </>
  );
}
