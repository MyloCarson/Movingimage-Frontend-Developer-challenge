import React, {useEffect, useState, useContext} from 'react';
import { Button, FormControl, FormHelperText, Input, InputLabel, MenuItem, Modal, Select, TextField } from '@material-ui/core';
import { FormValues } from './form.interface';
import { Category } from '../services/category.interface';
import { makeStyles } from '@material-ui/core/styles';
import { Author } from '../services/author.interface';
import {Formik} from 'formik';
import { getUniqueId, getCategoriesNames, getCategoriesIds } from '../utils';
import * as yup  from 'yup';
import { VideoContext } from '../contexts/video-context';
import { TOGGLE_FORM, ADD_VIDEO, UPDATE_VIDEO } from '../actions';
import { Video } from '../services/video.interface';
import { ADD_STATE, EDIT_STATE, IDLE } from '../constants';


const useStyles = makeStyles((theme) => ({
    formControl: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      width: '100%',
    },
    modalContainer: {
        backgroundColor: '#fff',
        width: '300px',
        height: '400px',
        padding: '1.5rem',
        [theme.breakpoints.up('lg')]: {
            padding: '3rem'
        },
    },
    cancelButton: {
        marginLeft: theme.spacing(1),
        [theme.breakpoints.up('lg')]: {
            marginLeft: theme.spacing(2),
        },
    }
  }));

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

const schema = yup.object().shape({
    id: yup.number(),
    name: yup.string().required('Video name is required'),
    author: yup.string().required('Video author is required'),
    categories: yup.array().of(yup.string()).required('Choose a category')
})


export const Form: React.FC<{}> = () => {

    const { state , dispatch} = useContext(VideoContext);
    const classes = useStyles();
    
    const NEW_FORM_VALUES: FormValues = React.useMemo(() => {
        return {
            id: 0,
            name: '',
            author: '',
            categories: [],
        }
    }, [])

    const [categories, setCategories] = useState<Category[]>([])
    const [authors, setAuthors] = useState<Author[]>([]);

    const [formValues, setFormValues] = useState<FormValues>(NEW_FORM_VALUES);

    const handleClose = () => {
        dispatch({type: TOGGLE_FORM, payload: {formState: IDLE}})
    }


    

    useEffect(() => {
        setCategories(state.categories);
        setAuthors(state.authors);
    }, [state.categories, state.authors]);
    
    useEffect(() => {
        if(state.formState === EDIT_STATE && state.selectedVideo){
            setFormValues({
                id: state.selectedVideo.id,
                name: state.selectedVideo.name,
                author: state.selectedVideo.author,
                categories: getCategoriesIds(state.selectedVideo.categories, categories)
            })
        } else {
            setFormValues(NEW_FORM_VALUES)
        }

    }, [state.formState, state.selectedVideo, categories, NEW_FORM_VALUES]);
    
    return (
        <Modal
          open={state.formState !== IDLE}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div className={classes.modalContainer}>
            <h3>{state.formState === ADD_STATE ? 'Add a Video': 'Edit Video'}</h3>
            <Formik
                initialValues={formValues}
                validationSchema={schema}
                onSubmit={ (values) => {
                    const video: Video = {
                        id: values.id,
                        name: values.name,
                        author: values.author,
                        categories: getCategoriesNames(values.categories, categories)
                    }

                    if(state.formState === ADD_STATE){
                        dispatch({type: ADD_VIDEO, payload: video})
                    } else {
                        dispatch({type: UPDATE_VIDEO, payload: video})
                    }
                }}>
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <TextField id="id" label="id" name="id" value={values.id} style={{display: 'none'}} />
                        <div>
                        <FormControl className={classes.formControl} error={(touched.name && !!errors.name)}>
                            <TextField id="name" label="Video name" name="name" value={values.name} onChange={handleChange} />
                            {touched.name && errors.name && (<FormHelperText>{errors.name}</FormHelperText>)}
                        </FormControl>
                        </div>
                        <div>
                    
                        <FormControl className={classes.formControl} error={(touched.author && !!errors.author)}>
                            <InputLabel id="video-author-select-helper-label">Video author</InputLabel>
                            <Select
                                labelId="video-author-select-helper-label"
                                id="author"
                                name="author"
                                value={values.author}
                                onChange={handleChange}
                                >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {authors && authors.map( author => (
                                    <MenuItem key={getUniqueId()} value={author.name}>{author.name}</MenuItem>
                                ))}
                            </Select>
                            {touched.author && errors.author && (<FormHelperText>{errors.author}</FormHelperText>)}
                        </FormControl>
                    </div>
                    <div>
    
                    <FormControl className={classes.formControl} error={(touched.categories && !!errors.categories)}>
                        <InputLabel id="video-category-select-label">Video category</InputLabel>
    
                        <Select
                            labelId="video-category-select-label"
                            id="categories"
                            name="categories"
                            multiple
                            value={values.categories}
                            onChange={handleChange}
                            input={<Input />}
                            MenuProps={MenuProps}
                            >
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {touched.categories && errors.categories && (<FormHelperText>{errors.categories}</FormHelperText>)}
                    </FormControl>
                    </div>
                    <div style={{marginTop: '4rem'}}>
                        <Button type="submit"  variant="contained" color="primary">{state.formState === ADD_STATE ? 'Submit': 'Update' }</Button>
                        <Button className={classes.cancelButton} variant="contained" color="secondary" onClick={handleClose}>Cancel</Button>
                    </div>
                </form>
                )}
            </Formik>
            
            
          </div>
        </Modal>
    )
}