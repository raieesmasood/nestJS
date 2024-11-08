import { HashRouter, Routes, Route } from "react-router-dom"
import SearchJobPage from "@/pages/SearchJobPage.jsx"
import './App.css'

function App() {
  return (
    <div className="w-full">
      <HashRouter  basename="/">
        <Routes>
          <Route path='/'  element={<SearchJobPage />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
