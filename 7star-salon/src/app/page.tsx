import Navbar        from "@/components/Navbar";
import Hero           from "@/components/Hero";
import WhyChooseUs    from "@/components/WhyChooseUs";
import Hairstyles    from "@/components/Hairstyles";
import Services       from "@/components/Services";
import Packages       from "@/components/Packages";
import Bridal         from "@/components/Bridal";
import Gallery        from "@/components/Gallery";
import Owner          from "@/components/Owner";
import Testimonials   from "@/components/Testimonials";
import Map            from "@/components/Map";
import Contact        from "@/components/Contact";
import Footer         from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Hairstyles />
        <Services />
        <Packages />
        <Bridal />
        {/* <WhyChooseUs /> */}
        <Gallery />
        <Owner />
        <Testimonials />
        <Map />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
