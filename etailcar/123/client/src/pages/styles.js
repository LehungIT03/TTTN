import { makeStyles } from '@mui/styles'; // Đúng


export default makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },

  'login': {
    width: '400px',
    alignItems: 'center',
    background: '#fff',
    border: '1px solid #dddfe2',
    boxShadow: '0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)',
    borderRadius: '8px',
    padding: '1rem',
    
    textAlign: 'center',
  },

  'input':{
    borderRadius: '8px',
    border: '2px solid #dddfe2',
    outline: 'none',
    color: '#1d2129',
    margin: '0.5rem 0',
    padding: '0.5rem 0.75rem',
    width: '92%',
    fontSize: '1rem',
  },

  'input_hide':{
    borderRadius: '8px',
    border: '2px solid #dddfe2',
    outline: 'none',
    color: '#1d2129',
    margin: '0.5rem 0',
    padding: '0.5rem 0.75rem',
    width: '92%',
    fontSize: '1rem',
    display:'none',
  },

  'button':{
    background: '#1877f2',
    border: '1px solid #1877f2',
    color: '#fff',
    fontSize: '1.25rem',
    padding: '0.5rem',
    margin: '0.5rem 0',
    borderRadius: '8px',
    outline: 'none',
    cursor: 'pointer',
  }
}));
