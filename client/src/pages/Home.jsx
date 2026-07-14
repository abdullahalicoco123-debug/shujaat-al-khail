import TopBar from "../components/TopBar/TopBar";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Features from "../components/Features/Features";
import Categories from "../components/Categories/Categories";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import About from "../components/About/About";
import Testimonials from "../components/Testimonials/Testimonials";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";

function Home() {
  return (
    <>
      <TopBar />
      <Navbar />
      <Hero />
      <Features />
      <Categories />
      <FeaturedProducts />
      <WhyChooseUs />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;