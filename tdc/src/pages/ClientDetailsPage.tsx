// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { api } from "../api/clientApi";

// interface Client {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   city: string;
//   religion: string;
//   designation: string;
//   familyValues: string;
//   statusTag: string;
//   notes: string[];
// }

// export default function ClientDetailsPage() {
//   const { id } = useParams();

//   const [client, setClient] = useState<Client | null>(null);

//   const [loading, setLoading] = useState(true);

//   const [newNote, setNewNote] = useState("");

//   const fetchClient = async () => {
//     try {
//       const response = await api.get(`/clients/${id}`);
//       setClient(response.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchClient();
//   }, [id]);

//   const addNote = async () => {
//     if (!newNote.trim()) return;

//     try {
//       await api.post(`/clients/${id}/notes`, {
//         note: newNote,
//       });

//       setNewNote("");

//       fetchClient();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="p-8">
//         <h1>Loading...</h1>
//       </div>
//     );
//   }

//   if (!client) {
//     return (
//       <div className="p-8">
//         <h1>Client not found</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-8">

//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold">
//           {client.firstName} {client.lastName}
//         </h1>

//         <Link
//           to="/"
//           className="bg-gray-600 text-white px-4 py-2 rounded"
//         >
//           Back
//         </Link>
//       </div>

//       {/* Client Info */}
//       <div className="border rounded-lg p-6 shadow mb-8">

//         <h2 className="text-xl font-semibold mb-4">
//           Profile Information
//         </h2>

//         <div className="grid grid-cols-2 gap-4">

//           <div>
//             <strong>Status:</strong> {client.statusTag}
//           </div>

//           <div>
//             <strong>City:</strong> {client.city}
//           </div>

//           <div>
//             <strong>Religion:</strong> {client.religion}
//           </div>

//           <div>
//             <strong>Profession:</strong> {client.designation}
//           </div>

//           <div>
//             <strong>Family Values:</strong> {client.familyValues}
//           </div>

//         </div>
//       </div>

//       {/* Notes */}
//       <div className="border rounded-lg p-6 shadow mb-8">

//         <h2 className="text-xl font-semibold mb-4">
//           Notes
//         </h2>

//         {client.notes?.length > 0 ? (
//           <ul className="space-y-2 mb-4">
//             {client.notes.map((note, index) => (
//               <li
//                 key={index}
//                 className="border rounded p-2"
//               >
//                 {note}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="mb-4 text-gray-500">
//             No notes available.
//           </p>
//         )}

//         <div className="flex gap-2">

//           <input
//             type="text"
//             value={newNote}
//             onChange={(e) =>
//               setNewNote(e.target.value)
//             }
//             placeholder="Enter a note..."
//             className="
//               flex-1
//               border
//               rounded
//               px-3
//               py-2
//             "
//           />

//           <button
//             onClick={addNote}
//             className="
//               bg-green-600
//               text-white
//               px-4
//               py-2
//               rounded
//             "
//           >
//             Add Note
//           </button>

//         </div>

//       </div>

//       {/* Actions */}
//       <div className="flex gap-4">

//         <Link
//           to={`/clients/${client._id}/matches`}
//           className="
//             bg-blue-600
//             text-white
//             px-6
//             py-3
//             rounded
//           "
//         >
//           Find Matches
//         </Link>

//       </div>

//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api/clientApi";
import AppLayout from "../components/AppLayout";

interface Client {
_id: string;

firstName: string;
lastName: string;

gender: string;
dob: string;

city: string;
country: string;

religion: string;
caste: string;

motherTongue: string;

degree: string;
college: string;

company: string;
designation: string;
income: number;

familyType: string;
familyValues: string;
siblings: number;

dietaryPreference: string;
smokingHabits: string;
drinkingHabits: string;

wantKids: string;
openToRelocate: string;
openToPets: string;

maritalStatus: string;

languagesKnown: string[];

rashi: string;
manglik: string;

statusTag: string;

notes: string[];
}

