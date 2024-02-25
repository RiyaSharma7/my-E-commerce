import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../Components/Announcement";
import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTotal, removeCart, removeFromCart, updateCart } from "../Redux/cartRedux";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div`

`;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;



const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;


const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;

 
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor:pointer;
`;
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const item = useSelector(state => state.cart.cartItems)
  const price = useSelector(state => state.cart.cartTotalAmount)
  useEffect(() => {
    dispatch(getTotal(item))
  })
  const removeclick = (value) => {
    dispatch(removeCart(value))
    dispatch(getTotal(value))
  }

  const addclick = (value) => {
    dispatch(updateCart(value))
    dispatch(getTotal(value))
  }
  const changeroute = () => {
    navigate("/")
  }
  const removeItemFromCart = (value) => {
    dispatch(removeFromCart(value))
  }
  const[ setStripeToken] = useState(null);

  const onToken = (token) => {
    //setStripeToken(token);
  }
  
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={changeroute}>CONTINUE SHOPPING</TopButton>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {item.map((value) => (
              <>
                <Product>
                  <ProductDetail>
                    <Image src={value.img} />
                    <Details>
                    <ProductPrice>
                        <b>Price:</b> ${value.price}
                      </ProductPrice>
                      <ProductName>
                        <b>Product:</b> {value.title}
                      </ProductName>
                      <ProductSize>
                        <b>Size:</b>M
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Remove onClick={() => removeclick(value)} sx={{
                        cursor: "pointer"
                      }} />
                      <ProductAmount>{value.cartQuantity >= 1 ? value.cartQuantity : removeItemFromCart(value)}</ProductAmount>
                      <Add onClick={() => addclick(value)} sx={{
                        cursor: "pointer"
                      }} />
                    </ProductAmountContainer>
                    <Button style={{
                      width: "50%"
                    }}
                      onClick={() => removeItemFromCart(value)}
                    >Remove</Button>
                  </PriceDetail>
                </Product>
                <Hr />
              </>
            ))}

          </Info>

          <Summary style={{ display: item.length <= 0 ? "none" : "block" }}>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>${price}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 3.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -3.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>${price}</SummaryItemPrice>
            </SummaryItem>
              <StripeCheckout
          name="Riya Shop"
          billingAddress
          shippingAddress
          description={`your total is $${price}`}
          amount={price*100}
          token={onToken}
          stripeKey={KEY}
         >
            <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>

    </Container>
  );
};

export default Cart;