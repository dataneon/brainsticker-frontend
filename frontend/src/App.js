import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Welcome from './components/app/Welcome';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Logout from './components/auth/Logout';
import Dashboard from './components/app/Dashboard';
import Canvas from './components/app/Canvas';
import EditCanvas from './components/app/EditCanvas';
import EditNote from './components/app/EditNote';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' component={Welcome} exact />
          <Route path='/login' component={Login} exact />
          <Route path='/signup' component={Signup} exact />
          <Route path='/logout' component={Logout} exact />
          <Route path='/dashboard' component={Dashboard} exact />
          <Route path='/canvas/:canvasID' component={Canvas} exact />
          <Route path='/canvas/:canvasID/editcanvas/:userID' component={EditCanvas} exact />
          <Route path='/canvas/:canvasID/editnote/:noteID' component={EditNote} exact />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
