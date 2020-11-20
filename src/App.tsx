import React, { useEffect, useReducer, useState } from 'react';
import { AppBar, Button, Container, FormControl, TextField, Toolbar, Typography } from '@material-ui/core';
import { VideosTable } from './components/videos-table';
import { getVideos } from './services/videos';
import { Video } from './services/video.interface';
import { Form } from './components/form';
import videoReducer from './reducers/video-reducer';
import { IState } from './services/state.interface';
import { FETCH_AUTHORS, FETCH_CATEGORIES, FETCH_VIDEOS, TOGGLE_FORM } from './actions';
import { VideoContext } from './contexts/video-context';
import { Category } from './services/category.interface';
import { Author } from './services/author.interface';
import { getAuthors } from './services/authors';
import { getCategories } from './services/categories';
import { ADD_STATE, INITIAL_GLOBAL_STATE } from './constants';
import { DeleteVideoDialog } from './components/delete-video-dialog';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.up('lg')]: {
      marginTop: theme.spacing(2),
  },
  },
  group: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
  },
  searchButton: {
    marginLeft: theme.spacing(2),
  }
}));


const App: React.FC = () => {
  const initialState: IState = INITIAL_GLOBAL_STATE;

  const classes = useStyles();

  const [state, dispatch] = useReducer(videoReducer,initialState);

  const [videos, setVideos] = useState<Video[]>([]);

  const [inputValue, setInputValue] = useState<string>('');

  const handleSearch = (name: string) => {
    if(name){
      setVideos([...state.videos].filter( video => video.name.includes(name)))

    } else {
      setVideos(state.videos)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const handleVideosResponse = (videos: Video[]) => {
    dispatch({type: FETCH_VIDEOS, payload: videos});
  };

  const handleCategoriesResponse = (categories: Category[]) => {
    dispatch({type: FETCH_CATEGORIES, payload: categories})
  }

  const handleAuthorResponse = (authors: Author[]) => {
    dispatch({type: FETCH_AUTHORS, payload: authors})
  }

  const handleClick = () => {
    dispatch({type: TOGGLE_FORM, payload: {formState: ADD_STATE}})
  }

  useEffect(() => {
    getVideos().then(handleVideosResponse);
    getCategories().then(handleCategoriesResponse)
    getAuthors().then(handleAuthorResponse);
  }, []);

  useEffect(()=>{
    setVideos(state.videos)
  }, [state.videos])

  return (
    <VideoContext.Provider value={{ state, dispatch}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Video Manager</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <div className={classes.group}>
          <div>
            <FormControl>
                <TextField id="name" label="Search by name" size="small" name="search" variant="outlined" value={inputValue} onChange={handleChange} />
            </FormControl>
            <Button className={classes.searchButton} size="medium" variant="contained" color="primary" onClick={handleSearch.bind(this, inputValue)}>Search</Button>
          </div>
          <Button className={classes.button} variant="contained" color="primary" onClick={handleClick}>Add New Video</Button>
        </div>
        
        <VideosTable videos={videos} />
        <Form/>
        <DeleteVideoDialog />
      </Container>
    </VideoContext.Provider>
  );
};

export default App;
