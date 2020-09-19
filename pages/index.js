import { useState, useEffect } from "react";
import Prismic from "prismic-javascript";
import { RichText } from "prismic-reactjs";
import Link from "next/link";
import { Client } from "../prismic-configuration";
import Head from "next/head";
import Navbar from "../components/Navbar";
import useSWR from "swr";

export default function Home({ articles, answer }) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  function Reacts({ title }) {
    const { data, error } = useSWR(
      `/api/getIDfromTitle?title=${title}`,
      fetcher
    );

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading reacts...</div>;
    // render data
    return (
      <div>
        likes: {data.heart}! and rocket: {data.rocket}{" "}
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <div className="w-3/5 mx-auto">
        <h1 className="text-gray-900 text-5xl font-bold">
          Share your knowledge with the world without
          <span className="text-indigo-700"> boundaries!</span>
        </h1>

        <div>
          {articles.results.map((article, index) => (
            <div className="mb-10 p-10 shadow-2xl" key={article.uid}>
              <Link href={`article/${article.uid}`}>
                <h1 className="bold text-3xl mb-5 text-blue-600 font-semibold cursor-pointer">
                  {RichText.render(article.data.title)}
                </h1>
              </Link>
              <Reacts title={article.uid} />
              <h1 className="mb-5 text-gray-800 ">
                {" "}
                {RichText.render(article.data.details)}
              </h1>

              {RichText.asText(article.data.tags)
                .toString()
                .replace(/ /g, "")
                .split(",")
                .map((element) => (
                  <button
                    key={element}
                    className="cursor-pointer text-indigo-700 font-semibold mr-8"
                  >
                    {`#${element}`}{" "}
                  </button>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const AllTitles = ["apple", "cat"];
  const Result = [];
  const articles = await Client().query(
    Prismic.Predicates.at("document.type", "article")
  );

  //console.log(articles.results[0].uid);
  await articles.results.map((result) => {
    AllTitles.push(result.uid);
    Result.push(fetch("http://localhost:3000/api/hello"));
  });

  return {
    props: {
      articles,
      answer: JSON.parse(JSON.stringify(AllTitles)),
      results: JSON.parse(JSON.stringify(Result)),
    },
  };
}
