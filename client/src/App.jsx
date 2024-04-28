import Header from "./Header";
import Post from "./Post";
import "./App.css";
import { Container } from "react-bootstrap";
import {
  Routes,
  Route,
  Outlet,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";

function App() {
  const Layout = () => {
    return (
      <main>
        <Header />
        <Outlet />
      </main>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <IndexPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/create",
          element: <CreatePost />,
        },
        {
          path: "/post/:id",
          element: <PostPage />,
        },
        {
          path: "/edit/:id",
          element: <EditPost />,
        },
      ],
    },
  ]);
  return (
    <Container>
      <UserContextProvider>
        <RouterProvider router={router} />;
      </UserContextProvider>
    </Container>
  );
}

export default App;
