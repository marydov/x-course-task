import { Row, Col } from 'react-bootstrap';
import './order.scss';

export default function Orders({ item }) {
  return (
    <section className="item">
      <Row className="d-flex p-2">
        <Col md={8}>{item.title}</Col>
        <Col md={3}>{item.count}</Col>
        <Col md={1}>{item.priceTotal}</Col>
      </Row>
    </section>
  );
}
