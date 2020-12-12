import React from "react";
import PostContainer from "../Posts/PostContainer";
import { FollowsContainer } from "./FollowsContainer";
export default function Homepage(props) {
  return (
    <div className="text-navy">
      <div className="container mx-auto">
        <section className="shadow-xl my-2 border-black">
          <form
            className="flex rounded-lg items-center flex-col"
            onSubmit={props.newPost}
          >
            <label className="my-6 text-xl" htmlFor="body">
              Create Post
            </label>
            <input
              className="text-2xl px-3 w-2/3 bg-gray-300 rounded-lg mb-10"
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
            <select className="rounded-full p-3 m-4" onChange={props.postSort}>
              <option value="recent">Recent</option>
              <option value="liked">Liked</option>
            </select>
          </div>
        </section>
        <div className="w-full">
          {props.data.posts &&
            props.data.posts.map((e) => (
              <PostContainer more={props.more} key={e._id} data={e} />
            ))}
        </div>
        <div className="mt-1 inset-x-0 top-0 left-0 rounded-lg md:sticky ml-2 ">
          <p className="text-2xl font-semibold">Who to Follow</p>
          {props.data.follow.map((e) => (
            <FollowsContainer key={e.username} data={e} />
          ))}
        </div>
      </div>
    </div>
  );
}
