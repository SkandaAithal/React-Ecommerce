import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import FormatPrice from "../helpers/FormatPrice";
import { useProductContext } from "../context/productcontext";

import LazyImage from "../helpers/LazyImage";

function Product({ id, name, image, price, category }) {
  let location = useLocation();
  location = location.pathname;
  let { setNav } = useProductContext();

  useEffect(() => {
    setNav(location);
  }, [location]);
  return (
    <Link
      to={`/singleproduct/${id}`}
      onClick={() => {
        window.scrollTo(0, 0);
      }}
    >
      <div className="card">
        <figure>
          <LazyImage src={image} />

          <figcaption className="caption">{category}</figcaption>
        </figure>

        <div className="card-data">
          <div className="card-data-flex">
            <h3>{name}</h3>
            <p className="card-data--price">
              <FormatPrice price={price} number={100} />
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Product;
