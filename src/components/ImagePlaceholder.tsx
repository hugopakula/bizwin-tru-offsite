type ImagePlaceholderProps = {
  label: string;
  className?: string;
  aspect?: string;
};

/**
 * Stand-in for real photography/video. Bright yellow so it's unmistakable
 * in review and trivially find-and-replaceable once real assets land.
 */
export default function ImagePlaceholder({
  label,
  className = "",
  aspect,
}: ImagePlaceholderProps) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-[#FFE600] ${aspect ?? ""} ${className}`}
      role="img"
      aria-label={label}
    >
      <div className="absolute inset-0 opacity-[0.08] [background-image:repeating-linear-gradient(45deg,#000_0,#000_1px,transparent_1px,transparent_14px)]" />
      <span className="relative px-4 py-1 text-center text-xs font-semibold uppercase tracking-[0.15em] text-black/70">
        {label}
      </span>
    </div>
  );
}
