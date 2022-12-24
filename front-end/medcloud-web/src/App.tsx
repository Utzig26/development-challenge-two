
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import theme from './components/theme'
import Home from './pages/Home'
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </>
  );
}

export default App
