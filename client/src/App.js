import { BrowserRouter,Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import './App.css';
import Detail from './components/Detail';
import RecipeForm from './components/RecipeForm';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route path='/' element={<LandingPage/>}></Route>
        <Route path= '/home' element={<Home />}></Route>
        <Route path={`/recipes/:id`} element={<Detail />}></Route>
        <Route path='/recipe' element={<RecipeForm />}></Route>
      </Routes>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
