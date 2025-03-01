"use client";

import type React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TagInput } from "@/comp/dashboard/assets/tags-input";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function UploadPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [downloadlink, setDownloadlink] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const router = useRouter();
  const { data: session } = useSession();

  const MAX_IMAGES = 4;

  useEffect(() => {
    // Fetch categories from the server
    const fetchCategories = async () => {
      const response = await fetch("/api/assets/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    };
    fetchCategories();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (newFiles.length + files.length > MAX_IMAGES) {
        setError(`You can upload a maximum of ${MAX_IMAGES} images.`);
        return;
      }
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setFiles([...files, ...newFiles]);
      setPreviews([...previews, ...newPreviews]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    router.push("/graphic");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;

    if (files.length < 1) {
      setError("Please upload at least one image.");
      return;
    }

    if (!category) {
      setError("Please select a category.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("downloadlink", downloadlink);
    formData.append("description", description);
    formData.append("category", category);
    files.forEach((file) => formData.append("files", file));
    formData.append("tags", JSON.stringify(tags));

    const response = await fetch("/api/assets/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const asset = await response.json();
      console.log("Uploaded asset:", asset);
      router.push("/graphic");
    } else {
      console.error("Upload failed:", await response.text());
      setError("Upload failed. Please try again.");
    }

    setLoading(false);
  };

  if (!session) {
    return <div>Please sign in to upload assets.</div>;
  }

  return (
    <div className="mx-auto my-40 max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-semibold">
        Upload New Assets
      </h1>
      <form onSubmit={handleSubmit} className="mx-auto max-w-md">
        <div className="mb-4">
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Asset Title*"
            required
          />
        </div>

        <div className="mb-4">
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Asset Description"
          />
        </div>
        <div className="mb-4">
          <Input
            type="text"
            value={downloadlink}
            onChange={(e) => setDownloadlink(e.target.value)}
            placeholder="Download Link*"
            required
          />
        </div>
        <div className="mb-4">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <TagInput onTagsChange={setTags} initialTags={tags} />
        </div>
        <div className="mb-4">
          <Input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            multiple
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative h-24 w-24">
              <Image
                src={preview || "/placeholder.svg"}
                alt={`Preview ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
              />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        {error && <div className="text-ali mb-4">{error}</div>}
        <div className="flex gap-2">
          <Button type="button" onClick={handleCancel} variant="outline">
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload Assets"}
          </Button>
        </div>
      </form>
    </div>
  );
}
