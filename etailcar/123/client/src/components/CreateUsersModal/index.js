import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modalState$ } from '../../redux/selectors';
import useStyles from './styles';
import { createUser, hideModal_User } from '../../redux/actions';
import { Button, Modal, TextField } from '@mui/material';

export default function CreateUsersModal() {
  const [data, setData] = React.useState({
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      identify: '',
      email: '',
      phonenumber:'',
  });
  const dispatch = useDispatch();
  const { isShow } = useSelector(modalState$);
  const onClose = React.useCallback(() => {
    dispatch(hideModal_User());
    setData({
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      identify: '',
      email: '',
      phonenumber:'',
    });
  }, [dispatch]);

  const onSubmit = React.useCallback(() => {
    dispatch(createUser.createUserRequest(data));
    onClose();
  }, [data, dispatch, onClose]);

  const body = (
    <div  id='simple-modal-username'>
      <h2 className='text-[15px] font-bold text-center'>Create User</h2>
      <form noValidate autoComplete='off' >
        <TextField
          
          required
          label='Tên tài khoản'
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />
        
        <TextField
          
          required
          label='Họ'
          value={data.firstname}
          onChange={(e) => setData({ ...data, firstname: e.target.value })}
        />

        <TextField
          
          required
          label='Tên'
  
          value={data.lastname}
          onChange={(e) => setData({ ...data, lastname: e.target.value })}
        />

        <TextField
          
          required
          label='CMND'
          value={data.identify}
          type='number'
          onChange={(e) => setData({ ...data, identify: e.target.value })}
        />

        <TextField
          
          required
          label='Email'
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}

        />

        <TextField
          
          required
          label='Số điện thoại'
          value={data.phonenumber}
          type='number'
          onChange={(e) => setData({ ...data, phonenumber: e.target.value })}
        />

        <TextField
          
          required
          label='Mật khẩu'
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
 
        />

        
        <div >
          <Button
            variant='contained'
            color='primary'
            component='span'
            fullWidth
            onClick={onSubmit}
          >
            Create Account
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
