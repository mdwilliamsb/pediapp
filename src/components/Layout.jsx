import Navbar from "./Navbar"

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-white text-gray-800">
      <Navbar />
      <main className="w-full max-w-4xl md:max-w-5xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  )
}
