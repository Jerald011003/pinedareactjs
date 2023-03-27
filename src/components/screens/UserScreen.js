import React, { useEffect, useState } from "react";
import { Navbar, Nav, Col, Row, NavDropdown, Tab, ListGroup } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../Message";
import { getUserDetails, userUpdateProfile } from "../../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants"
import { getMyOrders } from "../../actions/orderActions";
import { listMyOrders } from "../../actions/orderActions"

function UserScreen({history}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

//   let history = useHistory();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: orderLoading, error: orderError, orders } = orderListMy;

  const userUpdateProfileState = useSelector(
    (state) => state.userUpdateProfile
  );
  const { success } = userUpdateProfileState;
  // const [email, setEmail] = useState(userInfo.email);

  
  useEffect(() => {
    // USER IS NOT LOGGED IN
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });

        dispatch(getUserDetails("profile"));

        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  },  [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      const userId = user && user._id;
      dispatch(
        userUpdateProfile({
          id: userId,
          name: name,
          email: email,
          password: password,
        })
      );
      setMessage("");
    }
  };

  return (
    <Row>
      <Col md={3}>
      <div>
     <br/>
        <div className='text-center'>
            <h2>User Profile</h2> 
            {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
        </div>
              

    <div className="container">
        <div className="row" >
            <div >
                <div className="col-sm-12 col-22">
                <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-1" controlId="Name">
                            <Form.Label className="text-center">Full Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" autoComplete='off' value={name} onChange={(e)=> setName(e.target.value)} required />
                        </Form.Group>

                       

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" autoComplete='off' value={email} onChange={(e)=> setEmail(e.target.value)} />
                        <Form.Text className="text-dark">
                       
                        </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" autoComplete='off' value={password} onChange={(e)=> setPassword(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId='password'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control  type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}></Form.Control>
              </Form.Group>
              <br/>
                        <div >
                            <Button variant="primary" type="submit">
                                Update
                            </Button> 
                        </div>
                        <br/>
                </Form>
                </div>
            </div>
        </div>
    </div>

    </div>


      </Col>

      <Col md={9}>
        <h2>My Orders</h2>
        {orderLoading ? (
          <Loader />
        ) : orderError ? (
          <Message variant="danger">{orderError}</Message>
        ) : (
          <Table striped responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-multiply"></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-multiply"></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm">Details </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default UserScreen;
