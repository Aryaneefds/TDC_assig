import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem(
      "isAuthenticated"
    );

    navigate("/login");
  };

  return (

    <div
      className="
      w-64
      bg-slate-900
      text-white
      min-h-screen
      p-6
      flex
      flex-col
      "
    >

      {/* Logo */}

      <h1
        className="
        text-2xl
        font-bold
        mb-10
        "
      >
        TDC Matchmaker
      </h1>

      {/* Navigation */}

      <nav
        className="
        flex
        flex-col
        gap-4
        "
      >

        <Link
          to="/dashboard"
          className="
          hover:text-blue-400
          "
        >
          Dashboard
        </Link>

        <Link
          to="/"
          className="
          hover:text-blue-400
          "
        >
          Clients
        </Link>

        <Link
          to="/matches"
          className="
          hover:text-blue-400
          "
        >
          Sent Matches
        </Link>

      </nav>

      {/* Bottom Section */}

      <div className="mt-auto">

        <p
          className="
          text-sm
          text-gray-400
          mb-4
          "
        >
          Logged in as Matchmaker
        </p>

        <button
          onClick={handleLogout}
          className="
          bg-red-600
          hover:bg-red-700
          text-white
          px-4
          py-2
          rounded
          w-full
          "
        >
          Logout
        </button>

      </div>

    </div>

  );
}