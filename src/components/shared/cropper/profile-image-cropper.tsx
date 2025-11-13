"use client";

import dynamic from "next/dynamic";
import { useRef, useCallback } from "react";
import { X } from "lucide-react";
import type { CropperRef } from "react-advanced-cropper";

import "react-advanced-cropper/dist/style.css";

const Cropper = dynamic(
  () => import("react-advanced-cropper").then((mod) => mod.Cropper),
  { ssr: false }
);

interface Props {
  image: string;
  onComplete: (cropped: string) => void;
  onCancel: () => void;
}

export default function ProfileImageCropper({ image, onComplete, onCancel }: Props) {
  const cropperRef = useRef<CropperRef | null>(null);

  // Save the reference the cropper gives us
  const handleCropperRef = (ref: CropperRef | null) => {
    cropperRef.current = ref;
  };

  // Handle Done (extract cropped result)
  const handleDone = useCallback(() => {
    if (!cropperRef.current) return;

    const canvas = cropperRef.current.getCanvas();

    if (!canvas) {
      console.warn("Cropper returned no canvas");
      return;
    }

    const croppedImage = canvas.toDataURL("image/jpeg", 0.92);
    onComplete(croppedImage);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-xl w-full max-w-lg overflow-hidden relative">

        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700"
        >
          <X size={22} />
        </button>

        {/* Cropper container */}
        <div className="w-full h-[380px] bg-black">
          <Cropper
            src={image}
            ref={handleCropperRef as any}
            className="w-full h-full"
            stencilProps={{
              aspectRatio: 1,
              movable: true,
              resizable: true,
              lines: true,
              handlerComponent: undefined,
            }}
            backgroundClassName="bg-black"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 p-4 border-t border-neutral-200 dark:border-neutral-700">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleDone}
            className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
