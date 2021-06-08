import './App.css';
import { Route } from 'react-router-dom';
import ShowUsers from './components/app/ShowUsers'

function App() {
  return (
    <div className="App">
      <p>App running</p>
      <ShowUsers />
    </div>
  );
}

export default App;
