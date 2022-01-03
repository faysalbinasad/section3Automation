import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { RequireAuth, NavigationBar } from 'shared/components';

import {
  SignInPage, RegistrationPage, UserProductListPage, AccountSettingsPage, AddProductPage,
} from './pages';
import { StyledAppContainer } from './App.styles';

function App() {
  const { pathname } = useLocation();
  return (
    <>
      {
        !['/', '/signin', '/registration'].includes(pathname) &&
        <NavigationBar />
      }
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
            }
          />
          <Route
            path="add-product"
            element={
              <RequireAuth >
                <AddProductPage />
              </RequireAuth>
            }
          />
          <Route
            path="account-settings"
            element={
              <RequireAuth >
                <AccountSettingsPage />
              </RequireAuth>
            }
          />

        </Routes>
      </StyledAppContainer>
      <ToastContainer />
    </>
  );
}

export default App;
