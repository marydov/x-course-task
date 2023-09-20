import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../context/use-user';
import { Order } from '../../context/use-order';
import { Col, Row } from 'react-bootstrap';
import Orders from '../order/order';
import cart from '../../images/cart.svg';
import './cart.scss';

const showOrder = (order, price, count) => {
  return (
    <>
      <section className="ordersContainer">
        {order.map((el) => (
          <Orders key={el.id} item={el} />
        ))}
      </section>
      <Row className="data__total d-flex p-2">
        <Col md={8}></Col>
        <Col md={3} className="total__count">
          <b>{count}</b>
        </Col>
        <Col md={1} className="total__price">
          <b>$ {price}</b>
        </Col>
      </Row>
    </>
  );
};

const showNothing = () => {
  return (
    <>
      <div className="empty__cart">
        <img src={cart} className="cart__img" />
        <p>Cart empty...</p>
      </div>
    </>
  );
};

export default function Cart() {
  const { order, setOrder } = useContext(Order);

  const [total, setTotal] = useState({
    price: order.reduce((prev, curr) => prev + curr.priceTotal, 0).toFixed(2),
    count: order.reduce((prev, curr) => prev + curr.count, 0),
  });

  useEffect(() => {
    setTotal({
      price: order.reduce((prev, curr) => prev + curr.priceTotal, 0).toFixed(2),
      count: order.reduce((prev, curr) => prev + curr.count, 0),
    });
  }, [order]);

  const { setUserName } = useContext(User);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const person = JSON.parse(user);

    if (user) {
      setUserName(person.name);
    } else {
      navigate('/');
    }
  }, [navigate, setUserName]);

  const clearCart = () => {
    setOrder([]);
  };

  return (
    <>
      <div className="cart__container">
        <div>
          <button
            className="btn btn-light purchase"
            disabled={order.length < 1}
            onClick={clearCart}
          >
            Purchase
          </button>
        </div>
        <div className="cart__main">
          {order.length > 0
            ? showOrder(order, total.price, total.count)
            : showNothing()}
        </div>
      </div>
    </>
  );
}
