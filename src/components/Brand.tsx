type BrandProps = {
  compact?: boolean;
  className?: string;
};

export function Brand({ compact = false, className = "" }: BrandProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span className="brand-crop shrink-0" aria-hidden="true">
        <img src="/assets/brand/arche-labs-logo-optimized.jpg" alt="" width="64" height="64" />
      </span>
      <span
        className={`font-display font-semibold tracking-[-0.04em] text-ink ${
          compact ? "text-base" : "text-lg"
        }`}
      >
        ARCHE LABS
      </span>
    </span>
  );
}
