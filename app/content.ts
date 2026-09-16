export type Entry = {
    id: string;
    kind: string;
    title: string;
    summary: string;
    body: string;
    url: string;
    attachment: string;
    published: number;
    updated: string;
};
export const kinds: Record<string, {
    title: string;
    description: string;
}> = { work: { title: 'Selected work', description: 'Software, infrastructure, and the decisions that connect them.' }, lab: { title: 'The Lab', description: 'Models, experiments, and questions worth testing.' }, notes: { title: 'Field Notes', description: 'Essays, observations, and ideas in progress.' }, shelf: { title: 'The Shelf', description: 'Books, papers, and things worth returning to.' }, studio: { title: 'The Studio', description: 'Writing, video editing in DaVinci Resolve, and sound design.' }, now: { title: 'Now', description: 'A small window into what I am doing and thinking about.' }, social: { title: 'Connect', description: 'Find me around the internet. Or simply say hello.' } };
const base = { url: '', attachment: '', published: 1, updated: '2026-09-15' };
export const initialEntries: Entry[] = [
    { ...base, id: 'streaming-platform', kind: 'work', title: 'Behind the play button', summary: 'Full-stack ownership at GEOFLIXZ+: React interfaces, APIs, and AWS infrastructure.', body: 'THE WORK\nAt GEOFLIXZ+, I owned the technical stack across React user interfaces, Node.js and Python APIs, and AWS services including S3, EC2, and Lambda.\n\nTHE CONNECTION\nThe role connected software delivery with data engineering. Alongside the application, I worked on automated ETL pipelines and a data warehouse using Redshift, Glue, and Athena.\n\nMAKING DATA USEFUL\nI delivered weekly presentations to the CEO using Tableau and Power BI, translating analytical findings into product and go-to-market discussions.\n\nMY TOOLKIT\nReact · Node.js · Python · AWS · Tableau · Power BI' },
    { ...base, id: 'data-in-motion', kind: 'work', title: 'From events to decisions', summary: 'Automated ETL pipelines and an AWS data warehouse supporting product analytics.', body: 'THE WORK\nI architected data pipelines at GEOFLIXZ+ using AWS Redshift, Glue, and Athena. The goal was to make product events available for analysis more quickly.\n\nTHE SYSTEM\nAutomated ETL connected incoming data with the warehouse. Python cohort analyses and dashboards helped translate that data into patterns a product team could discuss.\n\nTHE HUMAN LAYER\nA pipeline is only one part of the work. Presenting the findings to leadership connected the technical implementation to the decisions it was built to support.' },
    { ...base, id: 'churn-modeling', kind: 'lab', title: 'Looking for the signals before churn', summary: 'Predictive modeling and cohort analysis with Python and Scikit-learn at GEOFLIXZ+.', body: 'APPLIED MODELING\nAt GEOFLIXZ+, I built predictive churn models using Scikit-learn and conducted cohort analyses in Python. This work sat alongside product analytics and reporting.\n\nSCOPE OF THIS NOTE\nThis is an overview of my professional experience. It is not a published research result or a reproducible experiment. The dataset, validation setup, and model artifacts are not included here.\n\nWHAT COMES NEXT\nI want this notebook to hold technical investigations with explicit hypotheses, baselines, evaluations, and limitations. That is the standard I am building toward.' },
    { ...base, id: 'currently', kind: 'now', title: 'Building toward what comes next', summary: 'Software, AI engineering, and a creative practice that keeps asking new questions.', body: 'PROFESSIONAL DIRECTION\nI am looking for remote opportunities in AI development and engineering, bringing experience in full-stack software, cloud infrastructure, data engineering, and predictive modeling.\n\nCREATIVE PRACTICE\nContent creation, writing, video editing in DaVinci Resolve, and sound design are also part of what I do. I am open to creative projects and commissions.\n\nOFF THE CLOCK\nMy interests include Stoic philosophy, longevity research, astronomy, human behavior, and psychology. I journal, read, and follow questions across disciplines.' },
    { ...base, id: 'linkedin', kind: 'social', title: 'LinkedIn', summary: 'Experience, professional updates, and conversations.', body: '', url: 'https://www.linkedin.com/in/devarsh-p-3b005b22a/' }
];
