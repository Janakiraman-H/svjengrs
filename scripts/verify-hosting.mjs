import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const baseURL=process.env.SVJ_TEST_URL||'http://localhost:8787';
const origin='https://svjengrs.com';
const sitemap=await fetch(`${baseURL}/sitemap.xml`);
assert.equal(sitemap.status,200);
const xml=await sitemap.text();
const urls=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match=>match[1]);
assert.equal(urls.length,45);
assert.ok(urls.every(url=>url===origin||url.startsWith(`${origin}/`)));
const robots=await fetch(`${baseURL}/robots.txt`);
assert.match(await robots.text(),/Sitemap: https:\/\/svjengrs\.com\/sitemap\.xml/);
for(const path of ['/','/about','/projects','/consultation','/privacy']){
  const response=await fetch(`${baseURL}${path}`);
  assert.equal(response.status,200,path);
  const html=await response.text();
  assert.ok(html.includes(`rel="canonical" href="${origin}${path==='/'?'':path}"`),`${path} canonical`);
  assert.ok(!html.includes('svjengineers.com'));
  assert.equal(response.headers.get('x-content-type-options'),'nosniff');
}
const admin=await fetch(`${baseURL}/admin`,{redirect:'manual'});
assert.equal(admin.status,307);
assert.ok(admin.headers.get('location').endsWith('/admin/login'));
const missing=await fetch(`${baseURL}/projects/not-a-real-assignment`);
assert.equal(missing.status,404);
// Wrangler normalizes incoming Host headers. To test www locally, run a second
// preview with --local-upstream www.svjengrs.com and supply its local URL here.
if(process.env.SVJ_WWW_TEST_URL){
  const redirect=await fetch(`${process.env.SVJ_WWW_TEST_URL}/projects?test=1`,{redirect:'manual'});
  assert.equal(redirect.status,308);
  assert.equal(redirect.headers.get('location'),`${origin}/projects?test=1`);
}
// Opt-in only: verifies a LOCAL production preview with no database credentials.
// Never run the valid submission against a configured or public deployment.
if(process.env.SVJ_EXPECT_UNCONFIGURED==='1'){
  assert.ok(['localhost','127.0.0.1'].includes(new URL(baseURL).hostname));
  const before=await readFile('data/inquiries.ndjson','utf8').catch(()=>null);
  const result=await fetch(`${baseURL}/api/inquiries`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:'Local deployment test',company:'Test only',email:'test@example.com',consultation_type:'Design',project_location:'Test',project_stage:'Planning',message:'Unconfigured local production runtime must reject this request.'})});
  assert.equal(result.status,503,'Unconfigured production must fail closed');
  assert.match((await result.json()).error,/svjengrs@gmail.com/);
  assert.equal(await readFile('data/inquiries.ndjson','utf8').catch(()=>null),before);
  const login=await fetch(`${baseURL}/api/admin/login`,{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'});
  assert.equal(login.status,503);
}
console.log('PASS: domain metadata, 45 sitemap URLs, robots, security header, admin protection and 404. Optional www redirect and unconfigured-production checks passed if enabled.');
