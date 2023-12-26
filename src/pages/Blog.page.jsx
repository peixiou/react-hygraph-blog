import { useState, useEffect } from "react";
import PostCard from "../components/PostCard.component";
import { GraphQLClient, gql } from "graphql-request";

const Blog = () => {
  const [blogs, setBlogs] = useState();

  useEffect(() => {
    const fetchBlogPost = async () => {
      const graphcms = new GraphQLClient(
        process.env.REACT_APP_CONTENT_ENDPOINT
      );

      const QUERY = gql`
        {
          posts {
            id
            title
            description
          }
        }
      `;

      const resp = await graphcms.request(QUERY);
      setBlogs(resp.posts);
    };

    fetchBlogPost();
  }, []);

  return (
    <div className="p-4 min-h-screen bg-[#f5f5f5]">
      <h1 className="mb-8 text-3xl md:text-4xl lg:text-5xl font-bold text-center">
        部落格
      </h1>
      <div className="grid  gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {blogs?.map((content) => {
          return <PostCard key={content.id} content={content} />;
        })}
      </div>
    </div>
  );
};

export default Blog;
