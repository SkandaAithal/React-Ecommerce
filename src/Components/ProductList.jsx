import React, { Suspense, lazy } from "react";
import { useFilterProducts } from "../context/filtercontext";
import GridViewList from "./GridViewList ";
import Loader from "./Loader";

const ListView = lazy(() => import("./ListView"));

export default function ProductList() {
  const { filterProducts, gridView } = useFilterProducts();

  if (gridView === true) {
    return <GridViewList products={filterProducts} />;
  }
  if (gridView === false) {
    return (
      <Suspense fallback={<Loader />}>
        <ListView products={filterProducts} />
      </Suspense>
    );
  }
}
