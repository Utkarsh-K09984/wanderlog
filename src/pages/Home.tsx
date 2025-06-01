import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Typed from "typed.js";

function Home() {
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
    <div className="min-h-[95vh] w-full bg-background flex items-center justify-center px-4 sm:px-6 md:px-8 py-8">
      <div className="flex flex-col md:flex-row items-center w-full max-w-7xl mx-auto gap-8 md:gap-12">
        {/* Left: Text Section */}
        <div className="flex-1 flex flex-col items-center md:items-start justify-center gap-6 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
            Capture Your <br />
            <span className="text-2xl sm:text-3xl md:text-4xl text-primary" ref={typedElement}></span>
            <br />
            <span className="text-muted-foreground font-semibold text-lg sm:text-xl md:text-2xl">
              Share your travel stories with the world
            </span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
            {"WanderLog is your personal travel journal. Document your adventures, add photos, and inspire others with your unique experiences. Start your journey today!"
              .split(" ")
              .map((word, idx) => (
                <span
                  key={idx}
                  className="inline-block transition-transform duration-200 hover:scale-105 hover:text-primary cursor-pointer mr-1"
                >
                  {word}
                </span>
              ))}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center md:justify-start items-center w-full sm:w-auto">
            <Link
              to="/Journal"
              className="px-8 py-3 rounded-md bg-primary text-primary-foreground font-semibold shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all duration-200 sm:w-auto text-center"
            >
              My Journals
            </Link>
            <Link
              to="/about"
              className="px-8 py-3 rounded-md border border-border text-foreground font-semibold hover:bg-accent hover:shadow-md transition-all duration-200 sm:w-auto text-center"
            >
              Learn More
            </Link>
          </div>        </div>
        {/* Right: Illustration */}
        <div className="flex-1 flex items-center justify-center">
          <img
            src="https://res.cloudinary.com/dbzbqq0vw/image/upload/v1748784440/Traveling-pana_ontqsm.svg"
            alt="Travel Illustration"
            className="w-80 sm:w-96 md:w-[28rem] h-auto object-contain hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;