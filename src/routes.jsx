import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import Contact from "./pages/Contact";
import AddContact from "./pages/AddContact";
import Layout from "./pages/Layout";
import EditContact from "./pages/EditContact";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
      <Route path= "/" element={<Contact />} />
      <Route path="/addcontact" element={ <AddContact />} />
      <Route path="/editcontact/:id" element={<EditContact />} />
    </Route>
  )
);