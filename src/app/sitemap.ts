import type {MetadataRoute} from 'next';
import {projects} from '../data/projects';
import {siteUrl} from '../data/site';
export default function sitemap():MetadataRoute.Sitemap {
  const paths=['','/about','/projects','/consultation','/privacy',...projects.map(project=>`/projects/${project.slug}`)];
  return paths.map(path=>({url:`${siteUrl}${path}`}));
}
