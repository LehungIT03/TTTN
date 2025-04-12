import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch } from "react-redux";

import Header from "../components/Header";
import UserList from "../components/UserList";
import useStyles from "./styles";
import {
  showModal_Post,
  showModal_User,
  showModal_Car,
} from "../redux/actions";
import CreateUsersModal from "../components/CreateUsersModal";
import { Container, Fab } from "@mui/material";

export default function UsersListPage() {
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
    <Container maxWidth="lg">
      <Header />
      <UserList />

      <CreateUsersModal />

      <Fab color="primary" onClick={openCreatePostModal}>
        <AddIcon />
      </Fab>

      <Fab color="primary" onClick={openCreateUserModal}>
        <AddIcon />
      </Fab>
      <Fab color="primary" onClick={openCreateCarModal}>
        <AddIcon />
      </Fab>
    </Container>
  );
}
