import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import StripeCeckout from 'react-stripe-checkout';
import './cart.scss';

export default function Cart(props) {
  let cost = props.user.cart.reduce((pre, cur) => pre + cur.products.price, 0);
  const makePayment = (token) => {
    let body = { token, amount: Math.ceil(cost * 100) };
    props.pay(body);
  };

  return (
    <div class="myBody">
      <h1 class="wordCarousel">    
        <div> 
          <ul class="flip4"> 
            <li>total price {cost}</li>
            <li>({props.user.cart.length})</li>
            <li>My Carts</li>
            <li>Welcome to Carts page</li>
          </ul>
        </div>  
      </h1>
      {props.user.cart.map((item) => {
        return (
          <div>
            <div>
              <div class="accordion">
                <div class="image">
                  <img src={item.products.images[0]}/> 
                </div>
                <Accordion defaultActiveKey="0">
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Item Description
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body><p>name  {item.products.name}</p></Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        Item Details
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        <ul>
                          <li><p>price  {item.products.price}</p></li>
                          <li><p>seal {item.products.seal}</p></li>
                        </ul>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
            </div>
          </div>
        );
      })}

      <StripeCeckout
        stripeKey="pk_test_51Gw6p5DCWnftj01CHDFox6ZFihtNyZ0EkHqOxR8uTnYB0jeLLTPfZBPtuRQXcFBSd4McXulw456Dl1Cp6mq3t6lR00booR4E8t"
        token={makePayment}
        name="test"
        amount={cost * 100}>
        <button id="btnTotal">Check Out</button>
      </StripeCeckout>
    </div>
  );
}
