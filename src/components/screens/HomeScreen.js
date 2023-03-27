import React, {useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {Navbar,Nav,Container,Row,NavDropdown, Form, Col, Button} from 'react-bootstrap'
import Product from '../Product';
import getListProducts from '../../actions/productAction'
// import Product from '../components/Product'
import { listProducts } from '../../actions/productAction';
// import getListProducts from '../'
import Loader from '../Loader';
import Message from '../Message';

function HomeScreen() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState ('')
    const productList = useSelector((state)=>state.productList);
    const {error,loading,products} =productList
    useEffect(()=>{
        dispatch(listProducts());
    },[dispatch])

    return (
        <div>
            <h1 className="text-center">Latest Products</h1>

            <Form>
        <Row>
        <Col>
            <Form.Control style={{width:500}}onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Search"
              className="me-1"
              aria-label="Search"
            /> 
            </Col> <Col>
            <Button style={{width:140, height:36}}variant="success">Search</Button></Col>
            </Row>
          </Form>

            {loading ?(
                <Loader />
            ):error ?(
              <Message variant='danger'>{error}</Message>
            ):
            
            <Row>
            {products.filter((product)=>
        {
          return search.toLowerCase() === '' ? product : product.name.toLowerCase().includes(search);
        }).map((product) => (
                   <Col key={product._id} sm={12} md={6} lg={4} xl={3}>

                       {/* <h3>{product.name}</h3> */}
                       <Product  product={product}/>
                   </Col>
               ))} 
            </Row>
            
            
            }
            
        </div>
    )
}

export default HomeScreen
