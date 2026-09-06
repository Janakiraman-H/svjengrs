import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {projects} from '../../../data/projects';
import {siteUrl} from '../../../data/site';
import {contributionFor} from '../../../data/project-contributions';

// Only the 40 source-backed assignments exist; unknown slugs must not generate
// new pages against the deployment's read-only static cache.
export const dynamicParams=false;
export function generateStaticParams(){return projects.map(project=>({slug:project.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;const project=projects.find(item=>item.slug===slug);if(!project)return{};
 return{title:`${project.title} | SVJ Assignments`,description:`SVJ contribution: ${project.role}. ${project.description}`,alternates:{canonical:`/projects/${project.slug}`},openGraph:{title:project.title,description:`SVJ contribution: ${project.role}.`,type:'article',images:[]},twitter:{card:'summary',images:[]}};
}
export default async function Project({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const project=projects.find(item=>item.slug===slug);if(!project)notFound();
 const contribution=contributionFor(project);
 const related=projects.filter(item=>item.id!==project.id&&contributionFor(item).id===contribution.id).slice(0,3);
 const schema={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:'Assignments',item:`${siteUrl}/projects`},{"@type":"ListItem",position:2,name:project.title,item:`${siteUrl}/projects/${project.slug}`}]};
 return <main className="assignment-note-page"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
  <section className="assignment-note-hero"><Link className="assignment-breadcrumb" href="/projects">← Assignment register</Link><div className="eyebrow mono">Assignment {String(project.id).padStart(2,'0')} / {project.sector}</div><h1>{project.title}</h1><div className="assignment-role-line"><span className="mono">SVJ contribution</span><p>{project.role}</p></div></section>
  <section className="assignment-note-body">
    <div className="assignment-note-grid"><div className="assignment-note-scope"><span className="mono">The assignment</span><h2>A defined scope.<br/>A considered contribution.</h2><p>{project.description}</p><div className="assignment-role-statement"><span className="mono">Our stated role</span><h3>{project.role}</h3></div><Link className="assignment-note-cta" href="/consultation">Discuss a similar requirement ↗</Link></div>
    <aside className="assignment-record" aria-label="Engagement details"><span className="mono">Engagement record / {String(project.id).padStart(2,'0')}</span><dl><div><dt>Client</dt><dd>{project.client}</dd></div><div><dt>Location</dt><dd>{project.location}</dd></div><div><dt>Sector</dt><dd>{project.sector}</dd></div><div><dt>SVJ contribution</dt><dd>{project.role}</dd></div><div><dt>Status in company profile</dt><dd>{project.status==='On Going'?'Ongoing':project.status}</dd></div><div><dt>Reported project value</dt><dd>{project.cost}</dd></div></dl><p>The value describes the wider project, not SVJ’s consultancy fee. Status is as recorded in the company profile.</p></aside></div>
    <div className="assignment-related"><span className="mono">More in {contribution.title}</span><div>{related.map(item=><Link key={item.slug} href={`/projects/${item.slug}`}><span className="mono">{String(item.id).padStart(2,'0')} / {item.sector}</span><h3>{item.shortTitle}</h3><span className="related-role">{item.role}</span><span className="related-arrow" aria-hidden="true">↗</span></Link>)}</div></div>
  </section>
 </main>;
}
