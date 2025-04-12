import React from 'react';

import Header from '../components/Header';
import CarList from '../components/CarList';
import CreateCarModal from '../components/CreateCarModal';
import { Container, Fab } from '@mui/material';

export default function CarListPage() {
  return (
    <Container maxWidth='lg'>
      <Header />
      <CarList />
      <CreateCarModal/>
    </Container>
  );
}
