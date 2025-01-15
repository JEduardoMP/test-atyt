import { Product } from '../types/Product';

interface Props {
  products: Product[];
  onProductSelect: (id: number) => void;
}

export default function ProductList({ products, onProductSelect }: Props) {
  return (
    <ul className="space-y-4">
      {products.map((product) => (
        <li
          key={product.id}
          className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer transition duration-150 ease-in-out"
          onClick={() => onProductSelect(product.id)}
        >
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <p className="text-gray-600">${product.price.toFixed(2)}</p>
        </li>
      ))}
    </ul>
  );
};