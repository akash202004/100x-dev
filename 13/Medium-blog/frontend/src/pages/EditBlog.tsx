import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Blog {
  title?: string;
  content?: string;
}

export const EditBlog = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false); 
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  const handleSave = () => {
    const updatedFields: Blog = {};

    if (title) updatedFields.title = title;
    if (content) updatedFields.content = content;

    if (Object.keys(updatedFields).length === 0) {
      console.log("No fields to update");
      return;
    }

    setSaving(true); 
    axios
      .patch(`${apiUrl}/api/v1/blog/${id}`, updatedFields, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setSaving(false); 
        navigate("/own-blog");
      })
      .catch((error) => {
        setSaving(false); 
        console.log(
          "Error updating the blog post",
          error.response?.data?.message
        );
      });
  };

  const handleCancel = () => {
    navigate("/own-blog");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 border rounded bg-white shadow">
      <div>
        <h1 className="text-3xl font-bold mb-6 text-center">Edit Blog</h1>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="content"
          >
            Content
          </label>
          <textarea
            id="content"
            className="w-full h-40 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter blog content"
          ></textarea>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleSave}
            className={`${
              saving
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-2 px-6 rounded shadow-lg transition duration-300`}
            disabled={saving} // Disable button during saving
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded shadow-lg transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
