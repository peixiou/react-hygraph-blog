import { useEffect, useState } from "react";
import { GraphQLClient, gql } from "graphql-request";
import { astToHtmlString } from "@graphcms/rich-text-html-renderer";
import { useParams } from "react-router-dom";

const Blog = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [content, setContent] = useState();

  const bodyClasses = "text-lg text-gray-700";

  const renderers = {
    h1: ({ children }) =>
      `<h1 class="mb-4 text-5xl text-gray-900 ">${children}</h1>`,
    h2: ({ children }) =>
      `<h2 class="mb-4 text-4xl text-gray-900">${children}</h2>`,
    h3: ({ children }) => `<h3 class="text-3xl">${children}</h3>`,
    h4: ({ children }) => `<h4 class="text-2xl">${children}</h4>`,
    h5: ({ children }) => `<h5 class="text-xl">${children}</h5>`,
    h6: ({ children }) => `<h6 class="text-large">${children}</h6>`,
    p: ({ children }) =>
      `<p class="my-4 text-lg ${bodyClasses}">${children}</p>`,
    a: ({ children, href }) =>
      `<a class="my-4 text-lg underline italic ${bodyClasses}" href="${href}" target="_blank">${children}</a>`,
    ul: ({ children }) =>
      `<ul class="list-disc list-inside my-4 text-lg ${bodyClasses}">${children}</ul>`,
    ol: ({ children }) =>
      `<ol class="list-decimal list-inside my-4 text-lg ${bodyClasses}">${children}</ol>`,
    li: ({ children }) =>
      `<li class="my-2 text-lg ${bodyClasses}">${children}</li>`,
    code: ({ children }) =>
      `<code class="bg-gray-100 dark:bg-gray-800 rounded-md p-2 text-sm">${children}</code>`,
    code_block: ({ children }) =>
      `<pre class="bg-gray-100 dark:bg-gray-800 overflow-y-scroll rounded-md p-2 text-sm">${children}</pre>`,
  };

  async function addContent(post) {
    const content = post?.content?.raw?.children;

    console.log(content);

    const rendered = await astToHtmlString({ content: content, renderers });
    setContent(rendered);
  }

  useEffect(() => {
    const fetchBlogPost = async () => {
      const graphcms = new GraphQLClient(
        process.env.REACT_APP_CONTENT_ENDPOINT
      );

      const QUERY = gql`
        {
          posts(where: { id: ${JSON.stringify(id)} }) {
            id
            title
            content {
              raw
            }
          }
        }
      `;

      const resp = await graphcms.request(QUERY);

      setPost(resp?.posts[0]);
      addContent(resp?.posts[0]);
    };

    fetchBlogPost();
  }, []);

  return (
    <div className="p-4 min-h-screen bg-[#f5f5f5]">
      <h1 className="mb-8 text-3xl md:text-4xl lg:text-5xl font-bold text-center">
        {post?.title}
      </h1>
      <div className="mt-8" dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
};

export default Blog;
