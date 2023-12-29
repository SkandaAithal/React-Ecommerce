import React, { useEffect, useRef, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import styled from "styled-components";
const BlurredBackground = styled.div`
  position: absolute;
  filter: blur(30px);
  background-color: #2d233a;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
function LazyImage({ src }) {
  const [isLoading, setIsLoading] = useState(true);
  const placeholderRef = useRef(null);
  const [view, setView] = useState("");

  useEffect(() => {
    const options = {
      rootMargin: "0px 0px",
      threshold: 0,
    };
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setView(src);
        observer.disconnect();
      }
    }, options);

    if (placeholderRef && placeholderRef.current) {
      observer.observe(placeholderRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <>
      {isLoading && (
        <div
          ref={placeholderRef}
          style={{
            textAlign: "center",
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <BlurredBackground />
          <LoadingSpinner />
        </div>
      )}
      <img
        src={view}
        alt=""
        style={{ display: isLoading ? "none" : "block" }}
        onLoad={() => {
          setIsLoading(false);
        }}
      />
    </>
  );
}

export default LazyImage;
