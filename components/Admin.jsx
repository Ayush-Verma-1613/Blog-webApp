'use client';
import React, { useEffect, useState, useRef} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import { message } from "antd";

const Admin = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageType, setImageType] = useState("file"); // "file" or "url"
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [preview, setPreview] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

 
  // Convert file to Base64
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const fileInputRef = useRef(null);
  const router = useRouter();
  
  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // Handle URL input change
  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
    setPreview(e.target.value);
  };

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const res = await axios.get("/api/blog");
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Submit blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageData = "";

      if (imageType === "file" && imageFile) {
        imageData = await getBase64(imageFile);
      } else if (imageType === "url") {
        imageData = imageUrl;
      }

      const payload = {
        title,
        description,
        image: imageData,
      };

      if (isEditing) {
        // 🔥 UPDATE
        await axios.put(`/api/blog/${editId}`, payload);
        message.success("Blog updated successfully!");
      } else {
        // 🔥 CREATE
        await axios.post("/api/blog", payload);
        message.success("Blog created successfully!");
      }

      // Reset
      fetchBlogs();
      resetForm();
    } catch (err) {
      console.error(err);
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Delete blog
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;

    try {
      await axios.delete(`/api/blog/${id}`);
      message.success("Blog deleted successfully!");
      fetchBlogs();
    } catch (err) {
      console.error(err);
      message.error("Error deleting blog");
    }
  };

  const handleEdit = (blog) => {
    setIsEditing(true);
    setEditId(blog._id);

    setTitle(blog.title);
    setDescription(blog.description);

    if (blog.image?.startsWith("data:") || blog.image?.startsWith("http")) {
      setImageType("url");
      setImageUrl(blog.image);
      setPreview(blog.image);
    } else {
      setImageType("file");
      setPreview("");
    }

    // Scroll to top on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImageFile(null);
    setImageUrl("");
    setPreview("");
    setIsEditing(false);
    setEditId(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-4 md:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 px-4 pb-4">

      {/* LEFT: FORM */}
      <div className="border p-4 md:p-6 rounded-lg bg-white shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <h2 className="text-lg md:text-xl font-semibold">
            {isEditing ? "Edit Blog" : "Create Blog"}
          </h2>

          {/* IMAGE PREVIEW */}
          <div className="flex items-center justify-center w-full sm:w-64 h-48 sm:h-64 bg-gray-100 rounded-lg mx-auto overflow-hidden">
            {preview ? (
              <img
                src={preview}
                className="w-full h-full object-contain rounded-lg"
                alt="Preview"
              />
            ) : (
              <p className="text-gray-400 text-sm">Image Preview</p>
            )}
          </div>

          <input
            type="text"
            placeholder="Title"
            className="w-full border p-2 md:p-3 rounded text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            className="w-full border p-2 md:p-3 rounded text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="8"
            required
          />

          {/* IMAGE TYPE */}
          <div className="flex gap-4 text-sm md:text-base">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={imageType === "file"}
                onChange={() => setImageType("file")}
                className="cursor-pointer"
              />
              Upload File
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={imageType === "url"}
                onChange={() => setImageType("url")}
                className="cursor-pointer"
              />
              Image URL
            </label>
          </div>

          {imageType === "file" && (
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm md:text-base file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          )}

          {imageType === "url" && (
            <input
              type="text"
              placeholder="Paste image URL"
              className="w-full border p-2 md:p-3 rounded text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={imageUrl}
              onChange={handleUrlChange}
            />
          )}

          <div className="flex gap-2 md:gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-black text-white px-4 py-2 md:py-3 rounded text-sm md:text-base font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            >
              {loading
                ? "Saving..."
                : isEditing
                ? "Update Blog"
                : "Create Blog"}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 md:py-3 border border-gray-300 rounded text-sm md:text-base font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* RIGHT: BLOG LIST */}
      <div className="border rounded-lg bg-white shadow-sm h-[650px] md:h-[700px] flex flex-col">
        <h2 className="text-lg md:text-xl font-semibold p-4 md:p-6 pb-3 flex-shrink-0">
          Live Blogs
        </h2>

        {blogs.length === 0 ? (
          <p className="text-gray-400 text-center py-8 text-sm">No blogs found</p>
        ) : (
          <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-4">
            <div className="space-y-3 md:space-y-4">
              {blogs.map((blog) => (
                <div key={blog._id} className="flex gap-3 md:gap-4 border p-3 rounded hover:shadow-md transition">

                  {(blog.image || blog.imageUrl) ? (
                    <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                      <img
                        src={blog.image || blog.imageUrl}
                        className="w-full h-full object-contain"
                        alt={blog.title}
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                      No Image
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm md:text-base line-clamp-1">
                      {blog.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 line-clamp-2 mt-1">
                      {blog.description}
                    </p>

                    <div className="flex gap-3 md:gap-4 mt-2 text-xs md:text-sm">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="flex items-center gap-1 text-blue-500 hover:text-blue-700 transition"
                      >
                        <Pencil size={14} className="md:w-4 md:h-4" /> Edit
                      </button>

                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="flex items-center gap-1 text-red-500 hover:text-red-700 transition"
                      >
                        <Trash2 size={14} className="md:w-4 md:h-4" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default Admin;