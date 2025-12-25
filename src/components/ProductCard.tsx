import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import GLBModel from './GLBModel';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  shape: 'cube' | 'hexagon';
  color: string;
  description: string;
}

export default function ProductCard({ id, name, price, shape, color, description }: ProductCardProps) {
  const shapeLabel = shape === 'cube' ? 'مكعب' : 'سداسي';
  
  return (
    <div className="group bg-card/50 backdrop-blur-sm border border-border/30 rounded-lg p-6 transition-all duration-300 hover:shadow-glow-coral hover:border-coral/50">
      {/* 3D Shape Preview - Interactive */}
      <div className="relative h-48 mb-4">
        <GLBModel color={color} interactive={true} />
        <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
          اسحب للتدوير
        </p>
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">{shapeLabel}</span>
          <span className="text-highlight font-display text-xl">${price}</span>
        </div>
        <h3 className="font-display text-2xl text-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        
        <div className="flex gap-3 pt-2">
          <Link to={`/product/${id}`} className="flex-1">
            <Button variant="outline" className="w-full border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground">
              عرض التفاصيل
            </Button>
          </Link>
          <Button variant="coral" className="flex-1">
            أضف للسلة
          </Button>
        </div>
      </div>
    </div>
  );
}
