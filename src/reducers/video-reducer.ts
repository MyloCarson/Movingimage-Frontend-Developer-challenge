import { ADD_VIDEO, FETCH_VIDEOS, TOGGLE_FORM, FETCH_AUTHORS, FETCH_CATEGORIES, SELECT_VIDEO,
     UPDATE_VIDEO,TOGGLE_DELETE_DIALOG, DELETE_VIDEO } from "../actions";
import { IDLE } from "../constants";
import { IState } from "../services/state.interface";
import { getUniqueId } from "../utils";

const reducer = (state: IState, action:{type: string, payload: any}): IState => {
    switch (action.type) {
        case FETCH_VIDEOS:
            return {...state, videos: action.payload} 
        case ADD_VIDEO:
            return {
                ...state,
                formState: IDLE,
                videos: [...state.videos, {...action.payload, id: getUniqueId()}]
            }
        case TOGGLE_FORM:
            return {
                ...state,
                selectedVideo:action.payload.selectedVideo,
                formState: action.payload.formState
            }
        case TOGGLE_DELETE_DIALOG:
            return {
                ...state, 
                selectedVideo:action.payload.selectedVideo,
                deleteDialogState: action.payload.deleteDialogState
            }
        case FETCH_CATEGORIES:
            return {...state, categories: action.payload} 
        case FETCH_AUTHORS:
            return {...state, authors: action.payload}
        case SELECT_VIDEO:
            return {...state, selectedVideo: action.payload}
        case UPDATE_VIDEO:
            return {
                ...state,
                formState: IDLE,
                selectedVideo: undefined,
                videos: [ ...state.videos].map( video => {
                    if(video.id === action.payload.id){
                        video = action.payload
                    }
                    return video;
                }) }
        case  DELETE_VIDEO:
            const videos = [ ...state.videos].filter( video => video.id !== action.payload.id )
            return {...state, deleteDialogState: IDLE, selectedVideo: undefined, videos }

        default:
            return state;
    }
}

export default reducer;