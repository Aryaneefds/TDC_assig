import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api/clientApi";

interface Match {
  rank: number;
  label: string;
  reason: string;
  score: number;

  candidate: {
    _id: string;
    firstName: string;
    lastName: string;
    city: string;
    religion: string;
    designation: string;
  };
}

export default function MatchesPage() {
  const { id } = useParams();

  const [matches, setMatches] =
    useState<Match[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [sendingId, setSendingId] =
    useState<string | null>(null);

  useEffect(() => {

    const fetchMatches = async () => {

      try {

        const response =
          await api.get(
            `/clients/${id}/ai-matches`
          );

        setMatches(
          response.data.matches
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

    fetchMatches();

  }, [id]);

  const sendMatch = async (
    match: Match
  ) => {

    try {

      setSendingId(
        match.candidate._id
      );

      const response =
        await api.post(
          "/matches/send",
          {
            clientId: id,

            matchedClientId:
              match.candidate._id,

            score: match.score,

            reason: match.label
          }
        );

      alert(
        response.data.message
      );

    } catch (error: any) {

      alert(
        error.response?.data?.message ||
        "Failed to send match"
      );

    } finally {

      setSendingId(null);

    }
  };

  if (loading) {
    return (
      <div className="p-8">
        Loading Matches...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          AI Recommended Matches
        </h1>

        <Link
          to={`/clients/${id}`}
          className="
            bg-gray-600
            text-white
            px-4
            py-2
            rounded
          "
        >
          Back
        </Link>

      </div>

      <div className="grid gap-6">

        {matches.map(match => (

          <div
            key={match.candidate._id}
            className="
              border
              rounded-lg
              shadow
              p-6
            "
          >

            <div className="flex justify-between">

              <div>

                <h2
                  className="
                    text-2xl
                    font-semibold
                  "
                >
                  #{match.rank}
                  {" "}
                  {match.label}
                </h2>

                <h3
                  className="
                    text-xl
                    mt-2
                  "
                >
                  {match.candidate.firstName}
                  {" "}
                  {match.candidate.lastName}
                </h3>

              </div>

              <div
                className="
                  text-2xl
                  font-bold
                  text-green-600
                "
              >
                {match.score}%
              </div>

            </div>

            <div className="mt-4 space-y-2">

              <p>
                <strong>City:</strong>
                {" "}
                {match.candidate.city}
              </p>

              <p>
                <strong>Religion:</strong>
                {" "}
                {match.candidate.religion}
              </p>

              <p>
                <strong>Profession:</strong>
                {" "}
                {match.candidate.designation}
              </p>

            </div>

            <div
              className="
                mt-4
                p-4
                bg-gray-100
                rounded
              "
            >
              <strong>
                AI Reasoning:
              </strong>

              <p className="mt-2">
                {match.reason}
              </p>
            </div>

            <button
              onClick={() =>
                sendMatch(match)
              }
              disabled={
                sendingId ===
                match.candidate._id
              }
              className="
                mt-4
                bg-blue-600
                text-white
                px-5
                py-2
                rounded
              "
            >
              {
                sendingId ===
                match.candidate._id
                  ? "Sending..."
                  : "Send Match"
              }
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}