import React from 'react';
import { useDispatch } from 'react-redux';

import Header from '../components/Header';
import CarList from '../components/CarList';
import { showModal_Post, showModal_User,showModal_Car } from '../redux/actions';
import slide from '../assets/background.jpg'
import LogoRun from '../components/LogoRun';
import SlideShow from '../components/SlideShow';

export default function HomePage() {
  const dispatch = useDispatch();

  const openCreatePostModal = React.useCallback(() => {
    dispatch(showModal_Post());
  }, [dispatch]);

  const openCreateUserModal = React.useCallback(() => {
    dispatch(showModal_User());
  }, [dispatch]);

  const openCreateCarModal = React.useCallback(() => {
    dispatch(showModal_Car());
  }, [dispatch]);

  return (
    <div className='w-[80vw] flex flex-col mx-auto '>
      <Header />
      <SlideShow />

      <CarList />
      <div style={{height: '40px', width: '100%'}}></div>
      <LogoRun />
    </div>

    
  );
}
