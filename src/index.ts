import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { products } from './schema';
import "dotenv/config"


const app = new Hono()
const db = drizzle(postgres(`${process.env.DATABASE_URL}`));

app.get('/', async (c) => {
  const result = await db.select().from(products); 
  return c.json({
    data: result
  })
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
