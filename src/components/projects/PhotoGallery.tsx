'use client';
import Image from 'next/image';
import Link from 'next/link';
import {useRef,useState} from 'react';
import type {ProjectPhoto} from '../../data/project-photography';

export default function PhotoGallery({photos,compact=false}:{photos:ProjectPhoto[];compact?:boolean}){
  const dialog=useRef<HTMLDialogElement>(null);
  const [active,setActive]=useState(0);
  const current=photos[active];
  function open(index:number){setActive(index);dialog.current?.showModal();}
  function move(direction:number){setActive(index=>(index+direction+photos.length)%photos.length);}
  return <>
    <div className={`photo-gallery ${compact?'photo-gallery-compact':''}`}>
      {photos.map((photo,index)=><figure key={photo.id} className={photo.height>photo.width?'portrait-photo':''}>
        <button type="button" className="photo-open" onClick={()=>open(index)} aria-label={`Enlarge ${photo.title}`}>
          <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width:760px) 90vw, 42vw"/>
          <span className="photo-index mono" aria-hidden="true">{String(index+1).padStart(2,'0')} / SVJ</span><span className="photo-enlarge" aria-hidden="true">↗</span>
          {photo.kind==='rendering'&&<span className="photo-type mono">Design visualization</span>}
        </button>
        <figcaption><div><h3>{photo.title}</h3><span className="mono">{photo.location}</span></div>{photo.projectSlug&&<Link className="photo-project-link" href={`/projects/${photo.projectSlug}`}>Project ↗</Link>}</figcaption>
      </figure>)}
    </div>
    <dialog ref={dialog} className="photo-dialog" aria-label="Project image viewer" onClick={event=>{if(event.target===event.currentTarget)dialog.current?.close()}} onKeyDown={event=>{if(event.key==='ArrowRight'){event.preventDefault();move(1)}if(event.key==='ArrowLeft'){event.preventDefault();move(-1)}}}>
      <div className="photo-dialog-toolbar"><span className="mono">{String(active+1).padStart(2,'0')} / {String(photos.length).padStart(2,'0')} · {current.kind==='rendering'?'Design visualization':'Project photography'}</span><button autoFocus type="button" onClick={()=>dialog.current?.close()} aria-label="Close image viewer">Close ×</button></div>
      <div className="photo-dialog-image"><Image src={current.src} alt={current.alt} fill sizes="95vw"/></div>
      <div className="photo-dialog-footer"><div><h3>{current.title}</h3><span className="mono">{current.location}</span></div>{photos.length>1&&<div className="photo-dialog-controls"><button type="button" onClick={()=>move(-1)} aria-label="Previous image">←</button><button type="button" onClick={()=>move(1)} aria-label="Next image">→</button></div>}</div>
    </dialog>
  </>;
}
