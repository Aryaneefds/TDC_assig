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
      fixed
      left-0
      top-0
      h-screen
      w-64
      bg-slate-900
      text-white
      p-6
      flex
      flex-col
      "
    >

      <h1
        className="
        text-3xl
        font-bold
        mb-10
        "
      >
        TDC
      </h1>

      <nav
        className="
        flex
        flex-col
        gap-3
        "
      >

        <Link
          to="/"
          className="
          p-3
          rounded
          hover:bg-slate-800
          "
        >
          Dashboard
        </Link>

        <Link
          to="/clients"
          className="
          p-3
          rounded
          hover:bg-slate-800
          "
        >
          Clients
        </Link>

        <Link
          to="/matches"
          className="
          p-3
          rounded
          hover:bg-slate-800
          "
        >
          Sent Matches
        </Link>

      </nav>

      <div className="mt-auto">

  <div
    className="
    border-t
    border-slate-700
    pt-4
    "
  >

    <p className="font-semibold">
      Matchmaker
    </p>

    <p
      className="
      text-sm
      text-slate-400
      mb-4
      "
    >
      tdc123
    </p>

    <button
      onClick={handleLogout}
      className="
      w-full
      bg-red-600
      hover:bg-red-700
      text-white
      py-2
      rounded
      "
    >
      Logout
    </button>

  </div>

</div>
    </div>

  );
}