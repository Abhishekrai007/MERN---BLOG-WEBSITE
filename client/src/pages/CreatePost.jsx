import React, { useState } from "react";

import { Navigate } from "react-router-dom";

import Editor from "../Editor";

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const createNewPost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("summary", summary);
    data.set("content", content);

    data.set("title", title);
    data.set("file", files[0]);
    console.log(files);

    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,

      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
    console.log(await response.json());
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <form onSubmit={createNewPost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input type="file" onChange={(e) => setFiles(e.target.files)} />
      <Editor onChange={setContent} value={content} />
      <button style={{ marginTop: "5px" }}>Create Post</button>
    </form>
  );
};

export default CreatePost;
