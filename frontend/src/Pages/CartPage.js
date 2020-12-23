import React, { useEffect, useRef, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "../css/Cart.css";
import ShoppingCart from "../components/cart-checkout/ShoppingCart";
import PlaceOrderForm from "../components/cart-checkout/Form";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";

export default function CartPage(props) {
  const firestore = useFirestore();
  const cartId = "test_cart";

  const currentUser = useSelector((state) => state.auth.user);

  const [cart, setCart] = useState({
    id: null,
    items: [],
    belongTo: null,
  });

  let { items } = cart;

  useEffect(() => {
    const unsubscribe = firestore
      .collection("carts")
      .doc(cartId)
      .onSnapshot((snapshot) => {
        const cartData = snapshot.data();

        if (!cartData) {
          return props.history.push("/");
        }

        if (cartData.items.length === 0) {
          return props.history.push("/");
        }
        setCart(snapshot.data());
      });

    return () => unsubscribe()
  }, []);

  const onUpdateCart = async (payload) => {
    const itemIndex = items.findIndex(
      ({ product }) => product.id === payload.product.id
    );

    items[itemIndex] = payload;

    await firestore.collection("carts").doc(cartId).update({ items });

    setCart({ ...cart, items });
  };

  const onRemoveItemFromCart = async (product) => {
    items = items.filter((item) => item.product.id !== product.id);

    await firestore.collection("carts").doc(cartId).update({ items });

    setCart({ ...cart, items });

    if (items.length === 0) {
      return props.history.push("/");
    }
  };

  return (
    <Row className="mx-xs-0 mx-smx-0 mx-md-0 mx-lg-0 mx-xl-0 mt-3">
      <Col md={6} lg={6} xl={6} sm={6} xs={12}>
        <ShoppingCart
          items={items}
          onUpdateCart={onUpdateCart}
          onRemoveItemFromCart={onRemoveItemFromCart}
        ></ShoppingCart>
      </Col>
      <Col md={6} lg={6} xl={6} sm={6} xs={12}>
        <PlaceOrderForm currentUser={currentUser}></PlaceOrderForm>
      </Col>
    </Row>
  );
}
