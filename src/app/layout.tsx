import './globals.css';
import './media.css';
import './photography.css';
import './project-register.css';
import Link from 'next/link';
import Image from 'next/image';
import {company} from '../data/company';
import {siteUrl} from '../data/site';
import SiteHeader from '../components/layout/SiteHeader';
import Analytics from '../components/layout/Analytics';

export const metadata={title:{default:'SVJ Engineers & Consultants | Infrastructure from concept to commissioning',template:'%s'},description:'Chennai-based consulting, design, engineering and project management for serious infrastructure assignments.',metadataBase:new URL(siteUrl),alternates:{canonical:'/'},openGraph:{type:'website',siteName:'SVJ Engineers and Consultants',title:'Engineering Infrastructure. From Concept to Commissioning.',description:'Consulting, design, engineering and project management for serious infrastructure assignments.',images:['/images/projects/photography/munnar-bodimettu-highway.webp']},twitter:{card:'summary_large_image',title:'SVJ Engineers and Consultants',description:'Infrastructure consulting from concept to commissioning.',images:['/images/projects/photography/munnar-bodimettu-highway.webp']},icons:{icon:'/icon.png'}};
export const viewport={width:'device-width',initialScale:1};

function Brand(){return <Image className="brand-logo" src="/logos/svj-mark-enhanced.png" alt="SVJ Engineers and Consultants" width={1536} height={1024}/>}
export default function Layout({children}:{children:React.ReactNode}){const schema={"@context":"https://schema.org","@type":["Organization","ProfessionalService"],name:company.name,url:siteUrl,'@id':`${siteUrl}/#organization`,address:{"@type":"PostalAddress",streetAddress:'55 Cartman Street, West Mambalam',addressLocality:'Chennai',postalCode:'600033',addressCountry:'IN'},email:company.email,telephone:company.phone,founder:{"@type":"Person",name:'M. Ubendiran',jobTitle:'Founder & Principal Consultant'}};return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><Analytics/><SiteHeader/>{children}<footer className="footer"><div><Link className="brand-link" href="/"><Brand/></Link><p>{company.address}</p></div><nav><a data-analytics="phone_clicked" href={'tel:'+company.phone.replaceAll(' ','')}>{company.phone}</a><a data-analytics="email_clicked" href={'mailto:'+company.email}>Email ↗</a><Link href="/privacy">Privacy</Link></nav></footer></body></html>}
