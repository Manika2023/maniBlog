import React from "react";

export default function DeleteConfirm({ postId, onDeleteConfirmed, onCancel }) {
  
  const handleDeletePost = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/blog/delete_post_author/${postId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        onDeleteConfirmed("Post deleted successfully!", "success");
      } else {
        onDeleteConfirmed("Failed to delete post.", "error");
      }
    } catch (err) {
      console.error("Error deleting post:", err);
      onDeleteConfirmed("Something went wrong.", "error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-gray-800 mb-4">Are you sure you want to delete this post?</h2>
        <div className="flex justify-end gap-4">
          <button
            onClick={handleDeletePost}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
