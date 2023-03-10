import React from "react";
import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";

import { Header } from "./components";
import {
  Home,
  FullPost,
  Registration,
  AddPost,
  Login,
  TagPosts,
} from "./pages";
import { useDispatch } from "react-redux";
import { fetchUser } from "./redux/auth/slice";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (window.localStorage.getItem("token")) {
      dispatch(fetchUser());
    }
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/post-create" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/tags/:slug" element={<TagPosts />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
