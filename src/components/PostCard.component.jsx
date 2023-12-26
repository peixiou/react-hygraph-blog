import React from "react";
import BackGroundImage from "./bg.jpg";
import { Link } from "react-router-dom";

const PostCard = ({ content }) => {
  return (
    <>
      <div className="flex flex-col bg-white p-4 h-[500px] rounded-xl shadow-xl shadow-slate-200">
        <div className="h-1/2 rounded-xl overflow-hidden mb-4">
          <img
            src={BackGroundImage}
            className="h-full w-full object-cover"
            alt="gradient background"
          />
        </div>
        <div className="h-1/2 flex flex-col justify-between">
          <div className="mb-2">
            <h1 className="text-2xl capitalize font-serif mb-4">
              {content?.title}
            </h1>
            <p className="text-sm font-light text-gray-600 lowercase">
              {content?.description}
            </p>
          </div>
          <Link to={`/blogs/${content?.id}`}>
            <button className="border border-2 border-black/70 px-3 py-1 rounded-2xl">
              閱讀更多
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PostCard;
