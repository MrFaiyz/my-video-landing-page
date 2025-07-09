'use client'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-20 flex items-center justify-between px-10 py-6">
      {/* Company name or logo */}
      <a href="#" className="text-2xl font-bold text-black">
        EditPro Studio
      </a>

      {/* Nav links */}
      <ul className="flex gap-10 text-black font-medium tracking-wide">
        <li>
          <a
            href="#about"
            className="hover:underline underline-offset-4 decoration-2 decoration-blue-400 transition duration-300"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#services"
            className="hover:underline underline-offset-4 decoration-2 decoration-blue-400 transition duration-300"
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="#testimonials"
            className="hover:underline underline-offset-4 decoration-2 decoration-blue-400 transition duration-300"
          >
            Testimonials
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="hover:underline underline-offset-4 decoration-2 decoration-blue-400 transition duration-300"
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  )
}