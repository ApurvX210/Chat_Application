import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Chat from './Pages/Chat';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/chat' element={<Chat/>}/>
      </Routes>
    </div>
  );
}

export default App;
