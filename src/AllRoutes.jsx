import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Watch from "./Pages/Watch"


const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/watch/:id" element={<Watch />} />
    </Routes>
  )
}

export default AllRoutes
