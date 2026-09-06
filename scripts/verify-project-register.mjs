import assert from 'node:assert/strict';
import {chromium} from 'playwright';

// Run against an already-running local server; no form submissions or data writes.
const baseURL=process.env.SVJ_TEST_URL||'http://localhost:3001';
const executablePath=process.env.SVJ_CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser=await chromium.launch({executablePath,headless:true});
const errors=[];
function observe(page){page.on('pageerror',error=>errors.push(error.message));page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});}
async function checkLayout(page){
  assert.equal(await page.locator('main img').count(),0,'Projects content must remain image-free');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Horizontal overflow');
}
try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  observe(page);
  await page.goto(`${baseURL}/projects`,{waitUntil:'networkidle'});
  const entries=page.locator('.assignment-entry');
  assert.equal(await entries.count(),40);
  const notes=await entries.evaluateAll(items=>items.map(item=>({href:item.querySelector('a').getAttribute('href'),role:item.querySelector('.assignment-contribution>span:last-child').textContent})));
  assert.equal(new Set(notes.map(note=>note.href)).size,40);
  for(const [index,expected] of [26,8,4,2].entries()){
    await page.locator('.contribution-option').nth(index).click();
    await page.waitForFunction(count=>document.querySelectorAll('.assignment-entry').length===count,expected);
    assert.equal(await page.locator('.contribution-option').nth(index).getAttribute('aria-pressed'),'true');
    assert.match(await page.getByRole('status').innerText(),new RegExp(`^${expected} of 40`));
  }
  await page.getByRole('button',{name:'All contributions'}).click();
  await page.getByLabel('Find an assignment').fill('  proof  ');
  assert.equal(await entries.count(),4);
  await page.getByLabel('Sector',{exact:true}).selectOption('Industrial');
  assert.equal(await entries.count(),1);
  await page.getByLabel('Status in profile',{exact:true}).selectOption('On Going');
  assert.equal(await entries.count(),0);
  assert.equal(await page.getByRole('heading',{name:'No matching assignments.'}).count(),1);
  await page.getByRole('button',{name:'Show all assignments'}).click();
  assert.equal(await entries.count(),40);
  for(const width of [375,768,1440]){
    await page.setViewportSize({width,height:900});
    await checkLayout(page);
    const first=entries.nth(0).locator('summary');
    await first.focus();
    await page.keyboard.press('Enter');
    assert.equal(await entries.nth(0).getAttribute('open'),'');
    await entries.nth(1).locator('summary').click();
    assert.equal(await page.locator('.assignment-entry[open]').count(),1,'Only one assignment should be expanded');
    await checkLayout(page);
    await entries.nth(1).locator('summary').focus();
    await page.keyboard.press('Space');
    assert.equal(await page.locator('.assignment-entry[open]').count(),0);
  }
  await entries.nth(3).locator('summary').click();
  await entries.nth(3).getByRole('link',{name:'View assignment note'}).click();
  await page.waitForURL(`**${notes[3].href}`);
  assert.equal(await page.locator('.assignment-role-line p').innerText(),notes[3].role);
  await page.close();

  let next=0;
  await Promise.all([375,768,1440].map(async width=>{
    const detail=await browser.newPage({viewport:{width,height:900}});
    observe(detail);
    while(next<notes.length){
      const note=notes[next++];
      const response=await detail.goto(`${baseURL}${note.href}`,{waitUntil:'networkidle'});
      assert.equal(response.status(),200,note.href);
      await checkLayout(detail);
      assert.equal(await detail.locator('.assignment-role-line p').innerText(),note.role);
      assert.equal(await detail.locator('meta[property="og:image"]').count(),0);
      assert.equal(await detail.locator('meta[name="twitter:image"]').count(),0);
    }
    await detail.close();
  }));
  assert.deepEqual(errors,[],'Browser errors');
  console.log('PASS: 40 image-free assignment notes, preserved roles and URLs, contribution/search/sector/status filters, empty/reset states, keyboard accordions, mobile/tablet/desktop overflow, and no browser errors.');
}finally{await browser.close();}
