import Navbar        from "@/components/Navbar";
import Hero           from "@/components/Hero";
import WhyChooseUs    from "@/components/WhyChooseUs";
import MensHairstyles from "@/components/MensHairstyles";
import WomensHairstyles from "@/components/WomensHairstyles";
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
        <WhyChooseUs />
        <div id="hairstyles">
          <MensHairstyles />
          <WomensHairstyles />
        </div>
        <Services />
        <Packages />
        <Bridal />
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
