import { Elysia } from 'elysia'

const app = new Elysia()
  .get('/api', () => 'Hello, Bun!')
  .listen(3000)

console.log('Elysia server is running on http://localhost:3000')
