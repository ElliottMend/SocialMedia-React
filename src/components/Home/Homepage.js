import React from "react";
import Post from "../Posts/Post";
import { FollowsContainer } from "./FollowsContainer";
export default function Homepage(props) {
  return (
    <div className="text-navy">
      <div className="container mx-auto">
        {localStorage.getItem("accessToken") && (
          <div className="shadow-xl my-2 border-black border-2">
            <form
              className="flex rounded-lg items-center  mt-3 flex-col"
              onSubmit={props.newPost}
            >
              <label className="my-6 text-xl" htmlFor="body">
                Create Post
              </label>
              <input
                value={props.data.body}
                className="text-2xl w-2/3 bg-gray-300 rounded-lg mb-10"
                id="body"
                size="75"
                onChange={props.handleChange}
              ></input>
              <button className="bg-seafoam text-xl my-4 px-12 py-6">
                Submit
              </button>
            </form>
            <div className="rounded-b-lg text-xl bg-lime ">
              <p className="text-2xl font-semibold">Sort Posts</p>
              <select
                className="rounded-full p-3 m-4"
                onChange={props.changeRadius}
              >
                <option value="Local">Local</option>
                <option value="Global">Global</option>
              </select>
              <select
                className="rounded-full p-3 m-4"
                onChange={props.postSort}
              >
                <option value="recent">Recent</option>
                <option value="liked">Liked</option>
              </select>
            </div>
            <div className="rounded-lg flex flex-col md:flex-row-reverse items-start mt-3">
              <div className="w-full">
                {props.data.posts &&
                  props.data.posts.map((e) => <Post key={e._id} data={e} />)}
              </div>
              <div className="mt-1 inset-x-0  top-0 left-0 rounded-lg md:sticky ml-2 ">
                {props.data.follow.length > 0 && (
                  <p className="text-2xl font-semibold">Who to Follow</p>
                )}
                {props.data.follow &&
                  props.data.follow.map((e) => (
                    <FollowsContainer key={e.username} data={e} />
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
