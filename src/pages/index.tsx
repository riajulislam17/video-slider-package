import { ProductGrid } from "@/components/ProductGrid";
import { mockProducts } from "@/data/mockProducts";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Home() {
  const renderContents = (product: Product) => {
    return (
      <>
        {/* md, lg */}
        <div className="hidden md:block">
          <div className="flex justify-between items-center gap-3 w-full my-1.5">
            <h3 className="text-medium font-semibold text-primary">
              {product.id} - {product.title}
            </h3>
            <div className=" font-semibold text-primary flex items-center gap-1">
              {product.currency}{" "}
              {(product?.discountPrice ?? 0) > 0 &&
              (product?.discountPrice ?? 0) < product.price ? (
                <div>
                  <span className="line-through text-gray-500 text-md">
                    {product.price}
                  </span>
                  <span className="text-gray-700 ml-2 text-xl">
                    {product.discountPrice}
                  </span>
                </div>
              ) : (
                <span className="text-gray-700 ml-2 text-xl">
                  {product.price}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* sm */}
        <div className="block md:hidden">
          <h3 className="text-medium font-semibold text-primary">
            {product.id} - {product.title}
          </h3>
          <div className=" font-semibold text-primary flex items-center gap-1">
            {product.currency}{" "}
            {(product?.discountPrice ?? 0) > 0 &&
            (product?.discountPrice ?? 0) < product.price ? (
              <div>
                <span className="line-through text-gray-500 text-md">
                  {product.price}
                </span>
                <span className="text-gray-700 ml-2 text-xl">
                  {product.discountPrice}
                </span>
              </div>
            ) : (
              <span className="text-gray-700 ml-2 text-xl">
                {product.price}
              </span>
            )}
          </div>
        </div>
      </>
    );
  };

  const renderButtons = (product: Product) => {
    return (
      <>
        {/* md, lg */}
        <div className="hidden md:block">
          <div className="flex justify-between items-center gap-3 w-full my-1.5">
            <button
              className="bg-gray-300 text-center py-2 w-[30%] text-md rounded cursor-pointer"
              id={product.id}
              onClick={() => console.log(`Add to Cart`, product.id)}
            >
              Add to Cart
            </button>

            <button
              className="bg-gray-300 text-center py-2 w-[70%] text-md rounded cursor-pointer"
              id={product.id}
              onClick={() => console.log(`Buy Now`, product.id)}
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* sm */}
        <div className="block md:hidden">
          <div className="flex flex-col gap-3 w-full my-1.5">
            <button
              className="bg-gray-300 text-center py-2 text-md rounded cursor-pointer"
              id={product.id}
              onClick={() => console.log(`Add to Cart`, product.id)}
            >
              Add to Cart
            </button>

            <button
              className="bg-gray-300 text-center py-2 text-md rounded cursor-pointer"
              id={product.id}
              onClick={() => console.log(`Buy Now`, product.id)}
            >
              Buy Now
            </button>
          </div>
        </div>
      </>
    );
  };

  const renderSectionHeader = ({
    handleNext,
    handlePrev,
    isSliding,
  }: {
    handleNext?: () => void;
    handlePrev?: () => void;
    isSliding?: boolean;
  }) => (
    <div className="flex justify-between items-center gap-4 my-4">
      {isSliding && (
        <div className="flex gap-2">
          <button
            className="p-3 bg-gray-300 text-black cursor-pointer rounded-full"
            onClick={handlePrev}
          >
            <ArrowLeft />
          </button>
          <button
            className="p-3 bg-gray-300 text-black cursor-pointer rounded-full"
            onClick={handleNext}
          >
            <ArrowRight />
          </button>
        </div>
      )}

      <h1 className="text-2xl font-bold text-center underline uppercase">
        Video Products
      </h1>
    </div>
  );

  return (
    <>
      <div className="">
        <div className="p-5 md:p-10 lg:px-20">
          <ProductGrid
            products={mockProducts}
            layout={{
              desktop: { column: 4, row: 1 },
              tablet: { column: 3, row: 2 },
              mobile: { column: 2, row: 2 },
            }}
            maxItems={7}
            videoConfig={{
              autoplay: true,
              mute: true,
              loop: false,
              controls: true,
              modestBranding: false,
              rel: false,
              showInfo: false,
              facebookAllowFullscreen: true,
              show_text: false,
            }}
            contents={(product) => renderContents(product)}
            buttons={(product) => renderButtons(product)}
            sectionHeader={renderSectionHeader}
            slide={true}
            slideInterval={10000}
            sliderDirection={"backward"}
          />
        </div>
      </div>
    </>
  );
}
