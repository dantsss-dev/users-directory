import UserPostsPage from "../page/UserPostsPage";
import UsersPage from "../page/UsersPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={UsersPage} />
        <Route path="/user/:userId/posts" Component={UserPostsPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
