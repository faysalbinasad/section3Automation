import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { RequireAuth, PreSignIn } from 'shared/components';
import { NOT_LOGGED_IN_STATUS } from 'slices/currentUser';

import { SignInPage, RegistrationPage, UserProductListPage } from './pages';
import { StyledAppContainer } from './App.styles'

function App() {
  const { pathname } = useLocation();

  return (
    <>
      <StyledAppContainer isPreLogin={['/signin', '/registration', '/'].includes(pathname)}>
        <Routes>
          <Route
            path="/"
            element={
              // <PreSignIn>
                <SignInPage />
              // </PreSignIn>
            }
          />
          <Route
            path="signin"
            element={
              // <PreSignIn>
                <SignInPage />
              // </PreSignIn>
            }
          />
          <Route
            path="register"
            element={
              // PreSignIn doesnt work
              // <PreSignIn>
                <RegistrationPage />
              // </PreSignIn>
            }
          />
          <Route
            path="my-products"
            element={
              <RequireAuth >
                <UserProductListPage />
              </RequireAuth>
            } />

        </Routes>
      </StyledAppContainer>
      <ToastContainer />
    </>
  );
}

export default App;
