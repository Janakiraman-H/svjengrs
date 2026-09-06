'use client';
import Link from 'next/link';
import Image from 'next/image';
import {photoById} from '../data/project-photography';
import {ArrowUpRight} from 'lucide-react';
import {clients} from '../data/company';
import {projects} from '../data/projects';
import StoryScroll from '../components/home/StoryScroll';
import ExpertiseExplorer from '../components/home/ExpertiseExplorer';
import ProfileGallery from '../components/home/ProfileGallery';
const featuredProject=projects[2];
const featuredPhoto=photoById('renault-nissan-high-speed-track');
export default function Home(){return <main>
<section className="hero"><div className="hero-grid"/><div className="hero-content"><div className="eyebrow mono">Independent infrastructure consultancy · Chennai</div><h1>Engineering<br/><span style={{color:'var(--blue)'}}>infrastructure.</span></h1><p className="hero-sub">From feasibility and design through construction supervision. Precision-led consulting for roads, airports, ports, industrial structures and racing test tracks.</p><div className="hero-actions"><Link className="button" href="/consultation">Discuss a project <ArrowUpRight size={15} style={{verticalAlign:'middle'}}/></Link><a className="text-link" href="#story">Explore our work ↓</a></div></div></section>
<StoryScroll/>
<section className="section dark"><div className="section-head"><h2>Measured by the work.</h2><p className="lead">A practice shaped by repeat clients, interdisciplinary teams and a clear line from technical judgment to project success.</p></div><div className="numbers"><div><div className="number">34+</div><div className="number-label">years of founder and principal experience</div></div><div><div className="number">15</div><div className="number-label">strong and growing professional staff</div></div><div><div className="number">40</div><div className="number-label">projects listed in the company profile</div></div></div></section>
<section id="expertise" className="section paper"><div className="section-head"><h2>One practice.<br/>Many scales.</h2><p className="lead" style={{color:'#566064'}}>Consulting, design, civil engineering and project management brought together around the demands of each assignment.</p></div><ExpertiseExplorer/></section>
<section className="section dark"><div className="section-head"><h2>Selected<br/><span style={{color:'var(--blue)'}}>assignments.</span></h2><Link className="text-link" href="/projects">View all projects ↗</Link></div><div className="project-feature"><div className="project-photo-feature"><Image src={featuredPhoto.src} alt={featuredPhoto.alt} width={featuredPhoto.width} height={featuredPhoto.height} sizes="(max-width:760px) 90vw, 46vw"/><span className="mono photo-feature-label">Renault–Nissan / Track photography</span></div><div className="project-info"><div><span className="mono">Featured project / {String(featuredProject.id).padStart(2,'0')}</span><h3>{featuredProject.title}</h3><p className="lead">{featuredProject.description}</p></div><div className="project-meta"><div><small>Client</small><span>{featuredProject.client}</span></div><div><small>Location</small><span>{featuredProject.location}</span></div><div><small>Role</small><span>{featuredProject.role}</span></div><div><small>Project value</small><span>{featuredProject.cost}</span></div></div><Link className="text-link" href={'/projects/'+featuredProject.slug}>Read project note ↗</Link></div></div></section>
<ProfileGallery/>
<section className="section dark" style={{paddingTop:20}}><div className="eyebrow mono">Selected clientele</div><div className="client-marquee">{clients.slice(0,8).map(c=><span key={c}>{c}</span>)}</div></section>
<section className="section paper"><div className="copy-grid"><h2>Planning something complex?</h2><div><p>Tell us what you are solving. We can begin with a focused conversation about scope, stage, location and the technical decisions ahead.</p><Link className="button" href="/consultation">Book a consultation <ArrowUpRight size={15} style={{verticalAlign:'middle'}}/></Link></div></div></section>
</main>}
