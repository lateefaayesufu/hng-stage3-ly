// app/category/[products]/page.jsx
import ProductClientPage from "./ProductClientPage"

export default async function ProductsPage({ params }) {
  const resolvedParams = await params // unwrap the Promise
  return <ProductClientPage productsCategory={resolvedParams.products} />
}
