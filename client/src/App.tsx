import { Routes, Route } from 'react-router-dom';
import {Index} from './pages/Index'
import './App.css';
import { SiteNavBar } from './components/ui/SiteNavBar';

function App() {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<SiteNavBar />} >
      <Route index element={<Index />} />
      {/* <Route path='/movies/update/:movieId' element={<Update />} /> */}
      {/* <Route path='/movies/add' element={<Add />} /> */}
      </Route>
    </Routes>
    </>
  )
}

export default App
