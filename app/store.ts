import {get,put,BlobPreconditionFailedError} from '@vercel/blob';
import {initialEntries,type Entry} from './content';

const contentPath='notebook/entries.json';
export function storageConfigured(){return !!(process.env.BLOB_READ_WRITE_TOKEN||process.env.BLOB_STORE_ID)}
async function readSaved(){
  const blob=await get(contentPath,{access:'private',useCache:false});
  if(!blob)return {records:[] as Entry[],etag:undefined};
  if(!blob.stream)throw new Error('Notebook storage returned an empty response.');
  const records=await new Response(blob.stream).json() as Entry[];
  if(!Array.isArray(records))throw new Error('Notebook storage is invalid.');
  return {records,etag:blob.blob.etag};
}
export async function entries(all=false):Promise<Entry[]>{
  if(!storageConfigured()){
    if(all)throw new Error('Connect a private Vercel Blob store to enable the editor.');
    return initialEntries.filter(e=>e.published===1);
  }
  const {records}=await readSaved();
  const merged=new Map(initialEntries.map(e=>[e.id,e]));
  for(const e of records)merged.set(e.id,e);
  return [...merged.values()].filter(e=>all||e.published===1).sort((a,b)=>b.updated.localeCompare(a.updated));
}
export async function saveEntry(entry:Entry){
  if(!storageConfigured())throw new Error('Connect a private Vercel Blob store before saving.');
  const {records,etag}=await readSaved();
  const merged=new Map(records.map(e=>[e.id,e]));
  merged.set(entry.id,entry);
  // Conditional writes prevent concurrent saves from overwriting another entry.
  await put(contentPath,JSON.stringify([...merged.values()]),{access:'private',contentType:'application/json',addRandomSuffix:false,allowOverwrite:!!etag,...(etag?{ifMatch:etag}:{}),cacheControlMaxAge:60});
}
export {BlobPreconditionFailedError};
