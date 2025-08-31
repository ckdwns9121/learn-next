export async function GET(request: Request) {
  return new Response("Hello World");
}

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  return new Response("Hello World");
}

export async function PUT(request: Request) {
  return new Response("Hello World");
}

export async function DELETE(request: Request) {
  return new Response("Hello World");
}
