//http://localhost:3000/api/getArticlefromID?id=277017224523284993

export default async (req, res) => {
  const query = `query{
        findArticleByID(id:"${req.query.id}"){
          title
          star
          rocket
          heart
        }
      }`;

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
  res.json(answerJSON.data.findArticleByID);
};
