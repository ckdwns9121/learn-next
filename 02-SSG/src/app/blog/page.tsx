import Link from "next/link";
import { fetchBlogList } from "@/lib/fetchBlog";

async function getBlogData() {
  const data = await fetchBlogList();
  return data;
}

export default async function BlogPage() {
  const data = await getBlogData();

  return (
    <div>
      {data.map((item: any) => (
        <div key={item.id}>
          <Link href={`/blog/${item.id}`}>{item.title}</Link>
          <p>{item.body}</p>
        </div>
      ))}
    </div>
  );
}
