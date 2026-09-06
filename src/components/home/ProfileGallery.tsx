import PhotoGallery from '../projects/PhotoGallery';
import {photoById} from '../../data/project-photography';
const photos=['munnar-bodimettu-highway','mmst-karting-day','kutheripettu-vup-night','zf-automotive-test-track','shenkotta-punalur-corridor','kumbakonam-mannargudi-highway'].map(photoById);
export default function ProfileGallery(){return <section id="fieldwork" className="section profile-gallery"><div className="section-head"><div><div className="eyebrow mono">Selected fieldwork / 01—06</div><h2>Perspective<br/><span style={{color:'var(--blue)'}}>from the ground.</span></h2></div><p className="lead">Mountain corridors. Precision test tracks. Infrastructure after dark. Explore the places behind the engineering.</p></div><PhotoGallery photos={photos}/></section>}
