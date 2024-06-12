"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Profile from "@/components/Profile";

function UserProfilePage({ params }) {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const router = useRouter();
  const userId = params.id;
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (userId) {
      fetchPosts();
    }
  }, [userId]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName} personalized profile page`}
      data={posts}
    />
  );
}

export default UserProfilePage;
