import React, { useEffect, useState} from "react";
import {Navbar,Nav,Container,Row,NavDropdown, Form, Col, Button} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from "../actions/userActions";
import { useDispatch,useSelector } from 'react-redux'
import { Link, useHistory} from 'react-router-dom';
import logo from '../actions/KPOPLICA.png'



function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [name, setName] = useState(userInfo ? userInfo.name : "");

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
    }
  }, [userInfo]);

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/login'); // redirect to login page
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark" >
          <Container>

          <LinkContainer to="/" >
          <Navbar.Brand ><img
              alt=""
              src={logo}
              width="190"
              height="28"
              // className="d-inline-block align-top"
            />{' '}</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <LinkContainer to="/">
            <Nav.Link><i className="fas fa-home"></i> Home</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/cart">
            <Nav.Link><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
            </LinkContainer>

            <LinkContainer to='/profile'>
                <Nav.Link> <i className="fa fa-user"></i> Profile</Nav.Link>
                                    </LinkContainer>

                                  
      {/* <Form>
        <Row>
        <Col>
            <Form.Control style={{width:300}}onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Search"
              className="me-1"
              aria-label="Search"
            /> 
            </Col> 
            <Col>
            <Button style={{width:100, height:36}}variant="success">Search</Button></Col>
            </Row>
          </Form>
          {loading ? (
        <Loader/>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
         {products.filter((product)=>
        {
          return search.toLowerCase() === '' ? product : product.name.toLowerCase().includes(search);
        }).map((product) => (
            <Col key={product.name} sm={12} md={9} lg={8} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )} */}
{userInfo?(
  <NavDropdown title={userInfo.name} id='username'>
                                    
                                     
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                              
                                </NavDropdown>

):

(


  <LinkContainer to="/login">
  <Nav.Link><i className="fas fa-user"></i> Login</Nav.Link>
  </LinkContainer>
)

}
         
          </Nav>
          
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
