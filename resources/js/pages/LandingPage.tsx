import { useRef } from "react";
import MonacoHeader from "@/components/monaco-header";
import Carousel from "@/components/ui/monaco-carousel";
import SectionOne from "@/components/monaco-section-one";
import SectionTwo from "@/components/monaco-section-two";
import Gallery from "@/components/monaco-gallery";
import AboutUs from "@/components/monaco-about";
import ContactForm from "@/components/monaco-form";
import Footer from "@/components/monaco-footer";

type Vehicle = {
    id: number;
    name: string;
    image_path: string;
    details: string;
    type: "veiculo" | "caminhao";
};

type Props = {
    vehicles?: Vehicle[];
};

export default function LandingPage( { vehicles }: Props) {
    const galleryRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null!);
    const formRef = useRef<HTMLDivElement>(null!);

    return (
        <div className="bg-white">
            <div ref={headerRef}>
                <MonacoHeader
                    galleryRef={galleryRef}
                    aboutRef={aboutRef}
                    contactRef={contactRef}
                    formRef={formRef}
                />
            </div>

            <Carousel />

            <SectionOne />

            <SectionTwo />

            <div ref={galleryRef}>
                <Gallery vehicles={vehicles}  />
            </div>

            <div ref={aboutRef}>
                <AboutUs />
            </div>

            <div ref={formRef}>
                <ContactForm />
            </div>

            <div ref={contactRef}>
                <Footer headerRef={headerRef} />
            </div>

        </div>
    );
}

