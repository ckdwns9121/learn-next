type ShopPageProps = {
  params: {
    id: string;
  };
};

export default function ShopPage({ params }: ShopPageProps) {
  return <div>ShopPage {params.id}</div>;
}
