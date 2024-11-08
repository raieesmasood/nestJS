import logo from "@/assets/logo.svg"
const Navbar = () => {
  return (
    <nav className="bg-black py-6 px-20 flex justify-between items-center shadow sticky top-0">
      <div>
        <img src={logo} className="w-80" />
      </div>
      <div className="text-gray-300 hidden md:flex gap-5 font-bold text-lg">
        <div>About Us</div>
        <div>Contact Us</div>
      </div>
    </nav>
  )
}

export default Navbar
