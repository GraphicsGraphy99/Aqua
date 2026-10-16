import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { logoutAction } from "@/app/admin/actions";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Login is intentionally outside this layout to avoid redirect loops.
  return <div className="admin-shell">
    <div className="admin-top"><div className="container">
      <Link href="/admin" className="brand" style={{color:"white"}}><span className="brand-mark">G</span><span>GraphicsGraphy Admin</span></Link>
      <form action={logoutAction}><button className="button secondary" type="submit">Log out</button></form>
    </div></div>
    <div className="container admin-content">
      <nav className="admin-nav" aria-label="Admin navigation"><Link href="/admin">Overview</Link><Link href="/admin/posts">Manage posts</Link><Link href="/admin/posts/new">New post</Link><Link href="/admin/settings">Site settings</Link><Link href="/admin/contact">Messages</Link></nav>
      {children}
    </div>
  </div>;
}
