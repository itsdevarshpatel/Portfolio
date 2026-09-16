import {put} from '@vercel/blob';
import {storageConfigured} from '../../store';
import { isOwner, sameOrigin } from '../../owner';
export async function POST(request: Request) { if (!await isOwner() || !sameOrigin(request))
    return Response.json({ error: 'Editor access required.' }, { status: 403 }); const allowed = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'audio/mpeg', 'audio/wav', 'video/mp4', 'video/webm']; const type = request.headers.get('content-type') || ''; if (!allowed.includes(type))
    return Response.json({ error: 'Choose a JPG, PNG, WebP, PDF, MP3, WAV, MP4, or WebM file.' }, { status: 415 }); if (Number(request.headers.get('content-length')) > 4 * 1024 * 1024)
    return Response.json({ error: 'The attachment limit is 4 MB. Link to larger videos instead.' }, { status: 413 }); try {
    if (!storageConfigured())
        throw new Error('Storage unavailable');
    const reader = request.body?.getReader();
    if (!reader)
        throw new Error('Empty upload');
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
        const { value, done } = await reader.read();
        if (done)
            break;
        size += value.length;
        if (size > 4 * 1024 * 1024) {
            await reader.cancel();
            return Response.json({ error: 'The attachment limit is 4 MB.' }, { status: 413 });
        }
        chunks.push(value);
    }
    if (!size)
        throw new Error('Empty upload');
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
        bytes.set(chunk, offset);
        offset += chunk.length;
    }
    const id = crypto.randomUUID();
    await put('notebook/media/'+id,Buffer.from(bytes),{access:'private',addRandomSuffix:false,contentType:type});
    return Response.json({ url: '/api/media/' + id });
}
catch (error) {
    console.error(error);
    return Response.json({ error: 'Upload failed. Your entry has not been changed.' }, { status: 503 });
} }

