import { IState } from "../services/state.interface";

export const IDLE = 'idle'
export const ADD_STATE = 'add_state';
export const EDIT_STATE = 'edit_state';
export const DELETE_STATE = 'delete_state';


export const INITIAL_GLOBAL_STATE: IState = {
    videos: [],
    categories: [],
    authors: [],
    formState: IDLE,
    deleteDialogState: IDLE
}