// import { Routes, Route, BrowserRouter } from "react-router-dom"
// import SearchJobPage from "@/pages/SearchJobPage.jsx"
// import './App.css'
// import Signup from "./components/Signup"
// import Login from "./components/Login"
// import NoPage from "./components/NoPage"

// function App() {
//   return (
//     <div className="w-full">
//       <BrowserRouter  basename="/">
//         <Routes>
//           <Route path = '*' element = {<NoPage/>} />
//           <Route path='/'  element={<SearchJobPage />} />
//           <Route path = '/auth/register' element = {<Signup/>} />
//           <Route path = '/auth/login' element = {<Login/>} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   )
// }

// export default App

import { Routes, Route, BrowserRouter } from "react-router-dom";
import SearchJobPage from "@/pages/SearchJobPage.jsx";
import './App.css';
import Signup from "./components/Signup";
import Login from "./components/Login";
import NoPage from "./components/NoPage";
import ProtectedRoute from "./protectedRoute/ProtectedRoute"; // Import the ProtectedRoute component

function App() {
  console.log('App rendered.');  // Debug: Log when App renders

  return (
    <div className="w-full">
      <BrowserRouter basename="/">
        <Routes>
          <Route path="*" element={<NoPage />} />

          {/* Protected route for the SearchJobPage */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SearchJobPage />
              </ProtectedRoute>
            }
          />

          <Route path="/auth/register" element={<Signup />} />
          <Route path="/auth/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

