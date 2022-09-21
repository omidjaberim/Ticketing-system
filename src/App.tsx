import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Detail from "./pages/detail";
import TicketList from './pages/ticket-list';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { prefixer } from 'stylis';

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: "IRANSans"
  },
});
// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});
function RTL(props:any) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}
function App() {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TicketList/>} />
            <Route path="details/:id" element={<Detail />}  />
          </Routes>
          
        </BrowserRouter>
        </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
