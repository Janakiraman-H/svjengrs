'use client';
import Image from 'next/image';
import {useState} from 'react';
import {expertise} from '../../data/company';
import {photoById} from '../../data/project-photography';
const field=(id:string)=>{const p=photoById(id);return{src:p.src,alt:p.alt,caption:p.title}};
const scenes=[
 field('munnar-bodimettu-highway'),
 {src:'/images/projects/svj-airport-pavement-visual.png',alt:'Illustrative airport apron and taxiway.',caption:'Airport pavement / Sector illustration'},
 field('mmst-karting-day'),
 field('kutheripettu-vup-night'),
 {src:'/images/company/svj-infrastructure-hero.png',alt:'Illustrative industrial infrastructure network.',caption:'Infrastructure planning / Sector illustration'},
 field('kumbakonam-mannargudi-highway'),
];
export default function ExpertiseExplorer(){
 const [active,setActive]=useState(0),item=expertise[active],scene=scenes[active];
 return <div className="expertise-layout"><div className="expertise-nav" role="tablist" aria-label="SVJ expertise areas" aria-orientation="vertical">
 {expertise.map((x,i)=><button id={`expertise-tab-${i}`} className={'expertise-item '+(i===active?'active':'')} key={x[0]} onClick={()=>setActive(i)} role="tab" tabIndex={i===active?0:-1} aria-selected={i===active} aria-controls="expertise-visual" onKeyDown={e=>{let next=i;if(e.key==='ArrowDown')next=(i+1)%expertise.length;else if(e.key==='ArrowUp')next=(i-1+expertise.length)%expertise.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=expertise.length-1;else return;e.preventDefault();setActive(next);document.getElementById(`expertise-tab-${next}`)?.focus()}}><span className="mono">{x[0]}</span><span><strong>{x[1]}</strong><span className="expertise-description">{x[2]}</span></span><span className="expertise-arrow" aria-hidden="true">↗</span></button>)}
 </div><div id="expertise-visual" className="expertise-visual expertise-photograph" role="tabpanel" aria-labelledby={`expertise-tab-${active}`}><Image key={scene.src} src={scene.src} alt={scene.alt} fill sizes="(max-width:760px) 90vw, 48vw"/><div className="expertise-photo-shade"/><span className="photo-index mono" aria-hidden="true">{item[0]} / Expertise</span><div className="expertise-caption"><strong>{item[1]}</strong><span className="mono">{scene.caption}</span></div></div></div>;
}
