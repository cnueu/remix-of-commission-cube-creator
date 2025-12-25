import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';

const cartItems = [
  { id: 'cube-teal', name: 'Teal Cube', price: 49, quantity: 1, shape: 'cube', color: '#1f9d8a' },
  { id: 'hex-gold', name: 'Golden Hexagon', price: 79, quantity: 2, shape: 'hexagon', color: '#d4a53c' },
];

export default function Cart() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 12;
  const total = subtotal + shipping;

  return (
    <>
      <Helmet>
        <title>Your Cart | ARTCUBE</title>
        <meta name="description" content="Review your cart and complete your purchase of premium 3D shapes." />
      </Helmet>

      <div className="min-h-screen bg-hero-gradient">
        <Header />
        
        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse-glow" />
        </div>

        <main className="relative z-10 container mx-auto px-6 pt-32 pb-20">
          <h1 className="font-display text-5xl md:text-7xl text-foreground mb-12 opacity-0 animate-slide-up" style={{ animationFillMode: 'forwards' }}>
            YOUR CART
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg mb-6">Your cart is empty</p>
              <Link to="/products">
                <Button variant="coral">Browse Collection</Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item, index) => (
                  <div 
                    key={item.id}
                    className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-lg p-6 flex gap-6 opacity-0 animate-slide-up"
                    style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: 'forwards' }}
                  >
                    {/* Shape Preview */}
                    <div className="w-24 h-24 flex items-center justify-center flex-shrink-0">
                      <div 
                        className={`w-16 h-16 ${item.shape === 'cube' ? 'rotate-45' : ''}`}
                        style={{
                          background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)`,
                          clipPath: item.shape === 'hexagon' 
                            ? 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                            : 'none',
                          boxShadow: `0 0 30px ${item.color}44`
                        }}
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs uppercase tracking-wider text-muted-foreground">{item.shape}</span>
                          <h3 className="font-display text-2xl text-foreground">{item.name}</h3>
                        </div>
                        <button className="text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-3 bg-background/30 rounded-full px-2 py-1">
                          <button className="p-1 hover:text-primary transition-colors">
                            <Minus size={16} />
                          </button>
                          <span className="font-display text-lg w-8 text-center">{item.quantity}</span>
                          <button className="p-1 hover:text-primary transition-colors">
                            <Plus size={16} />
                          </button>
                        </div>
                        <span className="font-display text-2xl text-highlight">${item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div 
                className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-lg p-6 h-fit opacity-0 animate-slide-up"
                style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
              >
                <h2 className="font-display text-2xl text-foreground mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-foreground/70">
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-foreground/70">
                    <span>Shipping</span>
                    <span>${shipping}</span>
                  </div>
                  <div className="border-t border-border/30 pt-4 flex justify-between">
                    <span className="font-display text-xl text-foreground">Total</span>
                    <span className="font-display text-2xl text-highlight">${total}</span>
                  </div>
                </div>

                <Button variant="coral" size="lg" className="w-full mb-4">
                  Checkout
                </Button>
                
                <Link to="/products" className="block text-center text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
