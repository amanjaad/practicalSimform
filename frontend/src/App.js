import Login from "./components/Login";
import UserDetails from "./components/UserDetails";
import AccountProvider from "./context/AccountProvider";
//import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import SignUp from "./components/SignUp";
import EditUser from "./components/EditUser";

function App() {
  return (
    <AccountProvider>
    <Router>
      <Routes>
        <Route exact path="/" element={< Login />}></Route>
        <Route exact path="/signup" element={< SignUp />}></Route>
        <Route exact path="/userdetails" element={< UserDetails />}></Route>
        <Route exact path="/editUser" element={< EditUser />}></Route>
      </Routes>
    </Router>
    </AccountProvider>
  );
}

export default App;