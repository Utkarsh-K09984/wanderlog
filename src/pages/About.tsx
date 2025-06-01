function About() {
  return (
    <div className="min-h-[80vh] mt-20 w-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 bg-background mb-[2rem]">
      {/* Profile Photo */}
      <img
        src="https://avatars.githubusercontent.com/u/9919?s=280&v=4" // Replace with your own or a team photo
        alt="Profile"
        className="w-24 sm:w-32 h-24 sm:h-32 rounded-full border-4 border-primary shadow-lg object-cover mb-6"
      />
      {/* Cool Description */}
      <div className="text-center max-w-2xl px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-primary">About WanderLog</h1>
        <p className="text-base sm:text-lg text-muted-foreground mb-4">
          Welcome to <span className="font-bold text-foreground">WanderLog</span> – your digital travel companion! 🌍
        </p>
        <p className="text-sm sm:text-base md:text-lg text-foreground mb-2">
          We believe every journey is a story worth sharing. WanderLog is built for explorers, dreamers, and storytellers who want to capture their adventures, relive memories, and inspire others. Whether you’re hiking the Himalayas, road-tripping across continents, or discovering hidden gems in your own city, WanderLog is your space to document, reflect, and connect.
        </p>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground mt-4">
          Built with ❤️ by travel lovers, for travel lovers. Start your journey with us today!
        </p>
      </div>
      {/* Extended Section: Our Mission */}
      <div className="mt-12 max-w-3xl w-full flex flex-col items-center px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-2">Our Mission</h2>
        <p className="text-sm sm:text-base md:text-lg text-foreground text-center mb-6">
          At WanderLog, our mission is to empower every traveler to capture, cherish, and share their unique adventures. We want to make travel journaling accessible, fun, and meaningful for everyone—no matter where you are in the world.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl mb-2">🗺️</span>
            <h3 className="font-semibold text-base sm:text-lg mb-1">Discover</h3>
            <p className="text-xs sm:text-sm text-muted-foreground text-center">Find inspiration from other travelers and explore new destinations through their stories.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl mb-2">✍️</span>
            <h3 className="font-semibold text-base sm:text-lg mb-1">Document</h3>
            <p className="text-xs sm:text-sm text-muted-foreground text-center">Easily record your journeys, add photos, and keep your memories safe forever.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl mb-2">🤝</span>
            <h3 className="font-semibold text-base sm:text-lg mb-1">Connect</h3>
            <p className="text-xs sm:text-sm text-muted-foreground text-center">Share your experiences, connect with fellow travelers, and grow your community.</p>
          </div>
        </div>
      </div>
      {/* Extended Section: Call to Action */}
      <div className="mt-16 max-w-xl w-full flex flex-col items-center px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-2">Ready to Start Your Journey?</h2>
        <p className="text-sm sm:text-base md:text-lg text-foreground text-center mb-4">
          Sign up now and become part of a growing community of explorers. Your next adventure awaits!
        </p>
        <a
          href="/login"
          className="px-6 py-2 sm:px-8 sm:py-3 rounded-md bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 transition"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}

export default About;