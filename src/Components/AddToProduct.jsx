import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import CartAmount from "./CartAmount";
import { Button } from "../styles/Button";
import { useCartContext } from "../context/cartcontext";
import { useNavigate } from "react-router-dom";
function AddToProduct({ product }) {
  let { colors = [], stock } = product;
  let [curColor, setCurColor] = useState(colors[0]);
  let [amount, setAmount] = useState(1);
  let { addToCart } = useCartContext();
  let navigate = useNavigate();

  const decrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };
  const increase = () => {
    amount < stock ? setAmount(amount + 1) : setAmount(stock);
  };
  return (
    <Wrapper>
      <div className="colors">
        <p>
          Colors :
          {colors.map((color, index) => {
            return (
              <button
                key={index}
                className={curColor === color ? " btnStyle active" : "btnStyle"}
                style={{ backgroundColor: color }}
                onClick={() => {
                  setCurColor(color);
                }}
              >
                {curColor === color ? <FaCheck className="checkStyle" /> : null}
              </button>
            );
          })}
        </p>
      </div>

      {/* add to cart */}
      <CartAmount amount={amount} increase={increase} decrease={decrease} />
      <Button
        onClick={() => {
          addToCart(amount, curColor, product);
          window.scrollTo(0, 0);
          navigate("/cart");
        }}
      >
        Add To Cart
      </Button>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  .colors p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  /* we can use it as a global one too  */
  .amount-toggle {
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }
`;
export default AddToProduct;
