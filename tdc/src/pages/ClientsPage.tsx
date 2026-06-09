import { useEffect, useState } from "react";
import { api } from "../api/clientApi";
import type { Client } from "../types/client";
import { Link } from "react-router-dom";
import AppLayout from "../components/AppLayout";
const ClientsPage = () => {

  const [clients, setClients] =
    useState<Client[]>([]);

      const [page, setPage] = useState(1);

      const PAGE_SIZE = 10;
      const startIndex =
  (page - 1) * PAGE_SIZE;

const endIndex =
  startIndex + PAGE_SIZE;

const currentClients =
  clients.slice(
    startIndex,
    endIndex
  );

const totalPages =
  Math.ceil(
    clients.length /
    PAGE_SIZE
  );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchClients =
      async () => {

        try {

          const response =
            await api.get("/clients");

          setClients(response.data);
          console.log(response)

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    fetchClients();

  }, []);

  if (loading) {
    return (
      <h1 className="p-8">
        Loading...
      </h1>
    );
  }

  return (
    <AppLayout>
    <div className="p-8">


      

      <h1
        className="
        text-3xl
        font-bold
        mb-6"
      >
        TDC Matchmaker Dashboard
      </h1>

      <div
        className="
        grid
        gap-4"
      >

        {currentClients.map(client => (

          <div
            key={client._id}
            className="
            border
            rounded-lg
            p-4
            shadow"
          >

            <h2
              className="
              text-xl
              font-semibold"
            >
              {client.firstName}
              {" "}
              {client.lastName}
            </h2>

            <p>
              {client.city}
            </p>

            <p>
              Status:
              {" "}
              {client.statusTag}
            </p>
            
            {client && client._id ? (
            <Link
            to={`/clients/${client._id}`}
            className="
                bg-blue-600
                text-white
                px-4
                py-2
                rounded
                inline-block
                mt-3
            "
            >
            View Profile
            </Link>
            ) : (
            <span className="text-gray-400">Loading Profile...</span>
            )}

          </div>

        ))}

        <div
  className="
  flex
  justify-center
  items-center
  gap-4
  mt-8
  "
>

  <button
    onClick={() =>
      setPage(page - 1)
    }
    disabled={page === 1}
    className="
    px-4
    py-2
    bg-gray-200
    rounded
    disabled:opacity-50
    "
  >
    Previous
  </button>

  <span>
    Page {page} of {totalPages}
  </span>

  <button
    onClick={() =>
      setPage(page + 1)
    }
    disabled={
      page === totalPages
    }
    className="
    px-4
    py-2
    bg-gray-200
    rounded
    disabled:opacity-50
    "
  >
    Next
  </button>

</div>

      </div>

    </div>

    </AppLayout>
  );
};

export default ClientsPage;