import React, { memo, useState } from "react";

import styled from "styled-components";
import LazyImage from "../helpers/LazyImage";

function ProductImages({ image = [{ url: "" }] }) {
  const [imgId, setImgId] = useState(image[0]);

  return (
    <Wrapper>
      <div className=" grid-four-column">
        {image.map((curElem, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setImgId(curElem);
              }}
            >
              <LazyImage src={curElem.url} />
            </div>
          );
        })}
      </div>

      <div className="main-screen">
        <img src={imgId.url} alt={imgId.id} />
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  gap: 1rem;

  .main-screen {
    display: grid;
    place-items: center;
    order: 1;
    img {
      max-width: 100%;
      height: auto;
      box-shadow: ${({ theme }) => theme.colors.shadow};
    }
  }
  .grid-four-column {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    img {
      max-width: 100%;
      max-height: 100%;
      background-size: cover;
      object-fit: contain;
      cursor: pointer;
      box-shadow: ${({ theme }) => theme.colors.shadow};
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    display: flex;
    flex-direction: column;
    order: 1;

    .grid-four-column {
      flex-direction: row;
    }
  }
`;

export default memo(ProductImages);
