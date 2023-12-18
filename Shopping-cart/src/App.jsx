import { useState } from "react";
import "./App.css";

const intitalProduct = [
  {
    id: 5451,
    name: "Ibanez",
    price: 5000,
    image: "https://i.pravatar.cc/48?u=5451",
  },
  {
    id: 5488,
    name: "Gybsum",
    price: 50000,
    image: "https://i.pravatar.cc/48?u=5488",
  },
  {
    id: 5855,
    name: "Fender",
    price: 45000,
    image: "https://i.pravatar.cc/48?u=5855",
  },
  {
    id: 5458,
    name: "Cort",
    price: 15000,
    image: "https://i.pravatar.cc/48?u=5458",
  },
];
export default function App() {
  const [products, setProducts] = useState(intitalProduct);
  const [cartlist, setCartlist] = useState([]);

  function handleAddProduct(product) {
    setProducts((products) => [...products, product]);
  }
  function handleDelete(id) {
    setProducts((products) => products.filter((product) => product.id !== id));
  }
  function handleAddCartItem(id) {
    const selectedProduct = products.find((product) => product.id === id);
    if (selectedProduct && !cartlist.some((item) => item.id === id))
      setCartlist((list) => [...list, selectedProduct]);
  }

  return (
    <div>
      <h1 className="text-center text-xl font-bold">Shopping Cart</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4">
          <h1 className="text-center text-xl">Product</h1>
          <div className="mt-2">
            <ProductList
              product={products}
              onDeleteProduct={handleDelete}
              onAddToCart={handleAddCartItem}
            />
          </div>
        </div>
        <FormAddProduct onAddProduct={handleAddProduct} />
        <CartList cartlist={cartlist} />
      </div>
    </div>
  );
}
function Button({ children, onClick }) {
  return (
    <button className="p-2 border mt-2 mx-2" onClick={onClick}>
      {children}
    </button>
  );
}
function CartList({ cartlist }) {
  return (
    <div>
      <h1 className="text-xl text-center mb-4 ">Cart</h1>
      <ul className="border mt-2">
        {cartlist.map((item, index) => (
          <CartItem item={item} key={item.id} index={index} />
        ))}
      </ul>
    </div>
  );
}
function CartItem({ item, index }) {
  const [quantity, setQuantity] = useState(1);
  let totalPrice = item.price * quantity;
  return (
    <li className="grid grid-cols-5 gap-4 mt-4">
      <div className="">
        <p className="mx-2">{index + 1}</p>
      </div>
      <div>
        <img src={item.image} />
        <p>{item.name}</p>
      </div>

      <div>
        <p>{item.price}</p>
      </div>
      <div className="">
        <button onClick={() => setQuantity((q) => q + 1)}>+</button>
        <input
          className="w-[30px] border"
          type="text"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button onClick={() => setQuantity((q) => q - 1)}>-</button>
      </div>
      <p>{totalPrice}</p>
    </li>
  );
}
function ProductList({ product, onDeleteProduct, onAddToCart }) {
  return (
    <ul>
      {product.map((pro, index) => (
        <Product
          product={pro}
          key={pro.id}
          onDeleteProduct={onDeleteProduct}
          onAddToCart={onAddToCart}
        />
      ))}
    </ul>
  );
}
function Product({ product, onDeleteProduct, onAddToCart }) {
  return (
    <li className="border p-3 mb-4">
      <div className="flex ">
        <img src={product.image} alt="{product.name}" />
        <div className=" w-full px-5 py-2 flex justify-between">
          <div>
            <p>{product.name}</p>
          </div>
          <div>
            <strong>Price: ${product.price}</strong>
          </div>
        </div>
      </div>
      <div className="text-center mt-2">
        <Button onClick={() => onAddToCart(product.id)}>Add to Cart</Button>
        <Button onClick={() => onDeleteProduct(product.id)}>Delete</Button>
      </div>
    </li>
  );
}
function FormAddProduct({ onAddProduct }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=118836");
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !price || !image) return;
    const id = crypto.randomUUID();
    const newProduct = {
      id,
      name,
      image: `${image}?=${id}`,
      price,
    };
    onAddProduct(newProduct);
    setName("");
    setPrice("");
    setImage("https://i.pravatar.cc/48?u=118836");
  }
  return (
    <div className="p-5">
      <h1 className="text-xl text-center">Add Product</h1>
      <form className="mt-3 border p-4" onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="name">Product Name</label>
          <input
            className="border"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="name">Product Price</label>
          <input
            className="border"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="name">Product Image</label>
          <input
            className="border"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <Button>Submit</Button>
        </div>
      </form>
    </div>
  );
}
