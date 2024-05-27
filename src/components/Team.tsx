const people = [
  {
    name: "Gabriel Antony Xaviour",
    role: "Founder / CEO",
    imageUrl: "/gab.png",
    xUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Leo Franklin    ",
    role: "Full Stack Developer",
    imageUrl: "/leo.png",
    xUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Romario Kavin",
    role: "Full Stack Developer",
    imageUrl: "/rom.jpeg",
  },
  // More people...
];

export default function Team() {
  return (
    <div className="bg-white py-32">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet our team
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            We’re a dynamic group of individuals who are passionate about what
            we do.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {people.map((person) => (
            <li key={person.name}>
              <img
                className="mx-auto h-56 w-56 rounded-full grayscale-0"
                src={person.imageUrl}
                alt=""
              />
              <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
                {person.name}
              </h3>
              <p className="text-sm leading-6 text-gray-600">{person.role}</p>
              <ul role="list" className="mt-6 flex justify-center gap-x-6"></ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
