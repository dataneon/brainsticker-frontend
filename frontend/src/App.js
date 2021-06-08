import './App.css';
import { Route } from 'react-router-dom';
import ShowUsers from './components/app/ShowUsers' // delete later
import Welcome from './components/app/Welcome'

function App() {
  return (
    <div className="App">
      <div className="app-Welcome">
        <Welcome />
      </div>
    </div>
  )
}

export default App;
