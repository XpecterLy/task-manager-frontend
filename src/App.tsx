import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/login';
import { Home } from './pages/home';
import { Task } from './pages/task';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/task' element={<Task/>} />
      </Routes>
    </>
  )
}

export default App
