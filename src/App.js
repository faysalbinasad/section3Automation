import { Routes, Route, Link } from "react-router-dom";

import { SignInPage } from './pages';
import { StyledAppContainer } from './App.styles'

function App() {
  return (
    <StyledAppContainer>
      <Routes>
        <Route path="/" element={<SignInPage />}>
          <Route path="signin" element={<SignInPage />} />
        </Route>
      </Routes>
    </StyledAppContainer>
  );
}

export default App;
