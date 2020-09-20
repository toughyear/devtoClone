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

  const answer = await fetch(process.env.FAUNA_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.FAUNA_TOKEN}`,
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
