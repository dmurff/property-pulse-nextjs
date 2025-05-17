import { FaExclamationTriangle } from "react-icons/fa";
import Link from "next/link";
const NotFoundPage = () => {
  return (
    <section>
      <div>
        <FaExclamationTriangle className="text-yellow-400 text-8xl fa-5x" />
        <div className="text-center">
          <h1 className="text-3xl font-bold mt-4 mb-2">Page Not Found</h1>
          <p className="text-gray-500 text-xl mb-10">
            The page you are looking for does not exist.
          </p>
          <Link
            href="/"
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded"
          />
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
