import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SignInPage, RegistrationPage } from './pages';
import { StyledAppContainer } from './App.styles'

function App() {
  return (
    <>
      <StyledAppContainer>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="register" element={<RegistrationPage />} />
        </Routes>
      </StyledAppContainer>
      <ToastContainer />
    </>
  );
}

export default App;
