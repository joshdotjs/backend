import { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';

import UsersTable from './table-users';
import Navbar from './navbar';
import CreateUserForm from './form-create-user';

import { http } from './util/http';
import { apiUrl } from './util/url';
import { asynch } from './util/async';
import { sortDataById } from './util/sort';

import { useNotification } from './hooks/use-notification';


// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function HomePage () {

  const [users, setUsers] = useState([]);

  const [notify] = useNotification();

  // ============================================

  const getUsers = async () => {
    const URL = apiUrl('users');
    const promise = http({ url: URL });
    const [data, error] = await asynch( promise );
    if (error) {
      console.error(error);
      notify({message: 'Error getting users...', variant: 'error', duration: 2000})();
      return;
    }

    const sorted_data = sortDataById(data);
    // console.log('data: ', data);
    setUsers(sorted_data);
  };

  // ============================================

  const deleteUser = async (id) => {
    notify({message: `deleting user ${id}...`, variant: 'warning', duration: 2000})();
    const endpoint = `users/${id}`;
    const URL = apiUrl(endpoint);
    // const data = await http({ url: URL, method: 'DELETE' });
    const promise = http({ url: URL, method: 'DELETE' });
    const [data, error] = await asynch( promise );
    if (error) {
      console.error(error);
      notify({message: `Error deleting user ${id}...`, variant: 'error', duration: 5000})();
      return;
    }

    notify({message: `successfully deleted user ${id}! 🙂`, variant: 'success'})();
    // console.log('data: ', data);
    getUsers();
  };

  // ============================================

  const editUser = async ({ id, updated_user }) => {
    notify({message: `updating user ${id}...`, variant: 'info'})();
    const endpoint = `users/${id}`;
    const URL = apiUrl(endpoint);
    const data = await http({ url: URL, method: 'PUT', body: { 
      id: +id,
      email: updated_user.email,
      password: updated_user.password,
      is_admin: updated_user.is_admin,
    } });
    notify({message: `successfully updated user ${id}! 🙂`, variant: 'success'})();
    // console.log('data: ', data);
    getUsers();
  };

  // ============================================

  const createUser = async (user) => {
    notify({message: 'creating new user...', variant: 'info', duration: 1000})();
    const URL = apiUrl('users');
    // const data = await http({ url: URL, method: 'POST', body: { 
    //   email: user.email,
    //   password: user.password,
    //   is_admin: user.is_admin,
    // } });

    const promise = http({ url: URL, method: 'POST', body: { 
      email: user.email,
      password: user.password,
      is_admin: user.is_admin,
    } });

    const [data, error] = await asynch( promise );
    if (error) {
      notify({message: 'Error creating user...', variant: 'error', duration: 5000})();
      console.log('if(error) in createUser()');
      console.log(error);
      return;
    } else {
      notify({message: 'successfully created new user! 🙂', variant: 'success'})();
      console.log('data: ', data);
      getUsers();
    }

  };

  // ============================================

  useEffect(() => {
    getUsers();
  }, []);

  // ============================================

  return (
    <>
      <Navbar />

      <Container sx={{ border: 'solid white 1px', borderTop: 'none', minHeight: '94vh'}}>
        
        <Typography variant="h2"
          sx={{ pt: 4, mb: 4, textAlign: 'center', color: 'primary.main' }}
          title="page-home-title"
          data-testid="page-home-title"
        >
          Create a new user:
        </Typography>

        <Paper elevation={3} sx={{ p: 4, mb: 4}}>
          <CreateUserForm { ...{ createUser}} />
        </Paper>

        <Typography variant="h2"
          sx={{ pt: 4, mb: 4, textAlign: 'center', color: 'primary.main' }}
        >
          Current users:
        </Typography>

        <UsersTable { ...{ users, editUser, deleteUser } } sx={{ mb: 4 }}/>

      </Container>
    </>
  );
};