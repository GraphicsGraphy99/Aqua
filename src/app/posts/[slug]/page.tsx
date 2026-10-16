import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMediaUrl, getPostBySlug } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { Download } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.description.slice(0, 160),
    openGraph: { title: post.title, description: post.description.slice(0, 160), type: post.post_type === "video" ? "video.other" : "article" },
    alternates: { canonical: `/posts/${post.slug}` }
  };
}

export default async function PostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const media = await getMediaUrl(post.media_path);
  const thumbnail = await getMediaUrl(post.thumbnail_path);
  return <div className="container"><article className="detail-layout">
    <div className="detail-media">
      {post.post_type === "image" ? (media ? <img src={media} alt={post.alt_text || post.title}/> : <p style={{padding:30}}>Media is temporarily unavailable.</p>) :
        (media && (media.includes("youtube.com") || media.includes("youtu.be") || media.includes("vimeo.com")) ?
          <iframe src={media} title={post.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/> :
          media ? <video controls preload="metadata" poster={thumbnail || undefined} src={media}>Your browser does not support this video.</video> : <p style={{padding:30}}>Video is temporarily unavailable.</p>)}
    </div>
    <div className="card-meta"><span>{formatDate(post.published_at)}</span>{post.category && <span className="category-pill">{post.category}</span>}<span>{post.post_type === "image" ? "Picture" : "Video"}</span></div>
    <h1>{post.title}</h1>
    <p className="detail-description">{post.description}</p>
    {!!post.tags?.length && <div className="card-meta" aria-label="Tags">{post.tags.map(tag => <span className="category-pill" key={tag}>#{tag}</span>)}</div>}
    {post.post_type === "image" && post.allow_download && media && <p><a className="button secondary" href={media} download><Download size={17}/> Download image</a></p>}
  </article></div>;
}
