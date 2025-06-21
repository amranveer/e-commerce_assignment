import { FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <section className="relative w-full bg-[#F3F5F7] overflow-hidden">
      {/* Full-width Footer Image */}
      <img
        src="../../public/footer.png"
        alt="Footer Design"
        className="w-full h-auto object-cover"
      />

      {/* Form Overlay */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="text-center max-w-xl w-full">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            Join Our Newsletter
          </h2>
          <p className="text-gray-600 mb-6">
            Sign up for deals, new products and promotions
          </p>

          {/* Email Form */}
          <form className="flex items-center gap-4 border-b border-gray-300 justify-between max-w-md mx-auto px-2 bg-transparent">
            <div className="flex items-center text-gray-500 flex-grow">
              <FiMail className="text-xl mr-2" />
              <input
                type="email"
                placeholder="Email address"
                className="bg-transparent focus:outline-none py-2 text-sm w-full"
              />
            </div>
            <button
              type="submit"
              className="text-sm text-gray-700 font-medium hover:text-black transition"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
