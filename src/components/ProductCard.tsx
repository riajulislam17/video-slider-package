import React from "react";
import { mergeVideoConfig } from "../utils/videoConfig";
import { Maximize } from "lucide-react";
import { VideoPlayer } from "./VideoPlayer";

interface Props {
  product: Product;
  slide?: boolean;
  contents?: React.ReactNode;
  buttons?: React.ReactNode;
  videoConfig?: Partial<VideoConfig>;
  onExpand: () => void;
}

export const ProductCard: React.FC<Props> = ({
  product,
  slide = false,
  contents,
  buttons,
  videoConfig,
  onExpand,
}) => {
  const finalConfig = mergeVideoConfig(videoConfig);

  return (
    <>
      <div
        className={`flex flex-col rounded overflow-hidden 
    ${slide ? "min-w-[250px] max-w-sm" : "w-full"}
  `}
      >
        {/* Video area with aspect ratio */}
        <div className="relative aspect-[4/] md:aspect-[5/7] w-full bg-black flex items-center justify-center">
          <VideoPlayer videoUrl={product.videoUrl} videoConfig={finalConfig} />

          <button
            className="absolute top-0 right-0 text-white p-1 rounded cursor-pointer"
            onClick={onExpand}
            aria-label="Expand video"
          >
            <Maximize />
          </button>
        </div>

        {/* Bottom Content */}
        <div className="flex flex-col">
          {contents && <div>{contents}</div>}
          {buttons && <div>{buttons}</div>}
        </div>
      </div>
    </>
  );
};
