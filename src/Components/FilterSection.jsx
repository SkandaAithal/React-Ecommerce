import React from "react";
import styled from "styled-components";
import { useFilterProducts } from "../context/filtercontext";
import { FaCheck } from "react-icons/fa";
import FormatPrice from "../helpers/FormatPrice";
import { Button } from "../styles/Button";
import Loader from "./Loader";
export default function FilterSection() {
  let {
    filters: { text, category, color, price, maxPrice, minPrice },
    updateFilterValue,
    allProducts,
    clearFilters,
  } = useFilterProducts();

  // to get unique data
  const getUniqueData = (data, key) => {
    let uniqueValues = data.reduce((array, curr) => {
      if (!array.includes(curr[key])) {
        array.push(curr[key]);
      }
      return array;
    }, []);
    return ["all", ...uniqueValues];
  };
  const categoryData = getUniqueData(allProducts, "category");
  const companydata = getUniqueData(allProducts, "company");
  const colorsArray = allProducts
    .map((product) => {
      return product.colors;
    })
    .flat(1);
  const colors = [...new Set(colorsArray)];

  return (
    <Wrapper>
      <div className="filter-search">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            name="text"
            value={text}
            placeholder="Search "
            onChange={updateFilterValue}
          />
        </form>
      </div>

      <div className="filter-category">
        <h3>Category</h3>
        {allProducts.length ? (
          <div>
            {categoryData.map((curElem, index) => {
              return (
                <button
                  key={index}
                  name="category"
                  value={curElem}
                  className={curElem === category ? "active" : ""}
                  onClick={updateFilterValue}
                >
                  {curElem}
                </button>
              );
            })}
          </div>
        ) : (
          <Loader />
        )}
      </div>

      <div className="filter-company">
        <h3>Company</h3>
        {allProducts.length ? (
          <form>
            <select
              name="company"
              className="filter-company--select"
              onClick={updateFilterValue}
            >
              {companydata.map((curElem, index) => {
                return (
                  <option key={index} value={curElem}>
                    {curElem}
                  </option>
                );
              })}
            </select>
          </form>
        ) : (
          <Loader />
        )}
      </div>

      <div className=".filter-color-style ">
        <h3>Colors</h3>
        {allProducts.length ? (
          <div className="filter-color-style">
            <button
              className="color-all--style "
              name="color"
              value="all"
              onClick={updateFilterValue}
            >
              all
            </button>

            {colors.map((curColor, index) => {
              return (
                <button
                  key={index}
                  name="color"
                  value={curColor}
                  style={{ backgroundColor: curColor }}
                  className={
                    curColor === color ? "active btnStyle" : "btnStyle"
                  }
                  onClick={updateFilterValue}
                >
                  {curColor === color ? (
                    <FaCheck className="checkStyle" />
                  ) : null}
                </button>
              );
            })}
          </div>
        ) : (
          <Loader />
        )}
      </div>

      <div className="filter_price">
        <h3>Price</h3>
        {allProducts.length ? (
          <>
            {" "}
            <p>
              <FormatPrice price={price} number={100} />
            </p>
            <input
              type="range"
              name="price"
              id="price"
              min={minPrice}
              step={1}
              max={maxPrice}
              value={price}
              onChange={updateFilterValue}
            />
          </>
        ) : (
          <Loader />
        )}
      </div>

      <div className="filter-clear">
        <Button className="btn" onClick={clearFilters}>
          Clear Filter
        </Button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h3 {
    padding: 2rem 0;
    font-size: bold;
  }

  .filter-search {
    input {
      padding: 0.6rem 1rem;
      /* width: 80%; */
    }
  }

  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;

      button {
        border: none;
        color: ${({ theme }) => theme.colors.black};
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }

      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }

  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.black};
    text-transform: capitalize;
  }

  .filter-color-style {
    display: flex;
    justify-content: center;
  }

  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    color: black;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;

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

  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }

  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .filter-clear .btn {
    background-color: #f05b4a;
    color: #ffffff;
  }
`;
