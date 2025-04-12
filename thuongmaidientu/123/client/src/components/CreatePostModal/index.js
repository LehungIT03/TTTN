import FileBase64 from 'react-file-base64';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modalState$ } from '../../redux/selectors';
import useStyles from './styles';
import { createPost, hideModal_Post } from '../../redux/actions';
import { Button, Modal, TextareaAutosize, TextField } from '@mui/material';

export default function CreatePostModal() {
  const [data, setData] = React.useState({
    title: '',
    content: '',
    attachment: '',
  });
  const dispatch = useDispatch();
  const { isShow } = useSelector(modalState$);

  const onClose = React.useCallback(() => {
    dispatch(hideModal_Post());
    setData({
      title: '',
      content: '',
      attachment: '',
    });
  }, [dispatch]);

  const onSubmit = React.useCallback(() => {
    dispatch(createPost.createPostRequest(data));
    onClose();
  }, [data, dispatch, onClose]);

  const body = (
    <div  id='simple-modal-title'>
      <h2>Create New Post</h2>
      <form noValidate autoComplete='off' >
        <TextField
          
          required
          label='Title'
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        <TextareaAutosize
          
          rowsMin={10}
          rowsMax={15}
          placeholder='Content...'
          value={data.content}
          onChange={(e) => setData({ ...data, content: e.target.value })}
        />
        <FileBase64
          accept='image/*'
          multiple={false}
          type='file'
          value={data.attachment}
          onDone={({ base64 }) => setData({ ...data, attachment: base64 })}
        />
        <div >
          <Button
            variant='contained'
            color='primary'
            component='span'
            fullWidth
            onClick={onSubmit}
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <Modal open={isShow} onClose={onClose}>
        {body}
      </Modal>
    </div>
  );
}
