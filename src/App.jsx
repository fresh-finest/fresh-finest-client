

import { BrowserRouter, Routes, Route } from "react-router-dom"
// import Home from "./pages/Home"
import Login from "./pages/Auth/Login/Login"

function App() {
  

  return<BrowserRouter>
  <Routes>
    <Route path='/' element={<Login/>} />
    {/* <Route path='/sign-in' element={<SignIn/>} />
    <Route path='/sign-up' element={<SignUp/>} />
    <Route path='/about' element={<About/>} />
    <Route path='/search' element={<Search/>} />
    
    <Route path='/listing/:listingId' element={<Listing/>} />
    <Route element={< PrivateRoute/>} >
    <Route path='/profile' element={<Profile/>} />
    <Route path='/create-listing' element={<CreateListing />} />
    <Route path='/update-listing/:listingId' element={<UpdateListing />} />
    </Route> */}
  </Routes>
  </BrowserRouter>
}

export default App
