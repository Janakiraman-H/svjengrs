import {createHash,timingSafeEqual} from 'node:crypto';
export const adminCookie='svj_admin_session';
function digest(value:string){return createHash('sha256').update(value).digest('hex')}
export function expectedToken(){const password=process.env.ADMIN_PASSWORD;const secret=process.env.ADMIN_SESSION_SECRET;if(!password||!secret)return null;return digest(`${password}:${secret}`)}
export function passwordMatches(candidate:string){const expected=process.env.ADMIN_PASSWORD;if(!expected)return false;const a=Buffer.from(digest(candidate));const b=Buffer.from(digest(expected));return timingSafeEqual(a,b)}
