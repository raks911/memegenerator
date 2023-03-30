import './App.css';
import {Meme} from './components/meme'
import {Route, Routes } from 'react-router-dom';
import { MemeGenerated } from './MemeGenerated/MemeGenerated';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Meme/>}></Route>
      <Route path='/generated' element={<MemeGenerated />}>
      </Route>
    </Routes>
  );
}

export default App;
