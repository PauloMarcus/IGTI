import { Button } from '@material-ui/core';
import Calendar from './views/Calendar';
import { Route, Routes, Navigate } from 'react-router-dom';
import getToday from './components/getToday';
import { redirect } from 'react-router-dom';



function App() {

  const today = getToday().substring(0, 7)
  return (
  <> 
      <Routes>
        <Route path='/calendar/:month' element={ <Calendar />}/>
        <Route element={<Navigate to={`/calendar/${today}`} />}/>
        
      </Routes>
   
  
  </>
  );
}

export default App;
