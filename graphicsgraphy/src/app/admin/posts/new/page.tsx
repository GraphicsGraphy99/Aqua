import { requireAdmin } from "@/lib/auth";
import { UploadPostForm } from "@/components/UploadPostForm";

export default async function NewPostPage({ searchParams }: { searchParams: Promise<{type?:string;error?:string}> }) {
  await requireAdmin();
  const params = await searchParams;
  const type = params.type === "video" ? "video" : "image";
  return <><div className="admin-title"><div><h1>Create a post</h1><p className="help-text">Add your creative work and choose when it becomes public.</p></div></div>{params.error && <div className="notice error">Please check all fields and try again.</div>}<div className="admin-card"><UploadPostForm initialType={type}/></div></>;
}
