import React, {useContext} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { VideoContext } from '../contexts/video-context';
import { IDLE } from '../constants';
import { TOGGLE_DELETE_DIALOG, DELETE_VIDEO } from '../actions';

export const DeleteVideoDialog: React.FC<{}> = () => {

    const { state , dispatch} = useContext(VideoContext);

    const handleClose = ()=> {
        dispatch({type: TOGGLE_DELETE_DIALOG, payload: IDLE})
    }

    const handleDelete = () => {
        dispatch({type: DELETE_VIDEO, payload: state.selectedVideo})
    }

    return(
        <Dialog
            open={state.deleteDialogState !== IDLE}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Delete Video?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you certain you want to delete this video? There is no undo.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                No, cancel
            </Button>
            <Button onClick={handleDelete} color="secondary" autoFocus>
                Yes, proceed
            </Button>
            </DialogActions>
        </Dialog>
    )
}