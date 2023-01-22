import { createContext, useReducer } from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const PartnerContext = createContext();

export const PartnerContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    combinedId: "null",
    // user: {},
  };

  const partnerReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          // user: action.payload,
          combinedId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(partnerReducer, INITIAL_STATE);

  return (
    <PartnerContext.Provider value={{ data: state, dispatch }}>
      {children}
    </PartnerContext.Provider>
  );
};
