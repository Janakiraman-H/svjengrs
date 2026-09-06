import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Run against the Data folder of the unzipped, supplied Pages document.
const source = process.argv[2];
if (!source) throw new Error('Supply the extracted Pages Data directory.');
const output = path.resolve('public/images/projects/photography');
await fs.mkdir(output, {recursive:true});
const images = [
  ['image2-33.jpeg','munnar-bodimettu-highway'],
  ['image3-35.png','munnar-bodimettu-toll-plaza'],
  ['image4-37.jpeg','shenkotta-punalur-corridor'],
  ['image5-39.jpeg','kumbakonam-mannargudi-highway'],
  ['image6-41.jpeg','mmst-karting-day'],
  ['image7-43.png','mmst-karting-night'],
  ['image8-45.jpeg','hero-jaipur-design'],
  ['image9-47.jpeg','musiri-namakkal-highway'],
  ['image10-49.jpeg','kutheripettu-vup-deck'],
  ['image11-51.png','munnar-bodimettu-tea-estates',{left:756,top:300,width:408,height:508}],
  ['image12-53.png','munnar-bodimettu-hairpin',{left:425,top:204,width:525,height:654}],
  ['image13-55.jpeg','kutheripettu-vup-night'],
  ['image15-59.png','renault-nissan-high-speed-track',{left:19,top:20,width:1221,height:889}],
  ['image17-63.jpeg','zf-automotive-test-track'],
];
const manifest=[];
for(const [original,name,crop] of images){
  let pipeline=sharp(path.join(source,original)).rotate();
  if(crop) pipeline=pipeline.extract(crop);
  const result=await pipeline.webp({quality:88,effort:6}).toFile(path.join(output,name+'.webp'));
  manifest.push({original,asset:'/images/projects/photography/'+name+'.webp',crop:crop??null,width:result.width,height:result.height,bytes:result.size});
}
console.log(JSON.stringify(manifest,null,2));
