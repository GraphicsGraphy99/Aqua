import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { loginAction } from "./login-action";

export const metadata: Metadata = { title: "Admin Login", robots: { index: false, follow: false } };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    const { data } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
    if (data?.role === "admin") redirect("/admin");
  }
  const params = await searchParams;
  return <div className="container" style={{minHeight:"70vh",display:"grid",placeItems:"center",paddingBlock:50}}>
    <div className="form-card" style={{maxWidth:450,margin:0}}>
      <span className="eyebrow">Private access</span><h1 style={{letterSpacing:"-.06em"}}>Admin login</h1>
      <p className="help-text">Sign in with an administrator account created in Supabase.</p>
      {params.error && <div className="notice error" role="alert">Sign-in failed. Check your details and try again.</div>}
      <form action={loginAction}>
        <div className="form-row"><label htmlFor="email">Email</label><input className="field" id="email" name="email" type="email" autoComplete="username" required maxLength={254}/></div>
        <div className="form-row"><label htmlFor="password">Password</label><input className="field" id="password" name="password" type="password" autoComplete="current-password" required maxLength={200}/></div>
        <button className="button" style={{width:"100%"}} type="submit">Sign in</button>
      </form>
    </div>
  </div>;
}
