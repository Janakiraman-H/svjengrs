import type {Project} from './projects';
import {photosForProject} from './project-photography';
const visuals: Record<string,string> = {
  Airport: '/images/projects/svj-airport-pavement-visual.png',
  Automotive: '/images/projects/svj-automotive-test-track-visual.png',
  'Roads & Highways': '/images/projects/svj-road-corridor-visual.png',
  Industrial: '/images/company/svj-infrastructure-hero.png',
  'Port & Logistics': '/images/company/svj-infrastructure-hero.png',
  'Urban Infrastructure': '/images/company/svj-infrastructure-hero.png',
  Buildings: '/images/company/svj-infrastructure-hero.png',
  Bridges: '/images/projects/svj-road-corridor-visual.png',
  'Water & Utilities': '/images/company/svj-infrastructure-hero.png',
};

export function visualForProject(sector:string){return visuals[sector] ?? '/images/company/svj-infrastructure-hero.png';}

export function mediaForProject(project:Project){
  const photo=photosForProject(project.slug)[0];
  return photo?{src:photo.src,alt:photo.alt,label:photo.kind==='rendering'?'Design visualization':'Project photograph',photo}:{src:visualForProject(project.sector),alt:`Illustrative ${project.sector.toLowerCase()} engineering scene`,label:'Sector illustration',photo:undefined};
}
