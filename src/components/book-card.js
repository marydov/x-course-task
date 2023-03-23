import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import notFound from '../images/imageNotFound.png';

export default function BookCard({ book }) {
  return (
    <>
      <Col md={4} className="product">
        <article className="card">
          <img
            src={book.image === '' ? notFound : book.image}
            alt={book.title}
            className="card__img"
          />
          <div className="card__book-footer">
            <p className="card__book-name">{book.title}</p>
            <p className="card__book-author">{book.author}</p>
            <div className="card__nav">
              <div className="card__book-price">{book.price}</div>
              <Link key={book.id} to={`/books/${book.id}`}>
                <button className="btn btn-light view">View</button>
              </Link>
            </div>
          </div>
        </article>
      </Col>
    </>
  );
}
