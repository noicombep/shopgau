import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../api/authApi';
import { Loading, Alert } from '../components/ui';
import { ProductCard } from '../components/product/ProductCard';
import BannerImg from '../components/layout/image/img2.jpg';



export function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productAPI.getAll({ limit: 8 });
        setProducts(data);
      } catch (error) {
        setAlert({
          type: 'error',
          message: 'Failed to load products',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
       <section
  className="relative w-full h-[480px] md:h-[650px] flex items-center justify-center text-white"
>
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: `url(${BannerImg})` }}
  ></div>

  {/* Overlay mờ */}
  <div className="absolute inset-0 bg-pink-300/50"></div>

  {/* Text Content */}
  <div className="relative text-center px-4 max-w-3xl">
    <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
      Welcome to MemoSoft 🧸
    </h1>
    <p className="text-xl text-white/90 mb-8 drop-shadow-md">
      Discover the coziest teddy bears 
    </p>
    <Link
      to="/products"
      className="bg-white text-primary-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
    >
      Shop Now
    </Link>
  </div>
</section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
{/* Why MemoSoft */}
<section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold mb-10 text-gray-900">
      Why Choose MemoSoft?
    </h2>

    <div className="grid md:grid-cols-3 gap-8">

      <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <img
          src="https://api.shopgau.store/images/bear4.jpg"
          alt="Soft Material"
          className="w-24 h-24 object-cover mx-auto mb-4 rounded-lg"
        />
        <h3 className="font-bold text-lg mb-2">Ultra Soft Material</h3>
        <p className="text-gray-600">
          Our teddy bears are made from premium cotton that feels incredibly
          soft and comforting.
        </p>
      </div>

      <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <img
          src="https://api.shopgau.store/images/bear6.jpg"
          alt="Cute Design"
          className="w-24 h-24 object-cover mx-auto mb-4 rounded-lg"
        />
        <h3 className="font-bold text-lg mb-2">Unique Cute Designs</h3>
        <p className="text-gray-600">
          Each teddy is designed to bring warmth, happiness, and a touch of
          magic to your room.
        </p>
      </div>

      <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <img
          src="https://api.shopgau.store/images/bear7.jpg"
          alt="Perfect Gift"
          className="w-24 h-24 object-cover mx-auto mb-4 rounded-lg"
        />
        <h3 className="font-bold text-lg mb-2">Perfect Gift</h3>
        <p className="text-gray-600">
          Perfect for birthdays, anniversaries, or simply making someone smile.
        </p>
      </div>

    </div>
  </div>
</section>

{/* How it works */}
<section className="py-16 bg-pink-50">
  <div className="max-w-6xl mx-auto px-4 text-center">

    <h2 className="text-3xl font-bold mb-12">
      Shopping Made Simple
    </h2>

    <div className="grid md:grid-cols-4 gap-8">

      <div>
        <div className="text-4xl mb-3">🧸</div>
        <h4 className="font-semibold">Choose a Teddy</h4>
        <p className="text-gray-600 text-sm">
          Browse our lovely collection of teddy bears.
        </p>
      </div>

      <div>
        <div className="text-4xl mb-3">🛒</div>
        <h4 className="font-semibold">Add to Cart</h4>
        <p className="text-gray-600 text-sm">
          Add your favorite bear to the shopping cart.
        </p>
      </div>

      <div>
        <div className="text-4xl mb-3">💳</div>
        <h4 className="font-semibold">Secure Checkout</h4>
        <p className="text-gray-600 text-sm">
          Pay easily with our secure checkout system.
        </p>
      </div>

      <div>
        <div className="text-4xl mb-3">📦</div>
        <h4 className="font-semibold">Fast Delivery</h4>
        <p className="text-gray-600 text-sm">
          Your teddy will arrive safely at your door.
        </p>
      </div>

    </div>
  </div>
</section>
{/* Trending Bears */}
<section className="py-16 bg-white">  
  <div className="max-w-7xl mx-auto px-4">

    <h2 className="text-3xl font-bold text-center mb-12">
      Trending Teddy Bears
    </h2>

    <div className="grid md:grid-cols-3 gap-6">

      <img
        src="https://api.shopgau.store/images/bear1.jpg"
        alt="Bear 1"
        className="w-full h-72 object-cover rounded-xl shadow-md hover:scale-105 transition"
      />

      <img
        src="https://api.shopgau.store/images/bear2.jpg"
        alt="Bear 2"
        className="w-full h-72 object-cover rounded-xl shadow-md hover:scale-105 transition"
      />

      <img
        src="https://api.shopgau.store/images/bear3.jpg"
        alt="Bear 3"
        className="w-full h-72 object-cover rounded-xl shadow-md hover:scale-105 transition"
      />

    </div>
  </div>
</section>
      {/* CTA Section */}
      <section className="bg-gray-100 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to find your perfect cuddle buddy?
          </h2>
          <Link
            to="/products"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-700 transition"
          >
            Browse All Products
          </Link>
        </div>
      </section>
    </div>
  );
}