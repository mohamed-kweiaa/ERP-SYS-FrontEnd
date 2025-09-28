import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-white">
      <div className="text-center px-4">
        <h1 className="text-5xl font-bold mb-6 md:text-7x1">
            Welcome to Al Sakka's <span className="text-primary">ERP System</span>
        </h1>

        <p className="text-lg mb-10 md:text-xl text-gray-400">
          simplify your business operations with all-in-one ERP solution.
        </p>
        <div className="flex justify-center gap-6">
          <Link 
            href="/login" 
            className="px-8 py-3 bg-primary hover:text-white hover:bg-green-800 transition rounded-full font-semibold shadow-lg text-primary-foreground ">
              Login
          </Link>
          <Link 
            href="/register" 
            className="px-8 py-3 border-2 border-primary hover:text-white hover:border-green-800 transition rounded-full font-semibold shadow-lg  text-green-300">
              Register
          </Link>
        </div>
      </div>
    </main>
  )
}