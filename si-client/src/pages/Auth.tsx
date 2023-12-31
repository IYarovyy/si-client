
import React, { useState } from 'react';
import { FC } from "react";
import { paths } from "../routes"


import { Box, Button, TextField, Typography } from '@mui/material';

import { useHistory } from 'react-router-dom';
// import { pageRoutes } from '../routes';
import { toast } from 'react-toastify';
import { loginUser, useAuthState, useAuthDispatch } from '@contexts/index';

const Auth: FC = () => {
  const history = useHistory();
  const dispatch = useAuthDispatch();
  const { loading } = useAuthState();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const resp = await loginUser(dispatch, email, password);
      if (resp?.error) {
        toast.error(resp?.error, {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        return;
      }
      history.replace(paths.main);
    } catch (e) {
      console.error(e)
      toast.error("Authorization failed", {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    }
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="300px"
      margin="36px auto auto"
    >
      <Box mb={6}>
        <Typography display="block" variant="h1" component="h2">
          Sign in
        </Typography>
      </Box>

      <form
        noValidate
        autoComplete="off"
        style={{ width: '100%' }}
        onSubmit={onSubmit}
      >
        <Box mb={2}>
          <TextField
            fullWidth
            autoComplete="off"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Box>

        <Box mb={2}>
          <TextField
            fullWidth
            autoComplete="off"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={loading}
          fullWidth
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Auth;
