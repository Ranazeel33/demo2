import './App.css';
import HomePage from './Pages/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import theme from './Pages/home/theme/typography'
import { ThemeProvider } from '@emotion/react';
import typography from './Pages/home/theme/typography';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
