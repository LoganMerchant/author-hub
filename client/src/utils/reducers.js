import { useReducer } from "react";
import { EXAMPLE_CASE } from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case EXAMPLE_CASE:
      return {
        ...state,
        something: [...action.products],
      };
    default:
      return state;
  }
};

export function useProjectReducer(initialState) {
  return useReducer(reducer, initialState);
}
