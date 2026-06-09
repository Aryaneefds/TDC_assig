
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api/clientApi";

interface AiMatch {
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

interface RuleMatch {
  score: number;

  reasons: string[];

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

  const [aiMatches, setAiMatches] =
    useState<AiMatch[]>([]);

  const [ruleMatches, setRuleMatches] =
    useState<RuleMatch[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [sendingId, setSendingId] =
    useState<string | null>(null);

  useEffect(() => {

    const fetchMatches =
      async () => {

        try {

          const [
            aiResponse,
            ruleResponse
          ] =
            await Promise.allSettled([

              api.get(
                `/clients/${id}/ai-matches`
              ),

              api.get(
                `/clients/${id}/matches`
              )

            ]);

          if (
            aiResponse.status ===
            "fulfilled"
          ) {

            setAiMatches(
              aiResponse.value.data
                .matches || []
            );

          }

          if (
            ruleResponse.status ===
            "fulfilled"
          ) {

            setRuleMatches(
              ruleResponse.value.data
            );

          }

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    fetchMatches();

  }, [id]);

  const sendMatch = async (
    candidateId: string,
    score: number,
    reason: string
  ) => {

    try {

      setSendingId(
        candidateId
      );

      const response =
        await api.post(
          "/matches/send",
          {
            clientId: id,
            matchedClientId:
              candidateId,
            score,
            reason
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
          Match Recommendations
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

      {/* AI Matches */}

      <h2
        className="
        text-2xl
        font-bold
        mb-4
        "
      >
        AI Recommended Matches
      </h2>

      {aiMatches.length === 0 && (

        <div
          className="
          bg-yellow-100
          border
          border-yellow-300
          p-4
          rounded
          mb-8
          "
        >
          AI recommendations are
          currently unavailable.

          Showing rule-based
          matches below.
        </div>

      )}

      <div className="grid gap-6">

        {aiMatches.map(match => (

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

            <div className="mt-4">

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
              bg-gray-100
              p-4
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
                sendMatch(
                  match.candidate._id,
                  match.score,
                  match.label
                )
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

      {/* Rule Based Matches */}

      <h2
        className="
        text-2xl
        font-bold
        mt-12
        mb-4
        "
      >
        Potential Matches
      </h2>

      <div className="grid gap-4">

        {ruleMatches.map(match => (

          <div
            key={match.candidate._id}
            className="
            border
            rounded-lg
            p-5
            "
          >

            <div className="flex justify-between">

              <h3
                className="
                text-xl
                font-semibold
                "
              >
                {match.candidate.firstName}
                {" "}
                {match.candidate.lastName}
              </h3>

              <span
                className="
                font-bold
                text-green-600
                "
              >
                {match.score}
              </span>

            </div>

            <p className="mt-2">
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

            <div className="mt-3">

              <strong>
                Compatibility Factors:
              </strong>

              <ul
                className="
                list-disc
                ml-6
                mt-2
                "
              >

                {match.reasons.map(
                  (
                    reason,
                    index
                  ) => (

                    <li key={index}>
                      {reason}
                    </li>

                  )
                )}

              </ul>

            </div>

            <button
              onClick={() =>
                sendMatch(
                  match.candidate._id,
                  match.score,
                  "Rule Based Match"
                )
              }
              disabled={
                sendingId ===
                match.candidate._id
              }
              className="
              mt-4
              bg-green-600
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

