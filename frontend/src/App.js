import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import ShowUsers from './components/app/ShowUsers'; // delete later
import Welcome from './components/app/Welcome';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Logout from './components/auth/Logout';
import Dashboard from './components/app/Dashboard';

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
        </Switch>
      </Router>
    </div>
  );
};

export default App;
