import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import reducerFunction from "../Reducer/productReducer";
const API_URL = "https://api.pujakaitem.com/api/products";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  let [nav, setNav] = useState("");
  let initialState = {
    isLoading: false,
    isError: false,
    products: [],
    featureProducts: [],
    isSingleLoading: false,
    SingleProduct: {},
  };

  const [state, dispatch] = useReducer(reducerFunction, initialState);

  // Single product

  const getSingleProduct = async (url, controllerSignal) => {
    dispatch({ type: "SINGLE_LOADING" });
    try {
      let { data } = await axios.get(url, { signal: controllerSignal });
      let SingleProduct = await data;
      dispatch({ type: "SINGLE_PRODUCT", payload: SingleProduct });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    async function getProducts(url) {
      dispatch({ type: "LOADING" });
      try {
        let { data } = await axios.get(url, {
          signal: abortController.signal,
        });

        dispatch({ type: "API_FETCH", payload: data });
      } catch (error) {
        dispatch({ type: "API_ERROR" });
      }
    }
    getProducts(API_URL);

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <AppContext.Provider
      value={{ ...state, getSingleProduct, dispatch, setNav, nav }}
    >
      {children}
    </AppContext.Provider>
  );
};

// custom hooks for the above context
const useProductContext = () => {
  return useContext(AppContext);
};
export { AppProvider, useProductContext };
