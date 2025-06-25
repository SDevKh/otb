import { useEffect } from "react";
import { renderCanvas } from "./ui/canvas"
import { Shapes, Plus } from "lucide-react";

export function aboutus() {
  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <section id="home" className="overflow-hidden">
      <div className="overflow-x-hidden animation-delay-8 animate-fadeIn mt-0 flex bg-gradient-to-br from-black via-gray-950 to-indigo-900 text-white flex-col items-center justify-center px-4 text-center h-screen md:mt-0">
        <div className="z-10 mb-6 mt-10 sm:justify-center md:mb-4 md:mt-20">
          <div className="relative flex items-center whitespace-nowrap rounded-full border bg-popover px-3 py-1 text-xs leading-6  text-primary/60 ">
            <Shapes className="h-5 p-1" /> Introducing power.
            <a
              href="/products/dicons"
              rel="noreferrer"
              className="hover:text-ali ml-1 flex items-center font-semibold"
            >
            </a>
          </div>
        </div>

        <div className="mb-10 mt-4  md:mt-6">
          <div className="px-2">
            <div className="border-ali relative mx-auto h-full max-w-7xl border p-6 [mask-image:radial-gradient(800rem_96rem_at_center,black,transparent)] md:px-12 md:py-20">
              <h1 className="flex  select-none flex-col  px-3 py-2 text-center text-5xl font-semibold leading-none tracking-tight md:flex-col md:text-8xl lg:flex-row lg:text-8xl">
                <Plus
                  strokeWidth={4}
                  className="text-ali absolute -left-5 -top-5 h-10 w-10"
                />
                <Plus
                  strokeWidth={4}
                  className="text-ali absolute -bottom-5 -left-5 h-10 w-10"
                />
                <Plus
                  strokeWidth={4}
                  className="text-ali absolute -right-5 -top-5 h-10 w-10"
                />
                <Plus
                  strokeWidth={4}
                  className="text-ali absolute -bottom-5 -right-5 h-10 w-10"
                />
                A complete platform to Design yourself.
              </h1>
              <div className="flex items-center justify-center gap-1">
                <span className="relative flex h-3 w-3 items-center justify-center">
                  <span className="absolute inline-flex mt-5 h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex mt-5 h-2 w-2 rounded-full bg-green-500"></span>
                </span>
                <p className="text-xs text-green-500 mt-5">Available Now</p>
              </div>
            </div>
          </div>

          <h1 className="mt-8 text-2xl md:text-2xl">
            Welcome to the creative playground!

          </h1>

          <p className="md:text-md mx-auto mb-0 mt-2 max-w-2xl px-6 text-sm text-primary/60 sm:px-6 md:max-w-4xl md:px-20 lg:text-lg">
            Designed to find the path to yourself, it is a paltoform which helps you to discover your creative side.
          </p>
          
        </div>
      </div>
      <canvas
        className="bg-skin-base pointer-events-none absolute inset-0 mx-auto"
        id="canvas"
      ></canvas>
    </section>
  );
};

 
export default aboutus;