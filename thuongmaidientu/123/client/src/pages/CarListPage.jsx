import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch } from "react-redux";

import Header from "../components/Header";
import PostList from "../components/PostList";
import UserList from "../components/UserList";
import CarList from "../components/CarList";
import useStyles from "./styles";
import {
  showModal_Post,
  showModal_User,
  showModal_Car,
} from "../redux/actions";
import CreateCarModal from "../components/CreateCarModal";
import { Container, Fab } from "@mui/material";

export default function CarListPage() {
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
    <div  className='w-[80vw] flex flex-col mx-auto '>
      <Header />
      <CarList />

      <CreateCarModal />
     
    </div>
  );
}
