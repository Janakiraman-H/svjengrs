'use client';
import Link from 'next/link';
import {useMemo,useState} from 'react';
import {projects} from '../../data/projects';
import {contributions,contributionFor,type ContributionId} from '../../data/project-contributions';

const sectors=[...new Set(projects.map(project=>project.sector))];
export default function ProjectsExplorer(){
  const [sector,setSector]=useState('All');
  const [status,setStatus]=useState('All');
  const [contribution,setContribution]=useState<ContributionId|'All'>('All');
  const [query,setQuery]=useState('');
  const shown=useMemo(()=>projects.filter(project=>
    (sector==='All'||project.sector===sector)&&
    (status==='All'||project.status===status)&&
    (contribution==='All'||contributionFor(project).id===contribution)&&
    `${project.title} ${project.client} ${project.location} ${project.role}`.toLowerCase().includes(query.trim().toLowerCase())
  ),[sector,status,contribution,query]);
  const filtered=sector!=='All'||status!=='All'||contribution!=='All'||query!=='';
  function reset(){setSector('All');setStatus('All');setContribution('All');setQuery('');}
  return <>
    <section className="contribution-section" aria-labelledby="contribution-heading">
      <div className="contribution-heading"><h2 id="contribution-heading">Where we contribute.</h2><button type="button" className={contribution==='All'?'contribution-all selected':'contribution-all'} aria-pressed={contribution==='All'} onClick={()=>setContribution('All')}>All contributions <span>↗</span></button></div>
      <div className="contribution-options" role="group" aria-label="Filter by SVJ contribution">
        {contributions.map(item=><button key={item.id} type="button" aria-pressed={contribution===item.id} className={contribution===item.id?'contribution-option selected':'contribution-option'} onClick={()=>setContribution(value=>value===item.id?'All':item.id)}>
          <span className="contribution-option-top"><span className="mono">{item.number}</span><span className="contribution-count">{projects.filter(project=>contributionFor(project).id===item.id).length} assignments</span></span>
          <strong>{item.title}</strong><span className="contribution-description">{item.description}</span><span className="contribution-option-arrow" aria-hidden="true">↗</span>
        </button>)}
      </div>
    </section>
    <section id="assignment-register" className="assignment-register" aria-labelledby="register-heading">
      <div className="register-heading"><div><span className="mono">The assignment register</span><h2 id="register-heading">The context. Our contribution.</h2></div><p>Open an entry for the scope and engagement details.</p></div>
      <div className="register-filters">
        <label className="register-search"><span>Find an assignment</span><input type="search" placeholder="Project, client, place or service…" value={query} onChange={event=>setQuery(event.target.value)}/></label>
        <label><span id="assignment-sector-label">Sector</span><select aria-labelledby="assignment-sector-label" value={sector} onChange={event=>setSector(event.target.value)}><option value="All">All sectors</option>{sectors.map(value=><option key={value}>{value}</option>)}</select></label>
        <label><span id="assignment-status-label">Status in profile</span><select aria-labelledby="assignment-status-label" value={status} onChange={event=>setStatus(event.target.value)}><option value="All">All statuses</option><option value="Completed">Completed</option><option value="On Going">Ongoing</option></select></label>
      </div>
      <div className="register-result-bar"><p role="status">{shown.length} of {projects.length} assignments{contribution!=='All'&&<> · {contributions.find(item=>item.id===contribution)?.title}</>}</p>{filtered&&<button type="button" onClick={reset}>Reset filters ×</button>}</div>
      <div className="register-column-head" aria-hidden="true"><span>Ref.</span><span>Assignment / location</span><span>SVJ contribution</span><span/></div>
      <div className="assignment-entries">
        {shown.map(project=><details className="assignment-entry" key={project.slug} name="svj-assignment" data-contribution={contributionFor(project).id}>
          <summary>
            <span className="assignment-number mono">{String(project.id).padStart(2,'0')}</span>
            <span className="assignment-heading"><span className="assignment-sector mono">{project.sector}</span><span className="assignment-title">{project.shortTitle}</span><span className="assignment-location">{project.location}</span></span>
            <span className="assignment-contribution"><span className="assignment-mobile-label">SVJ contribution</span><span>{project.role}</span></span>
            <span className="assignment-expand" aria-hidden="true"/>
          </summary>
          <div className="assignment-expanded">
            <div className="assignment-scope"><span className="mono">Assignment context</span><h3>{project.title}</h3><p>{project.description}</p><Link href={`/projects/${project.slug}`}>View assignment note <span aria-hidden="true">↗</span></Link></div>
            <dl className="assignment-facts"><div><dt>SVJ’s stated role</dt><dd>{project.role}</dd></div><div><dt>Client</dt><dd>{project.client}</dd></div><div><dt>Status in profile</dt><dd>{project.status==='On Going'?'Ongoing':project.status}</dd></div><div><dt>Reported project value</dt><dd>{project.cost}</dd></div></dl>
            <p className="assignment-context-note">The value refers to the wider project, not SVJ’s consultancy fee. Status is as recorded in the company profile.</p>
          </div>
        </details>)}
      </div>
      {shown.length===0&&<div className="register-empty"><h3>No matching assignments.</h3><p>Try a different contribution, sector or search term.</p><button type="button" onClick={reset}>Show all assignments ↗</button></div>}
      <div className="register-end"><span className="mono">SVJ / Engineering consultancy</span><p>Each entry describes SVJ’s stated scope within the wider project.</p><Link href="/consultation">Discuss your requirements ↗</Link></div>
    </section>
  </>;
}
