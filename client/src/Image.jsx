export default function Image({ src, ...rest }) {
  // If Cloudinary URL already → use as is
  if (!src) return null;

  const finalSrc = src.startsWith("http")
    ? src
    : src; // no prefixing local URL!!

  return <img {...rest} src={finalSrc} alt="" />;
}
