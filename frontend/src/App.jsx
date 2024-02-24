import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard  } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";

import toast, { Toaster } from "react-hot-toast";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup toast={toast}/>}></Route>
          <Route path="/signin" element={<Signin toast={toast}/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route> */
          <Route path="/send" element={<SendMoney toast={toast}/>}></Route>
        </Routes>
        <Toaster/>
      </BrowserRouter>

    </div>
  )
}

export default App
