import './App.css';
import {Meme} from './components/meme'
import {Route, Routes } from 'react-router-dom';
import { MemeGenerated } from './MemeGenerated/MemeGenerated';
function App() {
  return (
    <>
    <h1>
      MEME GENERATOR
    </h1>
    <Routes>
      <Route path='/' element={<Meme/>}></Route>
      <Route path='/generated' element={<MemeGenerated />}>
      </Route>
    </Routes>
    </>
  );
}

export default App;
