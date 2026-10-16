import type { Metadata } from "next";
import { getMediaUrl, getPublishedPosts } from "@/lib/data";
import { PostArchive } from "@/components/PostArchive";

export const metadata: Metadata = { title: "All Posts", description: "Search and explore all published picture and video posts from GraphicsGraphy." };

export default async function PostsPage() {
  const rawPosts = await getPublishedPosts();
  const posts = await Promise.all(rawPosts.map(async post => ({
    ...post,
    media_url: await getMediaUrl(post.media_path) || undefined,
    thumbnail_url: await getMediaUrl(post.thumbnail_path) || undefined
  })));
  return <div className="container">
    <section className="page-intro"><span className="eyebrow">The collection</span><h1>All Posts</h1><p>Explore the full collection of published visuals and videos. Search by title, description, or category.</p></section>
    <PostArchive posts={posts}/>
  </div>;
}
