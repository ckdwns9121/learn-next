import Link from "next/link";

export default function ShopPage() {
  return (
    <div>
      ShopListPage
      <Link href="/shop/1">Shop1</Link>
      <Link href="/shop/2">Shop2</Link>
      <Link href="/shop/3">Shop3</Link>
    </div>
  );
}
