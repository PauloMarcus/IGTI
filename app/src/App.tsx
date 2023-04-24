import { Button } from '@material-ui/core';
import Calendar from './views/Calendar';
import { Route, Routes, Navigate } from 'react-router-dom';
import getToday from './components/getToday';
import { redirect } from 'react-router-dom';
import React from 'react';
import { IUser, getUserEndpoint } from './backend';
import Login from './views/Login';



function App() {

  const [isAuth, setIsAuth] = React.useState<IUser | null>(null)

  React.useEffect(() => {
    getUserEndpoint().then((x) => setIsAuth(x), () => setIsAuth(null))
    if(isAuth){
      localStorage.setItem('user', isAuth.name)
      localStorage.setItem('email', isAuth.email)
    }
  }, [])

  const today = getToday().substring(0, 7)
  if (isAuth) {
    return (
      <>
        <Routes>
          <Route path='/calendar/:month' element={<Calendar />} />
          <Route path='*' element={<Navigate to={`/calendar/${today}`} />} />
        </Routes>
      </>
    )
  }
  else { 
    return (
      <>
        <Login user={(x) => setIsAuth(x)}/>
      </>
    );
  }
}

export default App;
