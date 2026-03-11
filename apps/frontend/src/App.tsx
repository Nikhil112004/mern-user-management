import { Routes, Route } from "react-router-dom";
import UserList from "./pages/UserList";
import AddUser from "./pages/AddUser";
import Viewuser from "./pages/ViewUser";
import EditUser from "./pages/EditUser";




function App() {
  return (
    <Routes> 
      <Route path="/" element={<UserList />} />
      <Route path="/add-user" element={<AddUser />} />
      <Route path="/edit-user/:id" element={<EditUser />} />
      <Route path="/view-user/:id" element={<Viewuser />} />
    </Routes>
  )
}

export default App
