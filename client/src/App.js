import styled, { ThemeProvider } from 'styled-components';
import { darkTheme } from './utils/theme';
import Home from './pages/home';
import CreatePost from './pages/createimage';
import NavBar from './components/navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
`;

const Wrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
`;

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <BrowserRouter>
          <NavBar />
          <Wrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post" element={<CreatePost />} />
            </Routes>
          </Wrapper>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;

