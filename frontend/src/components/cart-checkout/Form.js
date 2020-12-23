import React, { useState } from "react";
import { Col, Card, Row, Button, Modal } from "react-bootstrap";
import QRCode from "qrcode.react";

// PlaceOrderForm

export default function PlaceOrderForm(props) {
  const [information, setInformation] = useState(
    props.currentUser || {
      name: "",
      email: "",
      address: "",
      subdistrict: "",
      district: "",
      province: "",
      postCode: "",
    }
  );

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title className="text-left title">information</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <Row className="mb-5">
              <Col md={12} lg={12} xl={12} sm={12} xs={12}>
                <div className="text-left mt-4">
                  <div className="title">
                    <p>name</p>
                  </div>
                  <div className="text-center">
                    <input
                      name="name"
                      className="full-length-input"
                      required
                      value={information.displayName}
                    ></input>
                  </div>
                </div>
              </Col>
              <Col md={12} lg={12} xl={12} sm={12} xs={12}>
                <div className="text-left mt-4">
                  <div className="title">
                    <p>email</p>
                  </div>
                  <div className="text-center">
                    <input
                      name="email"
                      className="full-length-input"
                      value={information.email}
                      required
                    ></input>
                  </div>
                </div>
              </Col>
              <Col md={12} lg={12} xl={12} sm={12} xs={12}>
                <div className="text-left mt-4">
                  <div className="title">
                    <p>address</p>
                  </div>
                  <div className="text-center">
                    <input
                      name="address"
                      className="full-length-input"
                      required
                    ></input>
                  </div>
                </div>
              </Col>
              <Col md={6} lg={6} xl={6} sm={12} xs={12}>
                <div className="text-left mt-4">
                  <div className="title">
                    <p>sub-district</p>
                  </div>
                  <div>
                    <input
                      name="subdistrict"
                      className="full-length-input"
                      required
                    ></input>
                  </div>
                </div>
              </Col>
              <Col md={6} lg={6} xl={6} sm={12} xs={12}>
                <div className="text-left mt-4">
                  <div className="title">
                    <p>distric</p>
                  </div>
                  <div>
                    <input
                      name="district"
                      className="full-length-input"
                      required
                    ></input>
                  </div>
                </div>
              </Col>
              <Col md={6} lg={6} xl={6} sm={12} xs={12}>
                <div className="text-left mt-4">
                  <div className="title">
                    <p>province</p>
                  </div>
                  <div>
                    <input
                      name="province"
                      className="full-length-input"
                      required
                    ></input>
                  </div>
                </div>
              </Col>
              <Col md={6} lg={6} xl={6} sm={12} xs={12}>
                <div className="text-left mt-4">
                  <div className="title">
                    <p>post code</p>
                  </div>
                  <div>
                    <input
                      name="postcode"
                      className="full-length-input"
                      required
                    ></input>
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Subtitle>

          <Row>
            <Col md={12} className="text-left">
              <h3 className="title">payment method</h3>
            </Col>

            <Col md={12} className="justify-content-center my-5 title">
              <Button
                className="button-text qr-button"
                onClick={(e) => {
                  for (
                    let i = 0;
                    i < document.getElementsByTagName("input").length;
                    i++
                  ) {
                    if (document.getElementsByTagName("input")[i].value) {
                      if (i === 6) {
                        handleShow();
                      }
                    } else {
                      alert("Please complete form");
                      break;
                    }
                  }
                }}
              >
                qr code
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <QRCode value="http://facebook.github.io/react/" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
