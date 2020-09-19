//http://localhost:3000/api/getIDfromTitle?title=reducing-friction-making-products-that-stick

export default async (req, res) => {
  const query = ` query {
    articleIdByTitle(title:"${req.query.title}"){
      _id
      star
      rocket
      heart
      title
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
  res.json(answerJSON.data.articleIdByTitle);
};
