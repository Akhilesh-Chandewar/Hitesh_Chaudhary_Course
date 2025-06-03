import { serve } from 'bun';

serve({
  port: 3000,
  fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === '/') {
      return new Response(JSON.stringify({ message: 'Hello from the server!' }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response('Not Found', { status: 404 });
    }
  },
});

console.log('Server is running on http://localhost:3000');
