import { Product } from "../types/Product";


interface Props {
  product: Product;
}

export default function ProductDetails ({ product }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <img src={product.image || "/placeholder.svg"} alt={product.title} className="w-full h-64 object-contain mb-4" />
      <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-xl font-semibold mb-2">${product.price.toFixed(2)}</p>
      <p className="text-sm text-gray-500">Category: {product.category}</p>
    </div>
  );
};
