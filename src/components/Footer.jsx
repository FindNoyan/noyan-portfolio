export default function Footer() {
  return (
    <footer className="mx-auto max-w-4xl px-6 py-8">
      <p className="text-center text-xs text-muted">
        Built by Noyan · {new Date().getFullYear()}
      </p>
    </footer>
  );
}
