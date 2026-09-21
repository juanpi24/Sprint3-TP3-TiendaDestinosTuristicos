export function Footer({ authorName }) {
  return (
    <footer className="border-t border-outline-variant/30 py-6 text-center text-on-surface-variant text-sm mt-auto transition-colors duration-200">
      <p>
        Hecho con React por <span className="text-primary font-medium">{authorName}</span>
      </p>
    </footer>
  );
}
