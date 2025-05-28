function About() {
  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center px-4 md:px-8 bg-background">
      {/* Profile Photo */}
      <img
        src="https://avatars.githubusercontent.com/u/9919?s=280&v=4" // Replace with your own or a team photo
        alt="Profile"
        className="w-32 h-32 rounded-full border-4 border-primary shadow-lg object-cover mb-6"
      />
      {/* Cool Description */}
      <div className="text-center max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-primary">About WanderLog</h1>
        <p className="text-lg text-muted-foreground mb-4">
          Welcome to <span className="font-bold text-foreground">WanderLog</span> – your digital travel companion! 🌍
        </p>
        <p className="text-base md:text-lg text-foreground mb-2">
          We believe every journey is a story worth sharing. WanderLog is built for explorers, dreamers, and storytellers who want to capture their adventures, relive memories, and inspire others. Whether you’re hiking the Himalayas, road-tripping across continents, or discovering hidden gems in your own city, WanderLog is your space to document, reflect, and connect.
        </p>
        <p className="text-base md:text-lg text-foreground mb-2">
          <span className="font-semibold text-primary">Features:</span> <br />
          • Effortless journaling with photos and locations<br />
          • Beautiful, distraction-free interface<br />
          • Share your stories or keep them private<br />
          • Dark mode for night owls 🌙<br />
          • 100% free for the community
        </p>
        <p className="text-base md:text-lg text-muted-foreground mt-4">
          Built with ❤️ by travel lovers, for travel lovers. Start your journey with us today!
        </p>
      </div>
      {/* Extended Section: Our Mission */}
      <div className="mt-12 max-w-3xl w-full flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">Our Mission</h2>
        <p className="text-base md:text-lg text-foreground text-center mb-6">
          At WanderLog, our mission is to empower every traveler to capture, cherish, and share their unique adventures. We want to make travel journaling accessible, fun, and meaningful for everyone—no matter where you are in the world.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <div className="flex flex-col items-center">
            <span className="text-4xl mb-2">🗺️</span>
            <h3 className="font-semibold text-lg mb-1">Discover</h3>
            <p className="text-sm text-muted-foreground text-center">Find inspiration from other travelers and explore new destinations through their stories.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl mb-2">✍️</span>
            <h3 className="font-semibold text-lg mb-1">Document</h3>
            <p className="text-sm text-muted-foreground text-center">Easily record your journeys, add photos, and keep your memories safe forever.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl mb-2">🤝</span>
            <h3 className="font-semibold text-lg mb-1">Connect</h3>
            <p className="text-sm text-muted-foreground text-center">Share your experiences, connect with fellow travelers, and grow your community.</p>
          </div>
        </div>
      </div>
      {/* Extended Section: Meet the Creator */}
      <div className="mt-16 max-w-2xl w-full flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">Meet the Creator</h2>
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg" // Replace with your own photo
          alt="Creator"
          className="w-24 h-24 rounded-full border-2 border-primary shadow mb-3"
        />
        <h3 className="font-semibold text-lg mb-1">Utkarsh</h3>
        <p className="text-sm text-muted-foreground mb-2">Founder & Full Stack Developer</p>
        <p className="text-base text-foreground text-center">
          Hi! I’m Utkarsh, a passionate traveler and developer. I built WanderLog to help people like you preserve their travel memories and inspire others. When I’m not coding or exploring new places, you’ll find me reading, hiking, or enjoying a good cup of coffee.
        </p>
        <div className="flex gap-4 mt-4">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub</a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LinkedIn</a>
        </div>
      </div>
      {/* Extended Section: Call to Action */}
      <div className="mt-16 max-w-xl w-full flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">Ready to Start Your Journey?</h2>
        <p className="text-base md:text-lg text-foreground text-center mb-4">
          Sign up now and become part of a growing community of explorers. Your next adventure awaits!
        </p>
        <a
          href="/login"
          className="px-8 py-3 rounded-md bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 transition"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}

export default About;