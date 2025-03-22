import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TestImages() {
  // Array of Unsplash images to test
  const testImages = [
    {
      id: 1,
      name: 'Monstera',
      url: 'https://images.unsplash.com/photo-1614594575117-20703e5eb57d?q=80&w=687&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Snake Plant',
      url: 'https://images.unsplash.com/photo-1593482892290-f54227de2536?q=80&w=687&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'Fiddle Leaf Fig',
      url: 'https://images.unsplash.com/photo-1597055181449-b73ea9417f0d?q=80&w=774&auto=format&fit=crop'
    },
    {
      id: 4,
      name: 'Peace Lily',
      url: 'https://images.unsplash.com/photo-1567689265664-1c48de61db0d?q=80&w=687&auto=format&fit=crop'
    }
  ];

  // Category images to test
  const categoryImages = [
    {
      id: 1,
      name: 'Indoor Plants',
      url: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Outdoor Plants',
      url: 'https://images.unsplash.com/photo-1631260955243-ae2b05a46827?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'Succulents',
      url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 4,
      name: 'Herbs',
      url: 'https://images.unsplash.com/photo-1580852300654-2d5b9d8999c2?q=80&w=800&auto=format&fit=crop'
    }
  ];

  return (
    <div>
      <Head>
        <title>Image Test Page | Plant Marketplace</title>
      </Head>

      <Header />

      <main className="py-10 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Image Test Page</h1>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Direct &lt;img&gt; Tags</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testImages.map(image => (
                <div key={image.id} className="bg-white rounded-lg shadow-md p-4">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                    <img 
                      src={image.url} 
                      alt={image.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error(`Error loading image: ${image.url}`);
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/300x200?text=Error+Loading+Image';
                      }}
                    />
                  </div>
                  <p className="text-lg font-medium text-center">{image.name}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Using Background Images with Inline Styles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryImages.map(category => (
                <div key={category.id} className="rounded-lg shadow-md overflow-hidden">
                  <div 
                    className="h-48 bg-gray-200 relative"
                    style={{
                      backgroundImage: `url('${category.url}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                      <div className="p-4 w-full">
                        <h3 className="text-xl font-bold text-white">{category.name}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Fallback Images</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                  <span className="text-gray-500">Placeholder Image</span>
                </div>
                <p className="text-lg font-medium text-center">Fallback Example</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src="https://this-url-does-not-exist.com/image.jpg" 
                    alt="Invalid URL" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error(`Error loading invalid image`);
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/300x200?text=Invalid+URL';
                    }}
                  />
                </div>
                <p className="text-lg font-medium text-center">Invalid URL Test</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
} 