import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import GLBModel from '@/components/GLBModel';

const products: Record<string, {
  name: string;
  price: number;
  shape: 'cube' | 'hexagon';
  color: string;
  description: string;
  features: string[];
}> = {
  'cube-teal': {
    name: 'Teal Cube',
    price: 49,
    shape: 'cube',
    color: '#1f9d8a',
    description: 'A stunning teal cube with perfect edges and mesmerizing depth. This geometric masterpiece captures light beautifully and adds a modern touch to any space.',
    features: ['Hand-polished edges', 'Premium resin material', '5cm dimensions', 'Display stand included']
  },
  'cube-coral': {
    name: 'Coral Cube',
    price: 59,
    shape: 'cube',
    color: '#e85a4f',
    description: 'Vibrant coral cube that brings warmth and energy to any space. The rich coral tone creates an inviting atmosphere.',
    features: ['Warm coral finish', 'Light-reactive surface', '5cm dimensions', 'Gift box packaging']
  },
  'hex-magenta': {
    name: 'Magenta Hexagon',
    price: 69,
    shape: 'hexagon',
    color: '#e84393',
    description: 'Bold magenta hexagon with geometric perfection and striking presence. A statement piece for modern interiors.',
    features: ['Six perfect sides', 'Metallic sheen', '6cm width', 'Certificate of authenticity']
  },
  'hex-gold': {
    name: 'Golden Hexagon',
    price: 79,
    shape: 'hexagon',
    color: '#d4a53c',
    description: 'Luxurious golden hexagon radiating elegance and sophistication. The ultimate collector piece.',
    features: ['24k gold-infused', 'Premium weight', '6cm width', 'Velvet display case']
  },
  'cube-magenta': {
    name: 'Magenta Cube',
    price: 55,
    shape: 'cube',
    color: '#e84393',
    description: 'Electric magenta cube with modern aesthetics and bold character. Perfect for contemporary spaces.',
    features: ['Vibrant pigment', 'UV-resistant', '5cm dimensions', 'Artist signed']
  },
  'hex-teal': {
    name: 'Teal Hexagon',
    price: 65,
    shape: 'hexagon',
    color: '#1f9d8a',
    description: 'Serene teal hexagon bringing calm and balance to your collection. Inspired by ocean depths.',
    features: ['Calming teal tone', 'Translucent edges', '6cm width', 'Floating mount included']
  },
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = id ? products[id] : null;

  if (!product) {
    return (
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-foreground mb-4">Product Not Found</h1>
          <Link to="/products" className="text-primary hover:underline">Back to Products</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.name} | ARTCUBE</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="min-h-screen bg-hero-gradient">
        <Header />
        
        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 right-1/3 w-96 h-96 rounded-full blur-3xl animate-pulse-glow" 
               style={{ background: `${product.color}22` }} />
        </div>

        <main className="relative z-10 container mx-auto px-6 pt-32 pb-20">
          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Collection
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 3D Preview */}
            <div className="relative h-[400px] lg:h-[500px] opacity-0 animate-slide-in-left" style={{ animationFillMode: 'forwards' }}>
              <div className="absolute inset-0 animate-float">
                <GLBModel color={product.color} interactive={true} />
              </div>
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl -z-10"
                style={{ background: `${product.color}44` }}
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6 opacity-0 animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              <div>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">{product.shape}</span>
                <h1 className="font-display text-5xl md:text-6xl text-foreground mt-2">{product.name}</h1>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-display text-4xl text-highlight">${product.price}</span>
                <span className="text-muted-foreground">USD</span>
              </div>

              <p className="text-foreground/80 text-lg leading-relaxed">{product.description}</p>

              <ul className="space-y-2">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground/70">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex gap-4 pt-4">
                <Button variant="coral" size="lg" className="flex-1">
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg" className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground">
                  Save
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
