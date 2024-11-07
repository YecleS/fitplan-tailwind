import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import HeaderSection from './component/sections/Header';
import HomePage from './component/pages/Home';
import LoginPage from './component/pages/Login';
import SignUpPage from './component/pages/SignUp';
import CatalogPage from './component/pages/Catalog';
import UtilContext from './component/utils/UtilContext';
import ExerciseDetails from './component/pages/ExerciseDetails';
import Routine from './component/pages/Routine';
import ScrollToTop from './component/utils/ScrollToTop';

function App() {

  return (
    <UtilContext>
      <div className="App">
        <Router>
          <ScrollToTop />
          <header className='fixed w-full top-0 z-[999]'>
            <HeaderSection />
          </header>
          <main>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/catalog' element={<CatalogPage />} />
              <Route path='/signup' element={<SignUpPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/exercise-details/:id/:name' element={<ExerciseDetails />} />
              <Route path='/routine' element={<Routine />} />
            </Routes>
          </main>
        </Router>
      </div>
      <Toaster richColors />
    </UtilContext>
  );
}

export default App;
