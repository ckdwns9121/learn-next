import { fetchBlogList, fetchBlog } from "@/lib/fetchBlog";
interface Props {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const data = await fetchBlogList();
  return data.map((item: any) => ({ id: item.id.toString() }));
}

async function getBlogData(id: string) {
  const response = await fetchBlog(id);
  const data = await response;
  return data;
}

export default async function BlogPage({ params }: Props) {
  const data = await getBlogData(params.id);
  return <div>BlogPage {data.title}</div>;
}
