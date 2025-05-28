import { useEffect, useRef } from "react";
import Typed from "typed.js";
function Home() {
    const item = "Journeys";
    const ar = item.split("");
    console.log(typeof(ar))
    const typedElement = useRef(null);
    useEffect(() => {
    const typed = new Typed(typedElement.current, {
      strings: [
        "Journey",
        "Destinations",
        "Unforgettable Experiences",
        "Dream Vacation",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
      cursorChar: "|",
      
    });

    return () => typed.destroy();
  }, []);
  return (
    <div className="min-h-[80vh] w-full bg-background flex items-center justify-center px-4 md:px-8">
      <div className="flex flex-col md:flex-row items-center w-full max-w-7xl mx-auto gap-10">
        <div className="flex-1 flex flex-col items-start justify-center gap-6 ">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
            Capture Your {" "}
            {/* {typedElement} */}
            <br />
            <span className="text-4xl" ref={typedElement}></span>
            <br />
            <span className="text-muted-foreground font-semibold">
              Share your travel stories with the world
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            {"WanderLog is your personal travel journal. Document your adventures, add photos, and inspire others with your unique experiences. Start your journey today!"
              .split(" ")
              .map((word, idx) => (
                <span
                  key={idx}
                  className="inline-block transition-transform duration-200 hover:scale-125 hover:text-primary cursor-pointer mr-1"
                  
                >
                  {word}
                </span>
              ))}
          </p>
          <div className="flex gap-4 mt-2">
            <a
              href="/journal"
              className="px-6 py-2 rounded-md bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 transition"
            >
              My Journals
            </a>
            <a
              href="/about"
              className="px-6 py-2 rounded-md border border-border text-foreground font-semibold hover:bg-accent transition"
            >
              Learn More
            </a>
          </div>
        </div>
        {/* Right: Illustration */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-[340px] h-[260px] bg-primary/10 rounded-full flex items-center justify-center">
            {/* Replace with SVG/illustration as needed */}
            <img
              src="https://undraw.co/api/illustrations/undraw_traveling_yhxq.svg"
              alt="Travel Illustration"
              className="w-60 h-60 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;