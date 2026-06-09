import { ai } from "../config/gemini";

export const rerankTopMatches = async (
  client: any,
  matches: any[]
) => {
 console.log("Hello i am herre/n /mn \n dsufhdushfu \n");
  const simplifiedMatches =
    matches.map((match, index) => ({
      id: match.candidate._id,

      name: match.candidate.firstName,

      score: match.score,

      profession:
        match.candidate.designation,

      religion:
        match.candidate.religion,

      city:
        match.candidate.city,

      familyValues:
        match.candidate.familyValues,

      wantKids:
        match.candidate.wantKids,

      relocate:
        match.candidate.openToRelocate
    }));

    console.log("calling gemini");


  const prompt = `
You are an expert Indian matrimonial matchmaker.

CLIENT:

${JSON.stringify({
  name: client.firstName,
  gender: client.gender,
  profession: client.designation,
  religion: client.religion,
  city: client.city,
  familyValues: client.familyValues,
  wantKids: client.wantKids,
  relocate: client.openToRelocate
})}

TOP 10 MATCHES:

${JSON.stringify(simplifiedMatches)}

Analyze all candidates.

Select the BEST 3 matches.

Consider:
- Long term compatibility
- Matrimonial compatibility
- Family values
- Children preferences
- Profession compatibility
- Relocation preferences
- Religion compatibility

Return ONLY valid JSON.

Example:

[
 {
   "rank":1,
   "candidateId":"123",
   "label":"Excellent Match",
   "reason":"Strong alignment in family values and future goals"
 },
 {
   "rank":2,
   "candidateId":"456",
   "label":"High Potential Match",
   "reason":"Good compatibility with similar lifestyle preferences"
 },
 {
   "rank":3,
   "candidateId":"789",
   "label":"Good Match",
   "reason":"Compatible religion and relocation preferences"
 }
]
`;

  const response =
    await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt 
    });

  const text =
    response.text || "[]";

  const cleaned = response.text
  ?.replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

return JSON.parse(cleaned!);
};