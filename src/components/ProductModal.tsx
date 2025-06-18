import React, { useEffect, useRef, useState } from "react";
import { ChevronUp, ChevronDown, X } from "lucide-react";
import { VideoPlayer } from "./VideoPlayer";

interface ExpandedProductModalProps {
  products: Product[];
  activeIndex: number;
  onClose: () => void;
  videoConfig?: Partial<VideoConfig>;
  contents?: (product: Product) => React.ReactNode;
  buttons?: (product: Product) => React.ReactNode;
}

export const ProductModal: React.FC<ExpandedProductModalProps> = ({
  products,
  activeIndex,
  onClose,
  videoConfig,
  contents,
  buttons,
}) => {
  const [index, setIndex] = useState(activeIndex);
  const touchStartY = useRef<number | null>(null);

  const product = products[index];

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (deltaY > 50 && index > 0) setIndex(index - 1);
    else if (deltaY < -50 && index < products.length - 1) setIndex(index + 1);
    touchStartY.current = null;
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/90 h-screen w-screen flex justify-center items-center transition-opacity"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Close button (top-left) */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-50 text-white cursor-pointer" //hidden md:block
        >
          <X size={40} />
        </button>

        {/* Prev/Next buttons (center right) */}
        <div className="hidden md:flex flex-col absolute right-4 top-1/2 -translate-y-1/2 z-50 space-y-3">
          {index > 0 && (
            <button
              onClick={() => setIndex(index - 1)}
              className="p-3 bg-white/20 rounded-full hover:bg-white/20 cursor-pointer"
            >
              <ChevronUp className="text-white" size={40} />
            </button>
          )}
          {index < products.length - 1 && (
            <button
              onClick={() => setIndex(index + 1)}
              className="p-3  bg-white/20 rounded-full hover:bg-white/20 cursor-pointer"
            >
              <ChevronDown className="text-white" size={40} />
            </button>
          )}
        </div>

        {/* Centered Card */}
        <div
          key={index}
          className={`w-full max-w-lg md:max-w-2xl h-full max-h-screen flex flex-col items-center bg-black text-white overflow-hidden rounded shadow-lg transform transition-transform duration-300 ease-in-out`}
        >
          {/* Video Section */}
          <div className="relative flex-grow w-full flex items-center justify-center bg-black">
            <VideoPlayer
              videoUrl={product.videoUrl}
              videoConfig={videoConfig}
            />
          </div>

          {/* Content Section */}
          <div className="p-4 space-y-3 w-full bg-black/30">
            {contents && contents(product)}
            {buttons && buttons(product)}
          </div>
        </div>
      </div>
    </>
  );
};
