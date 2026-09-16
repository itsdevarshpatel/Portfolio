'use client';
export default function ErrorPage({ reset }: {
    reset: () => void;
}) { return <main className="collection"><h1>A brief pause.</h1><p>This page could not load. Your saved notebook entries are not affected.</p><button className="solid" onClick={reset}>Try again</button> <a href="/">Return home</a></main>; }
