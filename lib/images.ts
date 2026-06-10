export function isRemoteImage(src?: string | null) {
  return Boolean(src && /^https?:\/\//.test(src));
}

export function coverImageOrFallback(src?: string | null) {
  return src?.trim() || "/images/heroBg1.png";
}
