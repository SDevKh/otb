import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
interface LandingPageProps {
  onProceedToLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onProceedToLogin }) => {
  const section01Ref = useRef<HTMLHeadingElement>(null);
  const section02Ref = useRef<HTMLHeadingElement>(null);
  const section03Ref = useRef<HTMLHeadingElement>(null);
  const section01NumberRef = useRef<HTMLHeadingElement>(null);
  const section01TextRef = useRef<HTMLParagraphElement>(null);
const heroTitleRef = useRef<HTMLHeadingElement>(null);
const heroSubtitleRef = useRef<HTMLParagraphElement>(null);

const section1TitleRef = useRef<HTMLHeadingElement>(null);
const section1TextRef = useRef<HTMLParagraphElement>(null);

const section2TitleRef = useRef<HTMLHeadingElement>(null);
const section2TextRef = useRef<HTMLParagraphElement>(null);

const section3TitleRef = useRef<HTMLHeadingElement>(null);
const section3TextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const sections = [
      { ref: section01Ref, trigger: section01Ref },
      { ref: section02Ref, trigger: section02Ref },
      { ref: section03Ref, trigger: section03Ref },
      { ref: heroTitleRef, trigger: heroTitleRef },
      { ref: section1TitleRef, trigger: section1TitleRef },
      { ref: heroSubtitleRef, trigger: heroSubtitleRef },
      { ref: section2TitleRef, trigger: section2TitleRef },
      { ref: section2TextRef, trigger: section2TextRef },
      { ref: section3TitleRef, trigger: section3TitleRef },
      { ref: section3TextRef, trigger: section3TextRef },
      { ref: section1TextRef, trigger: section1TextRef },
      { ref: section01NumberRef, trigger: section01NumberRef },
      { ref: section01TextRef, trigger: section01TextRef },
    ];

    sections.forEach(({ ref, trigger }, idx) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 100, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: trigger.current,
              start: "top 80%",
              end: "top 30%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    if (heroTitleRef.current) {
    gsap.fromTo(
      heroTitleRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 2,
      }
    );
  }

  // Hero subtitle: fade in from bottom with delay
  if (heroSubtitleRef.current) {
    gsap.fromTo(
      heroSubtitleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power2.out" }
    );
  }

  // Section 01 number: scale and fade in on scroll
  if (section01NumberRef.current) {
    gsap.fromTo(
      section01NumberRef.current,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: section01NumberRef.current,
          start: "top 80%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  // Section 01 text: slide in from left on scroll
  if (section01TextRef.current) {
    gsap.fromTo(
      section01TextRef.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section01TextRef.current,
          start: "top 80%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-scroll scrollbar-hide snap-y snap-mandatory" style={{ scrollSnapType: 'y mandatory' }}>
      {/* 🔮 Spline 3D Background */}
      <iframe
        src="https://my.spline.design/particlenebula-ZJDdsDD1tjuhHdjPjN0pL6Tz/"
        frameBorder="0"
        className="absolute inset-0 w-full h-[44%] z-0 pointer-events-none"
        allowFullScreen
      />

      {/* 🌌 Optional overlay for better contrast */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* 🚀 Main UI Content */}
      <>
        {/* Top Navigation */}
        <nav className="bg-none fixed top-0 left-0 right-0 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full  z-20">
          <div ref={heroTitleRef} className="text-xl font-bold">Out Of The Box</div>
        </nav>

      <div className="relative z-10 pt-24">

        {/* Section 1: Hero Section */}
        <section className="snap-start flex flex-col items-center justify-center text-center px-6 py-20 sm:py-32 max-w-4xl mx-auto min-h-screen">

          <p ref={section01TextRef} className="mb-4 px-4 py-1 bg-gray-800 rounded-full text-sm inline-block opacity-70">
            ✨ Introducing OTB →
          </p>
          <h1 ref={section01NumberRef} className="text-5xl sm:text-6xl font-extrabold leading-tight max-w-3xl mb-6">
            OTB is the new way <br /> to know yourself.
          </h1>
          <p ref={section01TextRef} className="text-lg sm:text-xl max-w-xl mb-10 text-gray-300">
            Beautifully designed, to search your own way. <br />
            Check - Learn - Succeed.
          </p>
          <button
            onClick={onProceedToLogin}
            className="px-8 py-4 bg-white text-black rounded-3xl font-semibold hover:bg-gray-200 transition inline-flex items-center"
          >
            Get Started for free
          </button>
        </section>

        <section className="snap-start flex px-6 py-20 sm:py-32 mx-auto min-h-screen ml-5">
          <h1 ref={section01Ref} className=" font-bold mb-6 text-[400px] leading-0">01</h1>
          <div className="flex flex-col justify-center ml-[5vw]">
          <p ref={section1TitleRef} className=" text-gray-300 leading-snug ml-5 text-[4vw]">
            OTB is a platform designed to help you understand yourself better through personalized questionnaires and insights.</p>
            <p ref={section1TextRef}  className="text-lg text-gray-300 max-w-xl ml-5 mt-5">
            This platoform provides you to find the best way to learn and understand anything you want.</p>
        </div>
        </section>
        <section className="snap-start flex px-6 py-20 sm:py-32 mx-auto min-h-screen ml-5">
          <div className="flex flex-col justify-center">
          <p ref={section2TitleRef} className=" text-gray-300 leading-snug ml-5 text-[4vw]">
            OTB is a platform that understands your way of thinking and learning to get the best results.</p>
            <p ref={section2TextRef}  className="text-lg text-gray-300 max-w-xl ml-5 mt-5">
            With the help of ai analysis you can inprove find way set goals and get a blueprint, roadmap to your goals.</p>
        </div>
        <h1 ref={section02Ref} className=" font-bold mb-6 text-[400px] leading-0">02</h1>
        </section>

        <section className="snap-start flex px-6 py-20 sm:py-32 mx-auto min-h-screen ml-5">
          <h1 ref={section03Ref} className=" font-bold mb-6 text-[400px] leading-0">03</h1>
          <div className="flex flex-col justify-center ml-[5vw]">
          <p ref={section3TitleRef} className=" text-gray-300 leading-snug ml-5 text-[4vw]">
            OTB is a platform designed to help people who are unable or find difficult to learn effectively.</p>
            <p ref={section3TextRef} className="text-lg text-gray-300 max-w-xl ml-5 mt-5">
            We provide a variety of resources and tools to help you learn at your own pace and in your own style.</p>
        </div>
        </section>
      </div>
      </>

      {/* ✨ Background Twinkling Stars */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle 3s infinite alternate ease-in-out`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
      <style>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        div::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        div {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        @keyframes twinkle {
          from { opacity: 0.2; }
          to { opacity: 1; }
        }
      `}</style>

    </div>
  );
};

export default LandingPage;
