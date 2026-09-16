// Intentionally empty by default.
// Add Drizzle tables here when the site actually needs a database.
// See examples/d1/db/schema.ts for an opt-in example.
import {sqliteTable,text,integer} from 'drizzle-orm/sqlite-core';
export const entries=sqliteTable('entries',{id:text('id').primaryKey(),kind:text('kind').notNull(),title:text('title').notNull(),summary:text('summary').notNull(),body:text('body').notNull(),url:text('url').notNull(),attachment:text('attachment').notNull(),published:integer('published').notNull().default(0),updated:text('updated').notNull()});
