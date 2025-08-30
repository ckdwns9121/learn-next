export async function fetchBlog(id: string) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    cache: "force-cache",
  });
  const data = await response.json();
  return data;
}

export async function fetchBlogList() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "force-cache",
  });
  const data = await response.json();
  return data;
}
