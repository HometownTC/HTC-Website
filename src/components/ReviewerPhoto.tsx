import React, { useEffect, useRef, useState } from 'react';

interface Props {
  src?: string;
  name: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  loading?: 'lazy' | 'eager';
}

// Shows a reviewer's photo. If there is no photo, or the photo fails to load,
// it shows the reviewer's initials in a branded circle instead of a broken box.
// Photos are stored on our own site in /public/images/reviews/ so they don't expire.
export const ReviewerPhoto: React.FC<Props> = ({ src, name, className = '', width, height, loading }) => {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // The page is pre-built, so a photo can fail before React attaches onError.
  // Check once after mount so those early failures still show initials.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, [src]);

  if (!src || failed) {
    const initials = name
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0])
      .filter((ch) => /[A-Za-z]/.test(ch))
      .slice(0, 2)
      .join('')
      .toUpperCase();
    return (
      <div
        role="img"
        aria-label={name}
        className={`${className} flex items-center justify-center bg-[#075960] text-white font-bold select-none`}
        style={{ containerType: 'size' }}
      >
        <span style={{ fontSize: '38cqmin', lineHeight: 1 }}>{initials}</span>
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt={name}
      width={width}
      height={height}
      loading={loading}
      className={className}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
};
