import { createBrowserRouter } from "react-router-dom";
import Blog from "../pages/Blog.page";
import BlogPost from "../pages/BlogPost.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Blog />,
  },
  {
    path: "/blogs/:id",
    element: <BlogPost />,
  },
]);

export default router;
