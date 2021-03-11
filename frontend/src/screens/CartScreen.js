import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Button,
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Form
} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  console.log(match.params.id, productId, qty);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);

  useEffect(() => {
    if (productId) {
      console.log("dispatch");
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = productId => {
    // console.log(`remove from cart ${productId}`);
    dispatch(removeFromCart(productId));
  };

  const checkOutHandler = () => {
    console.log("proceed to checkout");
    history.push("/login?redirect=shipping");
  };
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        <ListGroup variant="flush">
          {cartItems.map(cartItem => (
            <ListGroup.Item key={cartItem.product}>
              <Row>
                <Col md={2}>
                  <Image
                    src={cartItem.image}
                    alt={cartItem.name}
                    fluid
                    rounded
                  />
                </Col>
                <Col md={3}>
                  <Link to={`/product/${cartItem.product}`}>
                    {cartItem.name}
                  </Link>
                </Col>
                <Col md={2}>{cartItem.price}</Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={cartItem.qty}
                    onChange={e =>
                      dispatch(
                        addToCart(cartItem.product, Number(e.target.value))
                      )
                    }
                  >
                    {[...Array(cartItem.countInStock).keys()].map(x => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => removeFromCartHandler(cartItem.product)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                SUBTOTAL (
                {cartItems.reduce(
                  (subTotal, cartItem) => subTotal + cartItem.qty,
                  0
                )}
                ) ITEMS
              </h2>
              <h3>
                $
                {cartItems
                  .reduce(
                    (totalPrice, cartItem) =>
                      totalPrice + cartItem.qty * cartItem.price,
                    0
                  )
                  .toFixed(2)}
              </h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};
export default CartScreen;
