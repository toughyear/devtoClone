//http://localhost:3000/api/incRxn?id=277017224523284993&rxn=rocket

export default async (req, res) => {
  const query = `query {
        incRxn(artID:"${req.query.id}", rxnType:"${req.query.rxn}"){
          title
          star
          rocket
          heart
        }
        }
    `;

  const answer = await fetch("https://graphql.fauna.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer fnAD2HijSAACAexA7Rw7V3kNBoX2fFi6E1tlkx_T`,
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  });
  const answerJSON = await answer.json();

  res.statusCode = 200;
  res.json(answerJSON.data.incRxn);
};
