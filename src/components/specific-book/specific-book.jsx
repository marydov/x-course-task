import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { User } from '../../context/use-user';
import { Books } from '../../context/use-books';
import { Order } from '../../context/use-order';
import notFound from '../../images/imageNotFound.png';
import './specific-book.scss';

export default function SpecificBook() {
  const userName = useContext(User);
  const books = useContext(Books);
  const { order, setOrder } = useContext(Order);

  const { id } = useParams();
  const [bookPage, setBookPage] = useState({});

  useEffect(() => {
    let bookPageData;

    for (let item of books) {
      if (item['id'].toString() === id) {
        console.log(item['id']);
        bookPageData = item;
      }
    }

    let count = 1;
    let priceTotal = bookPageData.price;
    console.log(bookPageData);
    setBookPage({ ...bookPageData, count, priceTotal });
  }, [books, id]);

  const navigate = useNavigate();

  useEffect(() => {
    if (userName === 'Username') {
      navigate('/');
    }
  }, [navigate, userName]);

  const changeTotalPrice = (value) => {
    let inputValue = value <= 0 || value > 42 || value == '' ? 1 : value;
    setBookPage({
      ...bookPage,
      count: inputValue,
      priceTotal: +(inputValue * bookPage.price).toFixed(2),
    });
  };

  const addToOrder = (item) => {
    let isInArray = false;
    order.forEach((el) => {
      if (el.id === item.id) isInArray = true;
    });
    if (!isInArray) setOrder([...order, item]);
  };

  return (
    <>
      <article className="book__page">
        <Row className="d-flex">
          <Col md={4} className="book__image">
            <img
              src={bookPage.image === '' ? notFound : bookPage.image}
              alt={bookPage.title}
              className="book__image-img"
            />
          </Col>
          <Col md={4} className="book__information">
            <p className="book__name">
              <strong>Book name:</strong>
              {bookPage.title}
            </p>
            <p className="book__author">
              <strong>Book author:</strong>
              {bookPage.author}
            </p>
            <p className="book__level">
              <strong>Book level:</strong> Beginner
            </p>
            <p className="book__tags">
              <strong>Book tags:</strong> core
            </p>
          </Col>
          <Col md={4} className="price__container">
            <p className="book__price">
              <span>
                <b>Price</b>
              </span>
              <span className="book__price-sum" id="book__price-sum">
                {bookPage.price}
              </span>
            </p>
            <p className="book__count">
              <span>
                <b>Count</b>
              </span>
              <span className="field-number">
                <input
                  type="number"
                  name="book__count-sum"
                  className="book__count-sum"
                  id="book__count-sum"
                  defaultValue={bookPage.count}
                  step="1"
                  min="1"
                  max="42"
                  onChange={(e) => {
                    changeTotalPrice(+e.target.value);
                  }}
                />
              </span>
            </p>
            <p className="book__totalprice">
              <span>
                <b>Total price</b>
              </span>
              <span className="book__totalprice-sum" id="book__totalprice-sum">
                {bookPage.priceTotal}
              </span>
            </p>
            <Link to={`/cart`}>
              <button
                className="btn btn-light add__tocart"
                onClick={() => addToOrder(bookPage)}
              >
                Add to cart
              </button>
            </Link>
          </Col>
        </Row>
        <section className="book__page-description">
          <strong>{bookPage.title}:</strong> {bookPage.description}
        </section>
      </article>
    </>
  );
}
