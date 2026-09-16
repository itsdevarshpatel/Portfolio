import {get} from '@vercel/blob';
import { entries } from '../../../store';
import { isOwner } from '../../../owner';
export async function GET(request: Request, { params }: {
    params: Promise<{
        id: string;
    }>;
}) { const { id } = await params; if (!/^[a-f0-9-]{36}$/.test(id))
    return new Response('Not found', { status: 404 }); try {
    if (!await isOwner() && !(await entries()).some(e => e.attachment === '/api/media/' + id))
        return new Response('Not found', { status: 404 });
    const object = await get('notebook/media/'+id,{access:'private',useCache:false});
    if (!object)
        return new Response('Not found', { status: 404 });
    return new Response(object.stream, { headers: { 'Content-Type': object.blob.contentType || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'private, no-store', 'Content-Security-Policy': "default-src 'none'; sandbox", 'Content-Length': String(object.blob.size) } });
}
catch (error) {
    console.error(error);
    return new Response('Attachment temporarily unavailable', { status: 503 });
} }
