import { createContext, useContext, useEffect, useReducer } from "react";
import reducerFunction from "../Reducer/usersReducer";
const UserContext = createContext();
const UserProvider = ({ children }) => {
  const initialState = {
    isLoggedin: false,
    userRole: "user",
    openLogin: false,
    isNotify: false,
    notifyMessage: "",
    notifyColor: "#4caf50",
  };
  const [state, dispatchUser] = useReducer(reducerFunction, initialState);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatchUser({ type: "CLOSE_NOTIFICATION" });
    }, 4500);

    return () => clearTimeout(timeout);
  }, [state.isNotify]);

  return (
    <UserContext.Provider value={{ ...state, dispatchUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};
export { UserProvider, useUserContext };
