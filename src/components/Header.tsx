import { Link } from 'react-router-dom';
import { ShoppingCart, Menu } from 'lucide-react';
import SnowCrystalLogo from './SnowCrystalLogo';

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-6 lg:px-12 py-6">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <SnowCrystalLogo size={36} className="text-foreground" />
          <span className="font-display text-2xl tracking-wider text-foreground">أبعاد</span>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-body text-foreground/80 hover:text-coral transition-colors uppercase tracking-widest">
            الرئيسية
          </Link>
          <Link to="/products" className="text-sm font-body text-foreground/60 hover:text-coral transition-colors uppercase tracking-widest">
            المتجر
          </Link>
          <a href="#" className="text-sm font-body text-foreground/60 hover:text-coral transition-colors uppercase tracking-widest">
            عن أبعاد
          </a>
          <a href="#" className="text-sm font-body text-foreground/60 hover:text-coral transition-colors uppercase tracking-widest">
            تواصل معنا
          </a>
        </nav>

        {/* Cart & Mobile Menu */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="flex items-center gap-2 text-foreground/80 hover:text-coral transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span className="font-display text-lg">٢</span>
          </Link>
          <button className="md:hidden text-foreground/80 hover:text-coral transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
