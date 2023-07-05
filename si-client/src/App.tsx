import './App.css'
import { AppBar, Box, Toolbar } from '@mui/material';
import {useToken} from '@hooks/use_token';
import { pageRoutes } from './routes';
import { Route, Switch, useHistory } from 'react-router-dom';
import Auth from './pages/Auth';
import SoundCheck from '@pages/SoundCheck';

function App() {
  const { token } = useToken();

  const history = useHistory();

  if(!token) {
    history.replace(pageRoutes.auth);
  }
  
  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Box display="flex" justifyContent="flex-end" width="100%">
            <div>Usedr Profile</div>
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
