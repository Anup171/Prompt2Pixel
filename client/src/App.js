import styled,{ThemeProvider} from 'styled-components';
import {darkTheme} from './utils/theme';
import Home from './pages/home';
import CreatePost from './pages/createimage';
import NavBar from './components/navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
const Container=styled.div`
  width:100%;
  height:100%;
  display:flex;
  background-color:${({theme})=>theme.bg};
  color:${({theme})=>theme.text_primary};
  overflow-x:hidden;
  overflow-y:hidden;
  transition:all 0.25s ease;
`;
const Wrapper=styled.div`
  height:100%;
  position:relative;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  flex:3;
  `;

function App() {
  return (<ThemeProvider theme={darkTheme}>
    <Container>
      <Wrapper>
        <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/post' element={<CreatePost/>}/>
        </Routes>
        </BrowserRouter>
      </Wrapper>
    </Container>
  </ThemeProvider>);
}

export default App;

