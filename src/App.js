import React from 'react';
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import SingIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Header from './components/Header/Header';
import { ContextProvider } from './components/ContextApi/context';

const App = () => {
  const token=localStorage.getItem("token");
  return (
    <BrowserRouter>
    <ContextProvider>
    <Routes>
      <Route path='/' element={<SingIn/>}/>
      <Route path='/register' element={<SignUp/>}/>
      <Route path='/contacts' element={
        token ? (<Header/>) : (<Navigate replace to={'/'} /> )} />
        <Route path='*' element={<h1>404, PAGE NOT FOUND!!!</h1>}/>
    </Routes>
    </ContextProvider>
    </BrowserRouter>
  )
}

export default App