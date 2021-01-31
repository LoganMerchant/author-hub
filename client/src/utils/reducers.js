import { useReducer } from "react";
import {
  UPDATE_CURRENT_PROJECT,
  UPDATE_CURRENT_CHAPTER,
  UPDATE_CHAPTERS,
  UPDATE_CURRENT_PROJECTS,
  UPDATE_CURRENT_COLLABORATIONS,
  ADD_SINGLE_PROJECT,
  ADD_SINGLE_CHAPTER
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_PROJECT:
      return {
        ...state,
        currentProject: action.currentProject,
      };
    case UPDATE_CURRENT_CHAPTER:
      return {
        ...state,
        currentChapter: action.currentChapter,
      };
    case UPDATE_CHAPTERS:
      return {
        ...state,
        chapters: [...action.chapters],
      };
    case UPDATE_CURRENT_COLLABORATIONS:
      return {
        ...state,
        collaborations: [...action.collaborations],
      };
    case UPDATE_CURRENT_PROJECTS:
      return {
        ...state,
        projects: [...action.projects],
      };
    case ADD_SINGLE_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.project],
      };
    case ADD_SINGLE_CHAPTER:
      return {
        ...state,
        chapters: [...state.chapters, action.chapter],
      };
    default:
      return state;
  }
};

export function useProjectReducer(initialState) {
  return useReducer(reducer, initialState);
}