export default function ClientDetailsPage() {

const { id } = useParams();

const [client, setClient] =
useState<Client | null>(null);

const [loading, setLoading] =
useState(true);

const [newNote, setNewNote] =
useState("");

const [status, setStatus] =
useState("");

const calculateAge = (
dob: string
) => {


const birthDate =
  new Date(dob);

const today =
  new Date();

let age =
  today.getFullYear() -
  birthDate.getFullYear();

const monthDiff =
  today.getMonth() -
  birthDate.getMonth();

if (
  monthDiff < 0 ||
  (
    monthDiff === 0 &&
    today.getDate() <
    birthDate.getDate()
  )
) {
  age--;
}

return age;


};

const getStatusColor = (
status: string
) => {


switch (status) {

  case "New":
    return "bg-blue-100 text-blue-700";

  case "Profile Verified":
    return "bg-yellow-100 text-yellow-700";

  case "Active Search":
    return "bg-green-100 text-green-700";

  case "Matched":
    return "bg-purple-100 text-purple-700";

  default:
    return "bg-gray-100 text-gray-700";
}


};

const fetchClient = async () => {

try {

  const response =
    await api.get(
      `/clients/${id}`
    );

  setClient(
    response.data
  );

  setStatus(
    response.data.statusTag
  );

} catch (error) {

  console.log(error);

} finally {

  setLoading(false);

}


};

useEffect(() => {


fetchClient();


}, [id]);

const addNote = async () => {


if (!newNote.trim()) {
  return;
}

try {

  await api.post(
    `/clients/${id}/notes`,
    {
      note: newNote
    }
  );

  setNewNote("");

  fetchClient();

} catch (error) {

  console.log(error);

}


};

const updateStatus =
async () => {


  try {

    await api.patch(
      `/clients/${id}/status`,
      {
        statusTag: status
      }
    );

    fetchClient();

  } catch (error) {

    console.log(error);

  }
};


if (loading) {


return (
  <AppLayout>
    <h1>Loading...</h1>
  </AppLayout>
);


}

if (!client) {


return (
  <AppLayout>
    <h1>Client Not Found</h1>
  </AppLayout>
);

}

return (


<AppLayout>

  <div className="max-w-7xl mx-auto">

    <div className="bg-white rounded-xl shadow p-6 mb-6">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold">
            {client.firstName}
            {" "}
            {client.lastName}
          </h1>

          <p className="text-gray-600 mt-2">
            {client.designation}
          </p>

        </div>

        <div className="flex gap-3">

          <Link
            to="/clients"
            className="
            bg-gray-500
            text-white
            px-4
            py-2
            rounded
            "
          >
            Back
          </Link>

          <Link
            to={`/clients/${client._id}/matches`}
            className="
            bg-blue-600
            text-white
            px-4
            py-2
            rounded
            "
          >
            Find Matches
          </Link>

        </div>

      </div>

      <div className="mt-4">

        <span
          className={`
          px-3
          py-1
          rounded-full
          text-sm
          ${getStatusColor(
            client.statusTag
          )}
          `}
        >
          {client.statusTag}
        </span>

      </div>

    </div>

    <div className="bg-white rounded-xl shadow p-6 mb-6">

      <h2 className="text-xl font-bold mb-4">
        Matchmaking Status
      </h2>

      <div className="flex gap-3">

        <select
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value
            )
          }
          className="
          border
          rounded
          px-3
          py-2
          "
        >
          <option>New</option>

          <option>
            Profile Verified
          </option>

          <option>
            Active Search
          </option>

          <option>
            Matched
          </option>

        </select>

        <button
          onClick={updateStatus}
          className="
          bg-green-600
          text-white
          px-4
          rounded
          "
        >
          Update Status
        </button>

      </div>

    </div>

    <div className="grid lg:grid-cols-2 gap-6">

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          Personal Information
        </h2>

        <div className="space-y-2">
          <p><strong>Gender:</strong> {client.gender}</p>
          <p><strong>Age:</strong> {calculateAge(client.dob)}</p>
          <p><strong>City:</strong> {client.city}</p>
          <p><strong>Country:</strong> {client.country}</p>
          <p><strong>Religion:</strong> {client.religion}</p>
          <p><strong>Caste:</strong> {client.caste}</p>
          <p><strong>Mother Tongue:</strong> {client.motherTongue}</p>
          <p><strong>Marital Status:</strong> {client.maritalStatus}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          Education & Career
        </h2>

        <div className="space-y-2">
          <p><strong>Degree:</strong> {client.degree}</p>
          <p><strong>College:</strong> {client.college}</p>
          <p><strong>Company:</strong> {client.company}</p>
          <p><strong>Designation:</strong> {client.designation}</p>
          <p><strong>Income:</strong> ₹{client.income}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          Family Information
        </h2>

        <div className="space-y-2">
          <p><strong>Family Type:</strong> {client.familyType}</p>
          <p><strong>Family Values:</strong> {client.familyValues}</p>
          <p><strong>Siblings:</strong> {client.siblings}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          Lifestyle
        </h2>

        <div className="space-y-2">
          <p><strong>Diet:</strong> {client.dietaryPreference}</p>
          <p><strong>Smoking:</strong> {client.smokingHabits}</p>
          <p><strong>Drinking:</strong> {client.drinkingHabits}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          Partner Preferences
        </h2>

        <div className="space-y-2">
          <p><strong>Want Kids:</strong> {client.wantKids}</p>
          <p><strong>Relocate:</strong> {client.openToRelocate}</p>
          <p><strong>Pets:</strong> {client.openToPets}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          Additional Information
        </h2>

        <div className="space-y-2">
          <p><strong>Rashi:</strong> {client.rashi}</p>
          <p><strong>Manglik:</strong> {client.manglik}</p>

          <div>
            <strong>Languages:</strong>

            <div className="flex gap-2 flex-wrap mt-2">

              {client.languagesKnown?.map(
                (language) => (

                  <span
                    key={language}
                    className="
                    bg-slate-200
                    px-2
                    py-1
                    rounded-full
                    text-sm
                    "
                  >
                    {language}
                  </span>

                )
              )}

            </div>

          </div>

        </div>

      </div>

    </div>

    <div className="bg-white rounded-xl shadow p-6 mt-6">

      <h2 className="text-xl font-bold mb-4">
        Notes
      </h2>

      <div className="space-y-3 mb-4">

        {client.notes?.map(
          (note, index) => (

            <div
              key={index}
              className="
              border-l-4
              border-blue-500
              bg-slate-50
              p-3
              "
            >
              {note}
            </div>

          )
        )}

      </div>

      <div className="flex gap-2">

        <input
          type="text"
          value={newNote}
          onChange={(e) =>
            setNewNote(
              e.target.value
            )
          }
          placeholder="Add note..."
          className="
          flex-1
          border
          rounded
          px-3
          py-2
          "
        />

        <button
          onClick={addNote}
          className="
          bg-blue-600
          text-white
          px-4
          rounded
          "
        >
          Add Note
        </button>

      </div>

    </div>

  </div>

</AppLayout>


);
}
