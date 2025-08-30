export default function NewsPage({ params }: { params: { slug: string[] } }) {
  return <div>NewsPage {params.slug.join("/")}</div>;
}
