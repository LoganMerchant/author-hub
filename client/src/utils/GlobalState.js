import React, { createContext, useContext } from "react";
import { useProjectReducer } from "./reducers"; //this will need to be changed

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
  //establish initialState
  const [state, dispatch] = useProjectReducer({
    //this will need to be changed to match the top
    isPublic: false,
    chapters: [],
    currentChapter: "",
    currentProject: "",
  });
  console.log(state); //when everything is working this should probably be deleted.
  return <Provider value={[state, dispatch]} {...props} />;
};
const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
