import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Card } from "react-bootstrap";
import "../css/Home.css";
import { useFirestore } from "react-redux-firebase";
import Loading from "../components/Loading";
import ProductModal from "../components/ProductMoodal";
import { Transition } from "react-transition-group";

function HomePage() {
  const firestore = useFirestore();
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("");
  const [inProp, setInProp] = useState(false);
  let [productsCache, setProductCache] = useState([]);

  const duration = 300;

  const handleClose = () => setShowModal(false);
  const handleShow = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCategoryClick = (selectedCategory) => {
    setInProp(false);
    if (filter === selectedCategory) {
      setFilter("");
      setProducts(productsCache);
      setTimeout(() => {
        setInProp(true);
      }, duration);
      return;
    }
    setFilter(selectedCategory);

    const filteredProduct = productsCache.filter(
      (product) => product.category == selectedCategory
    );

    setProducts(filteredProduct);
    setTimeout(() => {
      setInProp(true);
    }, duration);
  };

  useEffect(() => {
    firestore
      .collection("products")
      .get()
      .then((doc) => {
        const productsDocs = doc.docs.map((doc) => doc.data());
        setProducts(productsDocs);
        setProductCache(productsDocs);
        setTimeout(() => {
          setInProp(true);
        }, duration);
      });
  }, []);

  useEffect(() => {
    firestore
      .collection("views")
      .doc("product-categories")
      .get()
      .then((doc) => {
        setCategories(doc.data().categories);
      });
  }, []);

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  return (
    <div>
      <div className="banner">
        <div className="banner-title">
          <p> discover quick & easy</p>
          <p>resipe</p>
        </div>
      </div>
      <Container className="mt-3 ">
        <Row className="justify-content-md-center">
          {categories.map((category) => (
            <Col
              xs={12}
              sm={12}
              md={2}
              lg={6}
              lg={2}
              className="catagory-items mx-lg-2 my-1 d-flex justify-content-center align-items-center"
              key={category}
              onClick={() => handleCategoryClick(category)}
              style={{
                backgroundColor: filter == category ? "#69dc9e" : "#FFF",
                filter: `drop-shadow(3px 5px 0.3rem #dbd9d7)`,
                height: "3rem",
                cursor: "pointer",
                // border: '0.1rem solid #dbd9d7'
              }}
            >
              {category}
            </Col>
          ))}
        </Row>

        <Row className="justify-content-center my-5">
          {products.map((product) => (
            <Transition in={inProp} timeout={duration}>
              {(state) => (
                <Col
                  md={6}
                  lg={4}
                  xl={4}
                  sm={6}
                  xs={12}
                  className="mx-0"
                  key={product.id}
                  style={{
                    ...transitionStyles[state],
                  }}
                  className={`fade fade-${state} mx-0`}
                >
                  <div className="d-flex justify-content-center my-2  ">
                    <Card
                      className=" hover-zoom  card-margin"
                      onClick={() => handleShow(product)}
                    >
                      <Card.Body className="text-center">
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Img
                          className="card-image-size "
                          variant="top"
                          src={product.image}
                          // style={{ margin: "9rem", height: "9rem" }}
                        />

                        <Card.Subtitle className="my-3">
                          {product.brand}
                          {product.price} €
                        </Card.Subtitle>

                        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                        <Card.Text>{product.description}</Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                </Col>
              )}
            </Transition>
          ))}
        </Row>
        <ProductModal
          show={showModal}
          hide={handleClose}
          product={selectedProduct}
        ></ProductModal>
      </Container>
    </div>
  );
}

export default HomePage;
