import React, { useState } from "react";
import { ProductCard } from "./ProductCard";
import { getResponsiveGridCols } from "@/utils/layoutGenerate";
import { ProductModal } from "./ProductModal";
import { useDeviceType } from "@/hooks/useDeviceType";
import { useSlider } from "@/hooks/useSlider";

interface Props {
  products: Product[];
  layout: {
    desktop: { column: number; row: number };
    tablet: { column: number; row: number };
    mobile: { column: number; row: number };
  };
  maxItems: number;
  slide?: boolean;
  slideInterval?: number;
  videoConfig?: Partial<VideoConfig>;
  contents?: (product: Product) => React.ReactNode;
  buttons?: (product: Product) => React.ReactNode;
  sectionHeader?: (params: {
    handleNext?: () => void;
    handlePrev?: () => void;
    isSliding?: boolean;
  }) => React.ReactNode;
  sliderDirection: "forward" | "backward";
}

export const ProductGrid: React.FC<Props> = ({
  products,
  layout,
  maxItems,
  slide = false,
  slideInterval = 3000,
  videoConfig,
  contents,
  buttons,
  sectionHeader,
  sliderDirection = "forward",
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const device = useDeviceType();
  const { column, row } = layout[device];
  const windowSize = column * row;

  const slicedProducts = products.slice(0, maxItems);

  const { visibleItems, handleNext, handlePrev, isSliding } = useSlider(
    slicedProducts,
    windowSize,
    slide,
    slideInterval,
    activeIndex !== null,
    sliderDirection
  );

  const colClasses = getResponsiveGridCols(layout);

  return (
    <>
      <div>
        {sectionHeader && sectionHeader({ handleNext, handlePrev, isSliding })}

        <div className="overflow-hidden">
          <div className={`grid ${colClasses} gap-5 md:gap-8 `}>
            {visibleItems.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                videoConfig={videoConfig}
                contents={contents ? contents(product) : undefined}
                buttons={buttons ? buttons(product) : undefined}
                onExpand={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {activeIndex !== null && (
        <ProductModal
          products={visibleItems}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          contents={contents}
          buttons={buttons}
        />
      )}
    </>
  );
};
