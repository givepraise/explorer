"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

const blurImage = "/img/blur.png";
const fallbackImage = "/img/icon.svg";

type ImageWithFallbackProps = {
  fallback?: string;
  alt: string;
  src: string;
  width: number;
  height: number;
  className?: string;
};

export default function ImageWithFallback({
  fallback = fallbackImage,
  alt,
  src,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState<boolean>(false);

  return (
    <Image
      alt={alt}
      onError={() => setError(true)}
      src={error ? fallbackImage : src}
      placeholder="blur"
      blurDataURL={blurImage}
      {...props}
    />
  );
}
