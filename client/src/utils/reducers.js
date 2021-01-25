import { useReducer } from "react";
import {
  UPDATE_CURRENT_PROJECT,
  UPDATE_CURRENT_CHAPTER,
  UPDATE_CHAPTERS,
  ADD_COMMENT,
  ADD_COMMIT,
  ADD_APPLICANT,
  ADD_COLLABORATOR,
  REMOVE_CHAPTER,
  REMOVE_PROJECT
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
    case ADD_COMMENT:
      return {
        ...state,
        currentChapter: [...state.currentChapter, action.comment],
      };
    case ADD_COMMIT:
      return {
        ...state,
        currentChapter: [...state.currentChapter, action.commit],
      }
    case ADD_APPLICANT:
      return {
        ...state,
        currentProject: [...state.currentProject, action.applicant],
      }
    case ADD_COLLABORATOR:
      return {
        ...state,
        currentProject: [...state.currentProject, action.collaborator],
      };
    case REMOVE_CHAPTER:
      let newState = state.chapters.filter(chapter => {
        return chapter._id !== action._id;
      });
      return {
        ...state,
        chapters: newState
      }
    case REMOVE_PROJECT:
      let newState = state.projects.filter(project => {
        return project._id !== project._id;
      });
      return {
        ...state,
        projects: newState
      };
    default:
      return state;
  }
};

export function useProjectReducer(initialState) {
  return useReducer(reducer, initialState);
}
