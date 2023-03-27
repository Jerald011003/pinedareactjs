import React, { useState } from 'react'
import {
    Link,
    userLocation,
    useSearchParams,
    useHistory,
    useLocation,
  } from 'react-router-dom';
  import {  Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../FormContainer';
import CheckoutSteps from '../CheckoutSteps';
import { LinkContainer } from "react-router-bootstrap";
import { savePaymentMethod } from '../../actions/cartActions'; // import the savePaymentMethod function

function PaymentScreen() {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const dispatch = useDispatch()
    const history = useHistory()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if(shippingAddress.address){
        history.push('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder');
      }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3/>
      <Form onSubmit={submitHandler}>
          <Form.Group>
              <Form.Label as='legend'>Select Method</Form.Label>
              <Col>
              <Form.Check
                  type='radio'
                  label='PayPal or Credit Card'
                  id="paypal"
                  name='paymentMethod'
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}>

              </Form.Check>
              </Col>
          </Form.Group>
          
          <LinkContainer to="/placeorder">
          <Button type="submit" variant="primary" > Continue </Button>
          </LinkContainer>
        </Form>
    </FormContainer>
  );
}

export default PaymentScreen;