import { requireAdmin } from "@/lib/auth";
import { getSettings } from "@/lib/data";
import { saveSettingsAction } from "@/app/admin/actions";

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{saved?:string;error?:string}> }) {
  await requireAdmin();
  const s = await getSettings();
  const params = await searchParams;
  return <>
    <div className="admin-title"><div><h1>Site settings</h1><p className="help-text">Manage the public brand details and page content.</p></div></div>
    {params.saved && <div className="notice">Settings saved.</div>}{params.error && <div className="notice error">Settings could not be saved.</div>}
    <div className="admin-card"><form className="admin-form" action={saveSettingsAction}>
      <h2>Branding and homepage</h2>
      {field("brand_name","Brand name",s.brand_name)}
      {field("tagline","Tagline",s.tagline)}
      <div className="form-grid">{field("homepage_picture_limit","Homepage picture count",String(s.homepage_picture_limit),"number")}{field("homepage_video_limit","Homepage video count",String(s.homepage_video_limit),"number")}</div>
      <h2>About page</h2>{field("about_intro","Introduction",s.about_intro,"textarea")}{field("about_mission","Mission",s.about_mission,"textarea")}{field("about_vision","Vision",s.about_vision,"textarea")}
      <h2>Contact and social links</h2>{field("contact_email","Public contact email",s.contact_email,"email")}{field("instagram_url","Instagram URL",s.instagram_url,"url")}{field("youtube_url","YouTube URL",s.youtube_url,"url")}
      <h2>SEO</h2>{field("seo_description","Default meta description",s.seo_description,"textarea")}
      <button className="button" type="submit">Save settings</button>
    </form></div>
  </>;
}

function field(name:string,label:string,value:string,type="text") {
  return <div className="form-row" key={name}><label htmlFor={name}>{label}</label>{type==="textarea" ? <textarea className="textarea" id={name} name={name} defaultValue={value} rows={4} maxLength={12000}/> : <input className="field" id={name} name={name} type={type} defaultValue={value} maxLength={2000} min={1} max={12}/>}</div>;
}
