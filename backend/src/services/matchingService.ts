import Client from "../models/Client";



export const calculateAge = (dob: Date): number => {
  const today = new Date();

  let age =today.getFullYear() - dob.getFullYear();

  const monthDiff =today.getMonth() - dob.getMonth();

  if (monthDiff < 0 ||(monthDiff === 0 &&today.getDate() < dob.getDate())  ) {
    age--;
  }

  return age;
};

// scoring are different for both the genders as wriiteen in the document 

// Total            100
const calculateMaleMatch = (
  client: any,
  candidate: any
) => {

  if (candidate.gender !== "Female") {
    return {
      score: 0,
      reasons: []
    };
  }

  let score = 0;

  const reasons: string[] = [];

  const clientAge =
    calculateAge(client.dob);

  const candidateAge =
    calculateAge(candidate.dob);

  // Younger

  if (candidateAge < clientAge) {
    score += 25;

    reasons.push(
      "Preferred younger age"
    );
  }

  // Shorter

  if (candidate.height <client.height) {
    score += 20;

    reasons.push(
      "Height preference"
    );
  }

  // Income

  if (candidate.income <0.6 * client.income) {
    score += 20;

    reasons.push(
      "Preferred income range"
    );
  }
  else if (
    candidate.income <
    client.income
  ) {
    score += 10;

    reasons.push(
      "Compatible income level"
    );
  }

  // Children

  if (
    client.wantKids ===
    candidate.wantKids
  ) {
    score += 20;

    reasons.push(
      "Similar views on children"
    );
  }

  // Religion

  if (
    client.religion ===
    candidate.religion
  ) {
    score += 10;

    reasons.push(
      "Same religion"
    );
  }

  // City

  if (
    client.city ===
    candidate.city
  ) {
    score += 5;

    reasons.push(
      "Same city"
    );
  }

  return {
    score,
    reasons
  };
};

const calculateFemaleMatch = (
  client: any,
  candidate: any
) => {

  if (candidate.gender !== "Male") {
    return {
      score: 0,
      reasons: []
    };
  }

  let score = 0;

  const reasons: string[] = [];

  // Profession

  if (client.designation === candidate.designation) {
    score += 25;

    reasons.push(
      "Similar profession"
    );
  }

  // Family Values

  if (client.familyValues ===candidate.familyValues) {
    score += 20;

    reasons.push(
      "Shared family values"
    );
  }

  // Relocation

  if (client.relocate ===
    candidate.relocate || client.relocate!== "No") {
    score += 20;

    reasons.push(
      "Compatible relocation preferences"
    );
  }

  // Children

  if (client.wantKids ===candidate.wantKids) {
    score += 15;

    reasons.push("Similar views on children");
  }

  // Religion

  if (client.religion ===candidate.religion) {
    score += 10;

    reasons.push(
      "Same religion"
    );
  }

  // Family Type

  if (client.familyType ===candidate.familyType) {
    score += 10;

    reasons.push(
      "Compatible family structure"
    );
  }

  return {
    score,
    reasons
  };
};

export const calculateMatchScore = (  client: any,candidate: any) => {

  if (client.gender ===candidate.gender) {
    return {
      score: 0,
      reasons: []
    };
  }

  if (client.gender === "Male") {
    return calculateMaleMatch(client,candidate);
  }

  return calculateFemaleMatch(client,candidate);
};


export const findMatches = async (clientId: string)=>{
    const client = await Client.findById(clientId);

    if(!client){ throw new Error ("Client not found")};


    // assuming that tdc dont caters other genders so matching female to male and male to tfemale only 
    const candidates =
            await Client.find({
                _id: {
                $ne: client._id
                },
                gender:
                client.gender === "Male"
                    ? "Female"
                    : "Male"
  });

    const matches = candidates.map( (candidate)=>{

        const result = calculateMatchScore(client,candidate);

        return {
            candidate,
            score: result.score,
            reasons: result.reasons
        };
    })

    return matches.sort((a,b) => b.score - a.score).slice(0,10);
}