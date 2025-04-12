import { makeStyles } from '@mui/styles'; // Đúng

export default makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.primary.main,
    color: 'black',
    marginBottom: 20,
    fontWeight: 'lighter',
    padding: '5px 0',
  },
  li: {
    fontWeight: 'bold',
  },
  'navbar-brand fas fa-hotel' :{
    fontWeight: 'bold',
    paddingLeft: '100px',
    color: 'white',
  },
  
}));
