import React, { createContext, useContext } from "react";
import { useProjectReducer } from "./reducers";

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProjectReducer({
    currentProject: {}, //both the current project and current chapter will most likely be called.
    currentChapter: {},
    chapters: [],
    projects: [],
  });
  // console.log(state); //when everything is working this should probably be deleted.
  return <Provider value={[state, dispatch]} {...props} />;
};
const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
