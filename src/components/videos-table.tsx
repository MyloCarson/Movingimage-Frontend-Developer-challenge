import React, {useContext} from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@material-ui/core';
import { VideosTableProps } from './videos-table.interface';
import { VideoContext } from '../contexts/video-context';
import { TOGGLE_FORM, TOGGLE_DELETE_DIALOG } from '../actions';
import { Video } from '../services/video.interface';
import { EDIT_STATE, DELETE_STATE } from '../constants';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  editButton: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      marginRight: theme.spacing(2),
      marginBottom: 0,
    },
  },
}));


export const VideosTable: React.FC<VideosTableProps> = ({ videos }) => {
  const { dispatch} = useContext(VideoContext);

  const classes = useStyles();

  const handleEdit = (video: Video) => {
    dispatch({type: TOGGLE_FORM, payload: { selectedVideo: video, formState: EDIT_STATE}})
  }

  const handleDelete = (video: Video) => {
    dispatch({type: TOGGLE_DELETE_DIALOG, payload: {selectedVideo: video, deleteDialogState: DELETE_STATE}  })
  }

  return (
    <TableContainer component={Paper} style={{ marginTop: '40px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Video Name</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Categories</TableCell>
            <TableCell>Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {videos.map((video) => (
            <TableRow key={video.id}>
              <TableCell component="th" scope="row">
                {video.name}
              </TableCell>
              <TableCell>{video.author}</TableCell>
              <TableCell>{video.categories.join(', ')}</TableCell>
              <TableCell>
                <Button className={classes.editButton} variant="outlined" color="primary" onClick={handleEdit.bind(this, video)}>Edit</Button>
                <Button variant="contained" color="secondary" onClick={handleDelete.bind(this, video)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
