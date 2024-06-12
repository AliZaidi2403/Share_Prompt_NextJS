"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@/components/Form";

const EditPage = () => {
  const searchParams = useSearchParams();
  const promptID = searchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const router = useRouter();

  useEffect(() => {
    const getPropmtDetails = async () => {
      const response = await fetch(`/api/prompt/${promptID}`);
      const data = await response.json();
      setPost({ prompt: data.prompt, tag: data.tag });
    };
    if (promptID) {
      getPropmtDetails();
    }
  }, [promptID]);
  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`api/prompt/${promptID}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};
const UpdatePage = () => {
  <Suspense>
    <EditPage />
  </Suspense>;
};
export default UpdatePage;
