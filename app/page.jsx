import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <h1 className="text-3xl">Welcome</h1>
      <h1 className="text-3xl font-bold text-blue-500">Tailwind is working?</h1>

      <Link href="/properties">Go To Properties</Link>
    </div>
  );
};

export default HomePage;
