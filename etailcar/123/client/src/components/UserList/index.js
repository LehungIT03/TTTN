import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions';

import User from './User';
import { usersState$ } from '../../redux/selectors';
import { Grid } from '@mui/material';

export default function UserList() {
  const dispatch = useDispatch();
  const users = useSelector(usersState$);

  React.useEffect(() => {
    dispatch(actions.getUsers.getUsersRequest());
  }, [dispatch]);

  return (
    <Grid container spacing={2} alignItems='stretch'>
      {users.map((user) => (
        <Grid key={user._id} item xs={12} sm={6}>
          <User user={user} />
        </Grid>
      ))}
    </Grid>
  );
}
