import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { UploadPostForm } from "@/components/UploadPostForm";

export default async function EditPostPage({ params }: { params: Promise<{id:string}> }) {
  const { supabase } = await requireAdmin();
  const { id } = await params;
  const { data, error } = await supabase.from("posts").select("*").eq("id",id).maybeSingle();
  if (error || !data) notFound();
  return <><div className="admin-title"><div><h1>Edit post</h1><p className="help-text">Update details, media, or publishing status.</p></div></div><div className="admin-card"><UploadPostForm existing={data}/></div></>;
}
