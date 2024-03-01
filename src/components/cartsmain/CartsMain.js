import React, { useEffect, useState } from "react";
import "./cartsmain.scss";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  AddtoCart,
  removeItem,
  removeSingle,
} from "../../redux/slice/userAuthSlice/userAuthSlice";
import { NavLink, useNavigate } from "react-router-dom";
import EmptyCart from "../emptycart/EmptyCart";
const CartsMain = () => {
  const { userCartData } = useSelector((state) => state.User);
  // console.log("userCartData", userCartData);

  const [price, setPrice] = useState("");
  const dispatch = useDispatch();
  const navigate=useNavigate();

  // deliverydate
  const dateAfter2days = moment().add(2,'days').format('YYYY-MM-DD');

  // increment cart
  const handleIncrement = (e) => {
    dispatch(AddtoCart(e));
  };

  // qunatity decrement
  const handleDecrement = (e) => {
    dispatch(removeSingle(e));
  };

  // remove item from cart
  const handleRemoveItems = (e) => {
    dispatch(removeItem(e));
  };
  const total = () => {
    let totalprice = 0;

    userCartData.map((ele, index) => {
      totalprice = ele.productDetails?.price * ele?.quantity + totalprice;
    });
    setPrice(totalprice);
  };

    // goto shiing page
    const navigateShipping = ()=>{
      navigate("/shipping",{state:price})
  }

  useEffect(() => {
    total();
  }, [total]);
  return (
    <>
      <Container className="pt-4 pb-4">
        <h2 className="text-center">Shopping cart</h2>
        {userCartData?.length > 0 ? (
          <Row className="mt-5 gap-3 gap-md-0 gap-lg-0">
            {/* left part */}
            <Col lg={8} md={7}>
              <Card className="card">
                <Card.Title>Cart({userCartData?.length} items)</Card.Title>
                {userCartData?.map((element, index) => {
                  return (
                    <>
                      <div className="mt-2  store-item bottom-line pb-3">
                        <Row>
                          <Col lg={3}>
                            <NavLink
                              to={`/productdetails/${element.productDetails._id}`}
                            >
                              <img
                                className="image-store"
                                src={element.productDetails.productimage}
                                alt=""
                              />
                            </NavLink>
                          </Col>
                          <Col lg={9}>
                            <div className="mt-3 mt-lg-0 d-flex align-items-center justify-content-between">
                              <h4>{element.productDetails.productname}</h4>
                              <div>
                                <div
                                  className="btn-quantity-container d-flex align-items-center justify-content-center"
                                  style={{ gap: ".5rem" }}
                                >
                                  <Button
                                    className="btn-quantity"
                                    variant="light"
                                    onClick={() =>
                                      handleDecrement(
                                        element.productDetails._id
                                      )
                                    }
                                  >
                                    &minus;
                                  </Button>
                                  <span className="p-quantity">
                                    {element.quantity}
                                  </span>
                                  <Button
                                    className="btn-quantity"
                                    variant="light"
                                    onClick={() =>
                                      handleIncrement(
                                        element.productDetails._id
                                      )
                                    }
                                  >
                                    +
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <div className="list-store d-flex align-items-center justify-content-between">
                              <p>
                                discount: -{element.productDetails?.discount}%
                              </p>
                            </div>
                            <div className="list-store d-flex align-items-center justify-content-between">
                              <p>Price: ₹{element.productDetails?.price}</p>
                            </div>
                            <div className="list-store d-flex align-items-center justify-content-between">
                              <p>Delivery Date: {dateAfter2days}</p>
                            </div>
                            <div className="list-store d-flex align-items-center justify-content-between">
                              <div className="d-flex gap-2">
                                <Button
                                  className="btn-list"
                                  variant="danger"
                                  size="xsmall"
                                  onClick={() =>
                                    handleRemoveItems(
                                      element.productDetails._id
                                    )
                                  }
                                >
                                  <i class="fa-solid fa-trash"></i>&nbsp;
                                  <span>Remove item</span>
                                </Button>
                                <Button
                                  className="btn-list"
                                  variant="secondary"
                                  size="xsmall"
                                >
                                  <i class="fa-solid fa-heart"></i>&nbsp;
                                  <span>Move to wishlist</span>
                                </Button>
                              </div>
                              <div className="d-flex">
                                <h5>
                                  Total:-{" "}
                                  {element.productDetails?.price *
                                    element?.quantity}
                                </h5>
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <hr />
                      </div>
                    </>
                  );
                })}
              </Card>
            </Col>
            {/* right part  */}
            <Col lg={4} md={5}>
              <Row className="gap-3">
                <Col>
                  <Card className="card">
                    <Card.Title>Total amount of </Card.Title>
                    <div className="store-item mt-2">
                      <Row>
                        <Col>
                          <div className="list-store d-flex align-items-center justify-content-between">
                            <p>Temporary amount</p>
                            <p>{price}</p>
                          </div>
                          <div className="bottom-line"></div>
                        </Col>
                      </Row>
                      <Row className="mt-2">
                        <Col className="col-6">
                          <p className="p-total-label">
                            The Total amount of including vat
                          </p>
                        </Col>
                        <Col className="col-6">
                          <p className="p-total">{price}</p>
                        </Col>
                      </Row>
                      <Row className="mt-1">
                        <Col>
                          <Button
                            className="w-100"
                            variant="primary"
                            size="medium"
                            onClick={navigateShipping}
                          >
                            Go to checkout
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        ) : (
          <EmptyCart />
        )}
      </Container>
    </>
  );
};

export default CartsMain;
