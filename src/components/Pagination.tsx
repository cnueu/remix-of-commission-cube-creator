export default function Pagination() {
  const slides = ['01', '02', '03', '04', '05'];
  const activeSlide = 0;

  return (
    <div className="absolute bottom-32 lg:bottom-24 left-6 lg:left-12 z-40">
      <div className="flex items-center gap-6">
        {slides.map((slide, index) => (
          <button
            key={slide}
            className={`relative font-body text-sm transition-all duration-300 ${
              index === activeSlide 
                ? 'text-foreground' 
                : 'text-foreground/40 hover:text-foreground/70'
            }`}
          >
            {slide}
            {index === activeSlide && (
              <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-coral" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
