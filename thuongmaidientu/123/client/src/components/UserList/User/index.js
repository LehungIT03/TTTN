import React from 'react';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../redux/actions';
import { Avatar, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';

export default function User({ user }) {

  return (
    <Card>
      <CardHeader
        avatar={<Avatar>user.username</Avatar>}
        title={user.username}
        subheader={moment(user.updatedAt).format('HH:MM MMM DD,YYYY')}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
      />
      
      <CardContent>
        <Typography variant='h5' color='textPrimary'>
          {user.password}
        </Typography>
        <Typography variant='h5' color='textPrimary'>
          {user.firstname}
        </Typography>
        <Typography variant='h5' color='textPrimary'>
          {user.lastname}
        </Typography>
        <Typography variant='h5' color='textPrimary'>
          {user.identify}
        </Typography>
        <Typography variant='h5' color='textPrimary'>
          {user.email}
        </Typography>
        <Typography variant='h5' color='textPrimary'>
          {user.phonenumber}
        </Typography>
        
      </CardContent>
    </Card>
  );
}
