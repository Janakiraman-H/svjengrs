import type {Metadata} from 'next';import AdminLogin from '../../../components/admin/AdminLogin';
export const metadata:Metadata={title:'Administration | SVJ',robots:{index:false,follow:false}};
export default function Login(){return <main><section className="page-hero admin-hero"><div className="eyebrow mono">Protected administration</div><h1>SVJ<br/><span style={{color:'var(--blue)'}}>enquiries.</span></h1></section><section className="section dark"><div className="form-shell"><AdminLogin/></div></section></main>}
