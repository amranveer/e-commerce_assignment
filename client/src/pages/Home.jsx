import Carousel from "../components/Carousel";
import { FiArrowRight } from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import { FaTruck, FaMoneyBillWave, FaLock, FaPhoneAlt } from "react-icons/fa";

export default function Home() {
    const images = [
        "Paste.png",
        "Paste.png",
        "/Paste.png",
    ];

    return (
        <div className="bg-white text-gray-800 ">
            {/* Top Bar
      <div className="bg-gray-100 text-sm text-center py-2 px-4">
        <span className="font-medium">30% off storewide — Limited time!</span>
        <a href="#" className="text-blue-500 ml-2 underline">Shop Now</a>
      </div> */}
            <div className="flex flex-col gap-[32px] pb-[40px]">


                {/* Hero Section */}
                <div className="lg:px-10 px-4">
                    <Carousel images={images} />
                </div>

                {/* Tagline Section */}
                <section className="w-full px-4 flex lg:px-10  md:flex-row  gap-8 ">
                    {/* Left Text */}
                    <div className="md:w-1/2 w-full  flex flex-col justify-center items-start">
                        <h2 className="text-4xl lg:text-6xl md:text-5xl font-poppins font-semibold leading-tight">
                            Simply Unique/
                        </h2>
                        <h2 className="text-4xl lg:text-6xl md:text-5xl font-poppins font-semibold leading-tight mt-1">
                            Simply Better.
                        </h2>
                    </div>

                    {/* Right Paragraph */}
                    <div className="md:w-1/2 w-full  flex items-center justify-center">
                        <div className="max-w-md px-4 text-left">
                            <p className="text-sm text-gray-700 leading-relaxed">
                                3legant is a gift & decorations store based in HCMC, Vietnam. Est since 2019.
                            </p>
                        </div>
                    </div>

                </section>

            </div>

            {/* Categories */}
            <section className="flex flex-col md:flex-row w-full gap-6 px-4  md:px-10 mx-auto mb-12">
                {/* Left - Living Room */}
                <div className="relative w-full  md:w-1/2 bg-[#F3F5F7]  overflow-hidden flex-1 flex items-center justify-center">
                    <img
                        src="Living.png"
                        alt="Living Room"
                        className="w-full h-auto object-contain"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end lg:justify-start p-6 text-black">
                        <h3 className="text-xl font-semibold">Living Room</h3>
                        <a href="#" className="text-sm flex items-center gap-1">Shop Now <FiArrowRight /></a>
                    </div>
                </div>

                {/* Right - Bedroom & Kitchen */}
                <div className="flex flex-col gap-6 w-full md:w-1/2 flex-1 justify-between">
                    {/* Bedroom */}
                    <div className="relative bg-[#F3F5F7] w-full  overflow-hidden flex items-center justify-center">
                        <img
                            src="Bedroom.png"
                            alt="Bedroom"
                            className="w-full h-auto object-contain"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end p-6 text-black">
                            <h3 className="text-xl font-semibold">Bedroom</h3>
                            <a href="#" className="text-sm flex items-center gap-1">Shop Now <FiArrowRight /></a>
                        </div>
                    </div>

                    {/* Kitchen */}
                    <div className="relative bg-[#F3F5F7] w-full  overflow-hidden flex items-center justify-center">
                        <img
                            src="/public/Kitchen.png"
                            alt="Kitchen"
                            className="w-full h-auto object-contain"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end p-6 text-black">
                            <h3 className="text-xl font-semibold">Kitchen</h3>
                            <a href="#" className="text-sm flex items-center gap-1">Shop Now <FiArrowRight /></a>
                        </div>
                    </div>
                </div>
            </section>

            {/* New Arrivals */}
            <section className="px-4 sm:px-6 lg:px-10  mx-auto mt-10 mb-16">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">New Arrivals</h2>
                    <a
                        href="#"
                        className="text-sm font-medium text-black flex items-center gap-1 hover:underline"
                    >
                        More Products <FiArrowRight size={16} />
                    </a>
                </div>

                {/* Scrollable Row */}
                <div className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide pb-2">
                    {[1, 2, 3, 4, 5, 6, 7].map((id) => (
                        <div key={id} className="min-w-[250px] max-w-[250px] flex-shrink-0">
                            <ProductCard
                                title="Product Name"
                                image="/Left.png"
                                price={99.99}
                                originalPrice={199.99}
                                isNew={true}
                            />
                        </div>
                    ))}
                </div>
            </section>





            {/* Features */}
            <section className="flex flex-wrap font-poppins gap-[16px] py-12  px-10 mx-auto bg-white">
                {/* Feature 1 */}
                <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(25%-12px)] flex flex-col px-[32px] py-[48px] bg-[#F3F5F7] items-start gap-[16px]">
                    <FaTruck size={40} className="text-gray-800" />
                    <h4 className="font-semibold text-xl text-gray-900">Free Shipping</h4>
                    <p className="text-gray-500">Order above $200</p>
                </div>

                {/* Feature 2 */}
                <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(25%-12px)] flex flex-col px-[32px] py-[48px] bg-[#F3F5F7] items-start gap-[16px]">
                    <FaMoneyBillWave size={40} className="text-gray-800" />
                    <h4 className="font-semibold text-xl text-gray-900">Money-back</h4>
                    <p className="text-gray-500">30 days guarantee</p>
                </div>

                {/* Feature 3 */}
                <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(25%-12px)] flex flex-col px-[32px] py-[48px] bg-[#F3F5F7] items-start gap-[16px]">
                    <FaLock size={40} className="text-gray-800" />
                    <h4 className="font-semibold text-xl text-gray-900">Secure Payments</h4>
                    <p className="text-gray-500">Secured by Stripe</p>
                </div>

                {/* Feature 4 */}
                <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(25%-12px)] flex flex-col px-[32px] py-[48px] bg-[#F3F5F7] items-start gap-[16px]">
                    <FaPhoneAlt size={40} className="text-gray-800" />
                    <h4 className="font-semibold text-xl text-gray-900">24/7 Support</h4>
                    <p className="text-gray-500">Phone and Email support</p>
                </div>
            </section>



            {/* Promo Banner */}
            <section className="w-full flex flex-col md:flex-row  mx-auto">
                {/* Image - Full half, no padding */}
                <div className="w-full md:w-1/2">
                    <img
                        src="/public/Paste.png"
                        alt="Promo"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Text content */}
                <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-12 md:px-12 bg-gray-50 text-center md:text-left">
                    <h3 className="text-sm text-blue-500 font-medium mb-2">SALE UP TO 35% OFF</h3>
                    <h2 className="text-3xl font-bold mb-2">HUNDREDS of New lower prices!</h2>
                    <p className="text-sm mb-4 text-gray-700">
                        It's more affordable than ever to give every room in your home a stylish makeover
                    </p>
                    <a
                        href="#"
                        className="text-sm text-black flex items-center gap-1 justify-center md:justify-start"
                    >
                        Shop Now <FiArrowRight />
                    </a>
                </div>
            </section>

            {/* Newsletter */}

        </div>
    );
}
