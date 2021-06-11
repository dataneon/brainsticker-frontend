import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Welcome from './components/app/Welcome';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Logout from './components/auth/Logout';
import Dashboard from './components/app/Dashboard';
import Canvas from './components/app/Canvas';
import AddCanvas from './components/app/AddCanvas';
import EditCanvas from './components/app/EditCanvas';

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
          <Route path='/canvas/:id' component={Canvas} exact />
          <Route path='/addcanvas/' component={AddCanvas} exact />
          <Route path='/canvas/:id/editcanvas/' component={EditCanvas} exact />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
