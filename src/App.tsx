import { Routes, Route, Navigate, Router} from 'react-router-dom';

import './App.css'
import LoginPage from './pages/LoginPage';

function App() {


  return (
  
    <div>
     <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route path='/todos' element={<TodosPage/>}/>
        {/* <Route path="/todos/:id" element={<TodoDetailsPage />} /> */}
      </Routes>
    </Router>
    </div>
  )
}

export default App
