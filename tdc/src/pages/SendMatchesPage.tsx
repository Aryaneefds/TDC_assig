import { useEffect, useState } from "react";
import { api } from "../api/clientApi";
import AppLayout from "../components/AppLayout"

interface Match {
  _id: string;

  clientId: {
    firstName: string;
    lastName: string;
  };

  matchedClientId: {
    firstName: string;
    lastName: string;
  };

  status: string;

  score: number;

  reason: string;
}

export default function SentMatchesPage() {

  const [matches, setMatches] =
    useState<Match[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchMatches =
      async () => {

        try {

          const response =
            await api.get("/matches");

          setMatches(
            response.data
          );

        } catch(error){

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    fetchMatches();

  }, []);

  if(loading){
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (
    <AppLayout>
    <div className="max-w-5xl mx-auto p-8">

      <h1
        className="
          text-3xl
          font-bold
          mb-8
        "
      >
        Sent Matches
      </h1>

      <div className="space-y-4">

        {matches.map(match => (

          <div
            key={match._id}
            className="
              border
              rounded-lg
              p-4
              shadow
            "
          >

            <h2
              className="
                text-xl
                font-semibold
              "
            >
              {match.clientId.firstName}
              {" "}
              {match.clientId.lastName}

              {" → "}

              {match.matchedClientId.firstName}
              {" "}
              {match.matchedClientId.lastName}
            </h2>

            <p>
              Status:
              {" "}
              {match.status}
            </p>

            <p>
              Score:
              {" "}
              {match.score}
            </p>

            <p>
              Reason:
              {" "}
              {match.reason}
            </p>

          </div>

        ))}

      </div>

    </div>

    </AppLayout>
  );
}