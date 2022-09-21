import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Detail from "./pages/detail";
import TicketList from './pages/ticket-list';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TicketList/>} />
        <Route path="details/:id" element={<Detail />}  />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
