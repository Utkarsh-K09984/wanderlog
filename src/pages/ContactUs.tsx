// ContactUs page for Travel Journal
function ContactUs() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-6 md:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Contact Us</h1>
      <p className="text-sm sm:text-lg text-muted-foreground mb-2 text-center">
        For any queries, reach out at
        <a
          href="mailto:kapoorutkarsh17@gmail.com"
          className="underline text-primary ml-1"
        >
          kapoorutkarsh17@gmail.com
        </a>
      </p>
    </div>
  );
}

export default ContactUs;
