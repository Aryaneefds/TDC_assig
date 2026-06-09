import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/clientApi";
import AppLayout from "../components/AppLayout";
interface Client {
  _id: string;
  firstName: string;
  lastName: string;
  city: string;
  statusTag: string;
}

export default function DashboardPage() {

  const [clients, setClients] =
    useState<Client[]>([]);

  const [totalClients, setTotalClients] =
    useState(0);

  const [matchesSent, setMatchesSent] =
    useState(0);

  const [activeSearch, setActiveSearch] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const loadDashboard =
      async () => {

        try {

          const clientsResponse =
            await api.get("/clients");

          const matchesResponse =
            await api.get("/matches");

          const clientsData =
            clientsResponse.data;

          setClients(clientsData);

          setTotalClients(
            clientsData.length
          );

          setMatchesSent(
            matchesResponse.data.length
          );

          const activeClients =
            clientsData.filter(
              (client: Client) =>
                client.statusTag ===
                "Active Search"
            );

          setActiveSearch(
            activeClients.length
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    loadDashboard();

  }, []);

  if (loading) {
    return (
      <div className="p-8">
        Loading Dashboard...
      </div>
    );
  }

  return (
     <AppLayout>
    <div className="p-8 bg-slate-100 min-h-screen">

      {/* Heading */}

      <h1
        className="
        text-4xl
        font-bold
        mb-8
        "
      >
        Dashboard
      </h1>

      {/* Stats Cards */}

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
        mb-10
        "
      >

        {/* Total Clients */}

        <div
          className="
          bg-white
          rounded-xl
          shadow
          p-6
          "
        >
          <h2
            className="
            text-lg
            text-gray-500
            "
          >
            Total Clients
          </h2>

          <p
            className="
            text-5xl
            font-bold
            mt-2
            "
          >
            {totalClients}
          </p>
        </div>

        {/* Matches Sent */}

        <div
          className="
          bg-white
          rounded-xl
          shadow
          p-6
          "
        >
          <h2
            className="
            text-lg
            text-gray-500
            "
          >
            Matches Sent
          </h2>

          <p
            className="
            text-5xl
            font-bold
            mt-2
            "
          >
            {matchesSent}
          </p>
        </div>

        {/* Active Search */}

        <div
          className="
          bg-white
          rounded-xl
          shadow
          p-6
          "
        >
          <h2
            className="
            text-lg
            text-gray-500
            "
          >
            Active Search
          </h2>

          <p
            className="
            text-5xl
            font-bold
            mt-2
            "
          >
            {activeSearch}
          </p>
        </div>

      </div>

      {/* Recent Clients */}

      <div
        className="
        bg-white
        rounded-xl
        shadow
        p-6
        "
      >

        <h2
          className="
          text-2xl
          font-bold
          mb-6
          "
        >
          Recent Clients
        </h2>

        <div className="space-y-4">

          {clients
            .slice(0, 5)
            .map((client) => (

            <div
              key={client._id}
              className="
              border
              rounded-lg
              p-4
              flex
              justify-between
              items-center
              "
            >

              <div>

                <h3
                  className="
                  font-semibold
                  text-lg
                  "
                >
                  {client.firstName}
                  {" "}
                  {client.lastName}
                </h3>

                <p
                  className="
                  text-gray-600
                  "
                >
                  {client.city}
                </p>

                <p
                  className="
                  text-sm
                  text-gray-500
                  "
                >
                  {client.statusTag}
                </p>

              </div>

              <Link
                to={`/clients/${client._id}`}
                className="
                bg-blue-600
                text-white
                px-4
                py-2
                rounded
                "
              >
                View
              </Link>

            </div>

          ))}

        </div>

      </div>

    </div>

    </AppLayout>

  );
}