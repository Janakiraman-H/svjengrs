'use client';
import Image from 'next/image';
import {useEffect, useRef, useState} from 'react';
import {photoById} from '../../data/project-photography';

const scenes = [
  {kicker:'01 / Terrain',title:'Built for the complex.',body:'Munnar–Bodimettu, NH 85. Highway engineering shaped around the mountain landscape.',photo:photoById('munnar-bodimettu-highway')},
  {kicker:'02 / Structure',title:'Connections that endure.',body:'Kutheripettu VUP. A closer view of the structure, road deck and lighting after dark.',photo:photoById('kutheripettu-vup-night')},
  {kicker:'03 / Precision',title:'Every movement measured.',body:'MMST karting track, Chennai. The geometry of performance, seen from above.',photo:photoById('mmst-karting-day')},
  {kicker:'04 / Performance',title:'Designed to perform.',body:'Renault–Nissan, Chennai. High-speed test-track engineering, from pavement to drainage.',photo:photoById('renault-nissan-high-speed-track')},
].map(scene=>({...scene,src:scene.photo.src,alt:scene.photo.alt}));

export default function StoryScroll(){
  const sectionRef=useRef<HTMLElement>(null);
  const pinRef=useRef<HTMLDivElement>(null);
  const [progress,setProgress]=useState(0);
  useEffect(()=>{
    let frame=0;
    const update=()=>{
      cancelAnimationFrame(frame);
      frame=requestAnimationFrame(()=>{
        const section=sectionRef.current,pin=pinRef.current;
        if(!section||!pin)return;
        const range=Math.max(1,section.offsetHeight-pin.offsetHeight);
        setProgress(Math.max(0,Math.min(1,-section.getBoundingClientRect().top/range)));
      });
    };
    const observer=new ResizeObserver(update);
    if(sectionRef.current)observer.observe(sectionRef.current);
    if(pinRef.current)observer.observe(pinRef.current);
    update();
    window.addEventListener('scroll',update,{passive:true});
    window.addEventListener('resize',update);
    return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('scroll',update);window.removeEventListener('resize',update)};
  },[]);
  const position=progress*(scenes.length-1);
  return <section ref={sectionRef} id="story" className="story"><div ref={pinRef} className="sticky"><div className="story-frame story-media-frame"><div className="story-layers">{scenes.map((scene,index)=>{const distance=Math.abs(position-index);const opacity=index===0?1:Math.max(0,Math.min(1,position-index+1));return <div className="story-layer" key={scene.src} aria-hidden={Math.round(position)!==index} style={{opacity,transform:`scale(${1.05-distance*.008}) translate3d(0,${(index-position)*5}px,0)`,zIndex:index}}><Image src={scene.src} alt={scene.alt} fill sizes="(max-width:760px) 90vw, 84vw" loading="eager" /></div>})}</div><div className="story-shade"/><span className="story-photo-tag mono">Field photography / SVJ</span><div className="story-copy"><span className="mono">{scenes[Math.round(position)].kicker}</span><h2>{scenes[Math.round(position)].title}</h2><p>{scenes[Math.round(position)].body}</p><div className="story-dots" aria-label="Story progress">{scenes.map((scene,index)=><i key={scene.kicker} className={Math.round(position)===index?'active':''}/>)}</div></div><div className="story-progress" aria-hidden="true"><span style={{transform:`scaleX(${progress})`}}/></div></div></div></section>;
}
