import { env } from 'cloudflare:workers';
import { initialEntries, type Entry } from './content';
export function database() { if (!env.DB)
    throw new Error('Notebook database unavailable'); return env.DB; }
export async function entries(all = false): Promise<Entry[]> { const result = await database().prepare('SELECT * FROM entries ORDER BY updated DESC').all<Entry>(); const merged = new Map(initialEntries.map(e => [e.id, e])); for (const e of result.results)
    merged.set(e.id, e); return [...merged.values()].filter(e => all || e.published === 1).sort((a, b) => b.updated.localeCompare(a.updated)); }
