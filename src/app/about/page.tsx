import type {Metadata} from 'next';
import Link from 'next/link';
import {company} from '../../data/company';
import {siteUrl} from '../../data/site';

export const metadata:Metadata={
  title:'About SVJ Engineers & Consultants',
  description:'Meet SVJ, a Chennai-based multidisciplinary engineering consultancy bringing together design, technical review and project management for infrastructure assignments.',
  alternates:{canonical:'/about'},
};

const practice=[
  {title:'Design & engineering',description:'Civil and structural design, detailed engineering, pavements and drainage—considered together in the context of each assignment.'},
  {title:'Technical review',description:'Proof checking and independent design review, with attention to the technical requirements and the scope entrusted to us.'},
  {title:'Project support',description:'Pre-bid engineering, construction supervision and project management, with services shaped around the stage and needs of the project.'},
];

export default function About(){
  const schema={'@context':'https://schema.org','@type':'AboutPage',name:'About SVJ Engineers & Consultants',url:`${siteUrl}/about`,about:{'@id':`${siteUrl}/#organization`}};
  return <main className="about-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
    <section className="page-hero">
      <div className="eyebrow mono">About SVJ</div>
      <h1>Shared expertise.<br/><span style={{color:'var(--blue)'}}>Considered solutions.</span></h1>
      <p className="hero-sub">{company.intro}</p>
    </section>
    <section className="section paper">
      <div className="copy-grid">
        <h2>A practice built on collaboration.</h2>
        <div>
          <p>SVJ brings consulting, design, civil engineering and project management together around each assignment. Our work spans transport infrastructure, automotive test tracks, buildings, industrial facilities and utilities.</p>
          <p>Our approach connects the expertise within our team with the needs of clients and project partners. We focus on clear scope, coordinated technical input and practical decisions at each stage.</p>
        </div>
      </div>
    </section>
    <section id="approach" className="section dark about-practice">
      <div className="section-head">
        <h2>Expertise,<br/>working together.</h2>
        <p className="lead">Different disciplines. A shared focus on the project. The services we bring together depend on the responsibility defined for each engagement.</p>
      </div>
      <div className="practice-grid">
        {practice.map((item,index)=><article key={item.title}>
          <span className="mono">0{index+1}</span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>)}
      </div>
      <div id="founder" className="practice-background">
        <span className="mono">Our beginnings</span>
        <p>Founded in {company.founded} by M. Ubendiran, SVJ is based in Chennai and works across a range of infrastructure sectors.</p>
      </div>
      <Link className="text-link" href="/projects">Explore our assignments ↗</Link>
    </section>
  </main>;
}
