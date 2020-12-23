import React, { useState } from "react";
import { Modal, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import NumberInput from "./NumberInput";
import firebase from "firebase";
import { AUTH_SHOW_LOGIN_DIALOG } from "../constants/authConstants";
import { useFirestore } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import "../css/ProductModal.css";

export default function ProductModal(props) {
  const product = props.product;

  const history = useHistory();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const firestore = useFirestore();
  const auth = useSelector((state) => state.auth);

  const addToCartHandler = async () => {
    if (!auth.isLogin) {
      dispatch({
        type: AUTH_SHOW_LOGIN_DIALOG,
        payload: true,
      });
      return;
    }

    await firestore
      .collection("carts")
      .doc("test_cart")
      .set(
        {
          items: firebase.firestore.FieldValue.arrayUnion({
            product,
            qty,
          }),
        },
        { merge: true }
      );
    props.hide();
    // history.push(`/cart`);
  };

  return (
    <Modal show={props.show} onHide={props.handleClose} animation={true}>
      <Modal.Header closeButton onClick={props.hide}></Modal.Header>
      <Modal.Body>
        <Card className=" flex text-center justify-content-center">
          <Card.Title className="mt-5">{product.name}</Card.Title>
          <Card.Img
            variant="top"
            className="modal-image"
            src={product.image}
          ></Card.Img>
          <Card.Subtitle className="text-left my-3 mx-3">
            catagory : {product.category}
          </Card.Subtitle>
          <Card.Subtitle className="text-left my-3 mx-3">
            description : {product.description}
          </Card.Subtitle>
          <Card.Subtitle className="text-left my-3 mx-3">
            price : {product.price}
            {" €"}
          </Card.Subtitle>
          <Card.Body>
            <Card.Text className="text-center">
              <NumberInput
                value={qty}
                onChange={setQty}
                maxValue={product.countInStock}
              ></NumberInput>
            </Card.Text>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.hide}>
          Close
        </Button>
        <Button variant="primary" onClick={() => addToCartHandler()}>
          Add to cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
