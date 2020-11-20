import React from 'react';
import { INITIAL_GLOBAL_STATE } from '../constants';
import { IState } from '../services/state.interface';

export const VideoContext = React.createContext<{ state: IState, dispatch: React.Dispatch<any>}>({state: INITIAL_GLOBAL_STATE, dispatch: () => null});