import './App.css'
import { AppBar, Box, Toolbar } from '@mui/material';
import { useProfile } from '@hooks/use_profile';
import { pageRoutes } from './routes';
import { Route, Switch, useHistory } from 'react-router-dom';
import Auth from '@pages/Auth';
import SoundCheck from '@pages/SoundCheck';
import ProfileMenu from '@components/ProfileMenu'
import { useEffect } from 'react';

function App() {
  const { profile } = useProfile();
  const history = useHistory();

  useEffect(() => {
    if (!profile) {
      history.replace(pageRoutes.auth);
    }
  }, [profile]);

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Box display="flex" justifyContent="flex-end" width="100%">
            <ProfileMenu />
          </Box>
        </Toolbar>
      </AppBar>

      <Box width={500} m="auto" mt={2}>
        <Switch>
          <Route path={pageRoutes.main} exact>
            <SoundCheck />
          </Route>
          <Route path={pageRoutes.auth} exact>
            <Auth />
          </Route>
        </Switch>
      </Box>
    </>
  );
}

export default App;
