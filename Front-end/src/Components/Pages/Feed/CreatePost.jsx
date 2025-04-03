import { useState } from "react";
import axios from "axios";
import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";

const CreatePost = () => {
  const [postType, setPostType] = useState("Post");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [question, setQuestion] = useState("");
  const [image, setImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false); 

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (postType === "Post") {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", image);

        response = await axios.post("/api/feed/create-post", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await axios.post("/api/feed/create-question", { question });
      }

      if (response.status === 200) {
        setTitle("");
        setDescription("");
        setImage(null);
        setQuestion("");

        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error submitting post/question:", error);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            className="hover:bg-dark-card hover:text-gray-100"
            variant="outline"
            onClick={() => setIsOpen(true)} // Open dialog on button click
          >
            Create
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] dark:bg-dark-card bg-dark-background border-0 text-gray-100 rounded-lg shadow-lg p-6 transition duration-500">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-semibold mb-4">
              Create {postType === "Post" ? "Post" : "Question"}
            </DialogTitle>
          </DialogHeader>

          <div className="flex justify-center gap-4 mb-6">
            <Button
              variant={postType === "Post" ? "solid" : "outline"}
              onClick={() => setPostType("Post")}
              className={`w-1/2 py-2 rounded-lg hover:bg-blue-800 ${
                postType === "Post" ? "bg-blue-600 text-white" : "bg-transparent"
              }`}
            >
              Post
            </Button>
            <Button
              variant={postType === "Question" ? "solid" : "outline"}
              onClick={() => setPostType("Question")}
              className={`w-1/2 py-2 rounded-lg hover:bg-blue-800 ${
                postType === "Question" ? "bg-blue-600 text-white" : "bg-transparent"
              }`}
            >
              Question
            </Button>
          </div>

          <form onSubmit={handleSubmit}>
            {postType === "Post" && (
              <>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium mb-2">
                    Title
                  </label>
                  <input
                    id="title"
                    placeholder="Enter title"
                    className="w-full p-3 rounded-lg border bg-dark-background dark:border-gray-700 border-gray-300 focus:ring-blue-600 focus:border-blue-600"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    placeholder="Enter description"
                    className="w-full p-3 rounded-lg border bg-dark-background dark:border-gray-700 border-gray-300 focus:ring-blue-600 focus:border-blue-600"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-4 hover:cursor-pointer">
                  <label htmlFor="image" className="block text-sm font-medium mb-2">
                    Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    className="w-full p-3 rounded-lg border bg-dark-background dark:border-gray-700 border-gray-300 focus:ring-blue-600 focus:border-blue-600 hover:cursor-pointer"
                    onChange={handleImageChange}
                  />
                </div>
              </>
            )}

            {postType === "Question" && (
              <div className="mb-4">
                <label htmlFor="question" className="block text-sm font-medium mb-2">
                  Question
                </label>
                <input
                  id="question"
                  placeholder="Enter your question"
                  className="w-full p-3 rounded-lg border bg-dark-background dark:border-gray-700 border-gray-300 focus:ring-blue-600 focus:border-blue-600"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
            )}

            <DialogFooter>
              <Button
                type="submit"
                className="w-full py-3 mt-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
              >
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreatePost;
