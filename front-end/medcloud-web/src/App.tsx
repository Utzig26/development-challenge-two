
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import theme from './components/theme'
import Header from './components/Header'
import { PatientList } from './components/PatientsList';
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <PatientList />
      </ThemeProvider>
    </>
  );
}

export default App
