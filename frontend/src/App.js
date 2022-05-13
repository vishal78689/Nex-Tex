
import { Route } from 'react-router-dom';
import './App.css';
import Chat from './Pages/Chat';
import Home from './Pages/Home';

function App() {
  return (
    <div className="App">
     <Route exact path='/' component={Home}/>
     <Route path='/chats' component={Chat}/>
    </div>
  );
}

export default App;
