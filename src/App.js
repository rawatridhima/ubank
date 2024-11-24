
import { Toaster } from "react-hot-toast";
import Login from "./components/Authentication/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
       <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path='/dash' element={<Dashboard/>}/>
      </Routes>
      <Toaster position="top-right"/>
    </div>
  );
}

export default App;
