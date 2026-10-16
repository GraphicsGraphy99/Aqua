import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { formatDate } from "@/lib/utils";
import { deletePostAction } from "@/app/admin/actions";

export default async function AdminPostsPage({ searchParams }: { searchParams: Promise<{saved?:string;deleted?:string;error?:string}> }) {
  const { supabase } = await requireAdmin();
  const params = await searchParams;
  const { data } = await supabase.from("posts").select("*").order("created_at",{ascending:false}).limit(200);
  const posts = data || [];
  return <>
    <div className="admin-title"><div><h1>Manage posts</h1><p className="help-text">Create, edit, publish, or remove your content.</p></div><Link className="button" href="/admin/posts/new">＋ New post</Link></div>
    {params.saved && <div className="notice">Post saved.</div>}{params.deleted && <div className="notice">Post deleted.</div>}{params.error && <div className="notice error">Action failed. Please try again.</div>}
    <div className="admin-card">
      {posts.length ? <table className="admin-table"><thead><tr><th>Post</th><th>Type</th><th>Status</th><th>Published</th><th>Actions</th></tr></thead><tbody>{posts.map(p=><tr key={p.id}><td><strong>{p.title}</strong><div className="help-text">/{p.slug}</div></td><td>{p.post_type}</td><td><span className={`status ${p.status}`}>{p.status}</span></td><td>{formatDate(p.published_at)}</td><td><div style={{display:"flex",gap:8,flexWrap:"wrap"}}><Link className="text-link" href={`/admin/posts/${p.id}/edit`}>Edit</Link><form action={deletePostAction}><input type="hidden" name="id" value={p.id}/><button className="text-link" style={{border:0,background:"none",cursor:"pointer"}} type="submit" formAction={deletePostAction}>Delete</button></form></div></td></tr>)}</tbody></table> : <p className="help-text">No posts found. Create your first one.</p>}
    </div>
  </>;
}
