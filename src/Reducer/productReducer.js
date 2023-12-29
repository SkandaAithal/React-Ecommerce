const ProductReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: true,
        isError: false,
        products: [],
        featureProducts: [],
      };
    case "API_FETCH":
      return {
        ...state,
        isLoading: false,
        isError: false,
        products: action.payload,
        featureProducts: action.payload.filter(
          ({ featured }) => featured === true
        ),
      };
    case "API_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
        products: [],
        featureProducts: [],
      };

    case "SINGLE_LOADING":
      return {
        ...state,
        isSingleLoading: true,
        SingleProduct: {},
      };
    case "SINGLE_PRODUCT":
      return {
        ...state,
        isSingleLoading: false,
        SingleProduct: action.payload,
        imageArray: action.payload.image,
      };

    default:
      return state;
  }
};
export default ProductReducer;
