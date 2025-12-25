import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function SocialLinks() {
  return (
    <div className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-6">
      <a 
        href="#" 
        className="w-10 h-10 rounded-full border border-foreground/30 flex items-center justify-center text-foreground/60 hover:text-coral hover:border-coral transition-all duration-300"
      >
        <Facebook className="w-4 h-4" />
      </a>
      <a 
        href="#" 
        className="w-10 h-10 rounded-full border border-foreground/30 flex items-center justify-center text-foreground/60 hover:text-coral hover:border-coral transition-all duration-300"
      >
        <Twitter className="w-4 h-4" />
      </a>
      <a 
        href="#" 
        className="w-10 h-10 rounded-full border border-foreground/30 flex items-center justify-center text-foreground/60 hover:text-coral hover:border-coral transition-all duration-300"
      >
        <Instagram className="w-4 h-4" />
      </a>
    </div>
  );
}
