export function Footer() {
  return (
    <div className="container mx-auto px-4">
      <p>&copy; 2025 Sutralia — Built with ❤️ and TailwindCSS</p>
      <p className="mt-2">
        <a href="https://github.com/syns2191/profiles.git" target="_blank" className="text-white hover:underline">View this site&apos;s GitHub repo</a>
      </p>
      <label>
        <input type="radio" className="appearance-none forced-colors:appearance-auto" />
        <p className="hidden forced-colors:block">Cyan</p>
        <div className="bg-cyan-200 forced-colors:hidden ..."></div>
        <div className="bg-cyan-500 forced-colors:hidden ..."></div>
      </label>
    </div>
  )
}
