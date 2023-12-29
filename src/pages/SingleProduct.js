import { lazy, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loader from "../Components/Loader";
import { useProductContext } from "../context/productcontext";
import PageNavigation from "../Components/PageNavigation";
import { Container } from "../styles/Container";
import ProductImages from "../Components/ProductImages";
import FormatPrice from "../helpers/FormatPrice";
import { TbTruckDelivery } from "react-icons/tb";
import { TbReplace } from "react-icons/tb";
import { MdOutlineSecurity } from "react-icons/md";
import Stars from "../Components/Stars";
import RenderOnViewportEntry from "../helpers/RenderOnViewportEntry";
const AddToProduct = lazy(() => import("../Components/AddToProduct"));
const SingleProduct = () => {
  const controller = new AbortController();
  const signal = controller.signal;
  let { id } = useParams();

  let { getSingleProduct, isSingleLoading, SingleProduct, nav } =
    useProductContext();
  const SINGLE_PRODUCT_API_URL = `https://api.pujakaitem.com/api/products?id=${id}`;
  useEffect(() => {
    getSingleProduct(SINGLE_PRODUCT_API_URL, signal);

    return () => {
      controller.abort();
    };
  }, []);

  const { name, company, price, description, stock, stars, reviews, image } =
    SingleProduct;

  if (isSingleLoading) {
    return <Loader />;
  }
  return (
    <Wrapper>
      <PageNavigation title={name} nav={nav} />
      <Container className="container">
        <div className="grid grid-two-column">
          <div className="product-images">
            <ProductImages image={image} />
          </div>

          <div className="product-data">
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews} />
            <p className="product-data-price">
              MRP : &nbsp;
              <del className="product-data-real-price">
                <FormatPrice price={price + 30000} number={10} />
              </del>
            </p>

            <p className="product-data-real-price product-data-price">
              Deal of the Day : &nbsp;
              <FormatPrice price={price} number={10} />
            </p>
            <p>{description}</p>

            <div className="product-data-warranty ">
              <div className="product-warranty-data">
                <TbTruckDelivery className="warranty-icon" />
                <p>Free Delivery</p>
              </div>
              <div className="product-warranty-data">
                <TbReplace className="warranty-icon" />
                <p>30 Days Replacement</p>
              </div>
              <div className="product-warranty-data">
                <TbTruckDelivery className="warranty-icon" />
                <p>On time Delivery</p>
              </div>
              <div className="product-warranty-data">
                <MdOutlineSecurity className="warranty-icon" />
                <p>Secure Payments</p>
              </div>
            </div>

            <div className="product-data-info">
              <p>
                Available :
                <span>{stock > 0 ? "In Stock" : "Not Available"}</span>
              </p>
              <p>
                Brand : <span>{company}</span>
              </p>
            </div>
            <hr />
            {stock > 0 && (
              <RenderOnViewportEntry
                threshold={0}
                style={{ minHeight: "240px" }}
              >
                <AddToProduct product={SingleProduct} />
              </RenderOnViewportEntry>
            )}
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    padding: 3rem 0;
  }
  .product-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;

    h2 {
      text-transform: capitalize;
    }

    .product-data-warranty {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 1rem;

      .product-warranty-data {
        text-align: center;

        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          padding: 0.6rem;
        }
        p {
          font-size: 1.4rem;
          padding-top: 0.4rem;
        }
      }
    }

    .product-data-price {
      font-weight: bold;
    }
    .product-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
    }
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      font-size: 1.8rem;

      span {
        font-weight: bold;
        color: #000;
      }
    }

    hr {
      max-width: 100%;
      width: 90%;
      /* height: 0.2rem; */
      border: 0.1rem solid #000;
      color: red;
    }
  }

  .product-images {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
  }
`;

export default SingleProduct;
