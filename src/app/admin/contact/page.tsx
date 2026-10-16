import { requireAdmin } from "@/lib/auth";
import { formatDate } from "@/lib/utils";

export default async function ContactMessagesPage() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.from("contact_messages").select("id,name,email,subject,message,created_at,status").order("created_at",{ascending:false}).limit(100);
  return <><div className="admin-title"><div><h1>Contact messages</h1><p className="help-text">Private enquiries submitted through the website.</p></div></div><div className="admin-card">
    {error ? <p className="help-text">Could not load messages. Confirm the contact-message RLS policies.</p> : data?.length ? <table className="admin-table"><thead><tr><th>From</th><th>Subject / message</th><th>Received</th><th>Status</th></tr></thead><tbody>{data.map(m=><tr key={m.id}><td>{m.name}<div className="help-text">{m.email}</div></td><td><strong>{m.subject}</strong><p style={{whiteSpace:"pre-wrap"}}>{m.message}</p></td><td>{formatDate(m.created_at)}</td><td><span className="status">{m.status}</span></td></tr>)}</tbody></table> : <p className="help-text">No contact messages yet.</p>}
  </div></>;
}
