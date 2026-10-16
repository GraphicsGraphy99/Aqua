import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { formatDate } from "@/lib/utils";

export default async function AdminDashboard() {
  const { supabase } = await requireAdmin();
  const { data: posts } = await supabase.from("posts").select("id,title,post_type,status,created_at,published_at").order("created_at", {ascending:false}).limit(8);
  const all = posts || [];
  const { count: total } = await supabase.from("posts").select("id", {count:"exact",head:true});
  const { count: pictures } = await supabase.from("posts").select("id", {count:"exact",head:true}).eq("post_type","image").eq("status","published");
  const { count: videos } = await supabase.from("posts").select("id", {count:"exact",head:true}).eq("post_type","video").eq("status","published");
  const { count: drafts } = await supabase.from("posts").select("id", {count:"exact",head:true}).eq("status","draft");
  return <>
    <div className="admin-title"><div><h1>Dashboard</h1><p className="help-text">Your creative publishing overview.</p></div><Link className="button" href="/admin/posts/new">＋ Create post</Link></div>
    <div className="stats-grid">
      {[["Published pictures",pictures],["Published videos",videos],["Drafts",drafts],["Total posts",total]].map(([label,value])=><div className="stat-card" key={String(label)}><span>{label}</span><strong>{value ?? 0}</strong></div>)}
    </div>
    <section className="admin-card"><div className="admin-title"><h2 style={{fontSize:"1.2rem",margin:0}}>Recent posts</h2><Link className="text-link" href="/admin/posts">Manage all →</Link></div>
      {all.length ? <table className="admin-table"><thead><tr><th>Title</th><th>Type</th><th>Status</th><th>Created</th></tr></thead><tbody>{all.map(p=><tr key={p.id}><td><Link href={`/admin/posts/${p.id}/edit`} className="text-link">{p.title}</Link></td><td>{p.post_type}</td><td><span className={`status ${p.status}`}>{p.status}</span></td><td>{formatDate(p.created_at)}</td></tr>)}</tbody></table> : <p className="help-text">No posts yet. Create your first post to get started.</p>}
    </section>
    <div className="admin-card"><h2 style={{marginTop:0}}>Quick actions</h2><div className="toolbar"><Link className="button secondary" href="/admin/posts/new?type=image">Upload a picture</Link><Link className="button secondary" href="/admin/posts/new?type=video">Add a video</Link><Link className="button secondary" href="/admin/settings">Edit site settings</Link></div></div>
  </>;
}
