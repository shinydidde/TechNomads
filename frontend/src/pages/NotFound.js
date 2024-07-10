import React from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  main: {
    textAlign: 'center',
    '& h1': {
      fontFamily: '"Fontdiner Swanky", cursive',
      fontSize: '4rem',
      color: '#c5dc50',
      marginBottom: '1rem',
    },
    '& p': {
      marginBottom: '2.5rem',
      '& em': {
        fontStyle: 'italic',
        color: '#c5dc50',
      },
    },
    '& button': {
      fontFamily: '"Fontdiner Swanky", cursive',
      fontSize: '1rem',
      color: 'black',
      border: 'none',
      backgroundColor: '#f36a6f',
      padding: '1rem 2.5rem',
      transform: 'skew(-5deg)',
      transition: 'all 0.1s ease',
      cursor: 'url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/4424790/cursors-eye.png"), auto',
      '&:hover': {
        backgroundColor: '#c5dc50',
        transform: 'scale(1.15)',
      },
    },
  },
}));

const NotFound = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className={classes.container}>
      <main className={classes.main}>
        <h1>Sorry!</h1>
        <p>
          Either you aren't cool enough to visit this page or it doesn't exist <em>. . . like your social life.</em>
        </p>
        <button onClick={handleGoHome}>You can go now!</button>
      </main>
    </div>
  );
};

export default NotFound;
