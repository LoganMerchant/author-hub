import { useReducer } from 'react';
import {
    UPDATE_CURRENT_PROJECT,
    UPDATE_CURRENT_CHAPTER,
    UPDATE_CHAPTERS
} from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_CURRENT_PROJECT:
            return {
                ...state,
                currentProject: action.currentProject
            };
        case UPDATE_CURRENT_CHAPTER:
            return {
                ...state,
                currentChapter: action.currentProject,
            };
        case UPDATE_CHAPTERS:
            return {
                ...state,
                chapters: [...action.chapters],
            };
        default:
            return state;
    }
}

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
}