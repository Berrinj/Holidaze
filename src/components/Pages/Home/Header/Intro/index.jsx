/**
 * a component that displays the intro text on the home page, this only shows if user is not logged in
 * @returns JSX.Element - the intro text on the home page
 */

function Intro() {
  return (
    <div className="flex flex-col justify-center text-white text-center font-extralight flex-1">
      <div className="p-2">
        <p className="text-2xl md:text-4xl">WELCOME TO</p>
        <h1 className="text-4xl md:text-6xl mb-2 md:mb-6">HOLIDAZE</h1>
        <p className="max-w-md mx-auto">
          Your number 1 place to book your next home away from home! Browse over
          300 holiday homes or list your own in a few simple steps
        </p>
        <p className="italic mt-3">-The Holidaze Team</p>
      </div>
    </div>
  );
}

export default Intro;
