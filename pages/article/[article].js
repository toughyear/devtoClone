import { RichText } from "prismic-reactjs";
import { Client } from "../../prismic-configuration";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import useSWR from "swr";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineHeart,
  AiOutlineStar,
} from "react-icons/ai";
import { RiRocketLine, RiRocketFill } from "react-icons/ri";
import { useState } from "react";

export default function Article({ article }) {
  const [Star, setStar] = useState(false);
  const [Rocket, setRocket] = useState(false);
  const [Heart, setHeart] = useState(false);

  // define a fetcher (here a basic fectch) for SWR. You can also use Axios
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  // FaunaDB ID for this particular ID which is fetched from the API route by SWR later
  let ArticleID;

  // this function calls API routes to either decrease or increase a particular reaction
  function handleReacts(type) {
    switch (type) {
      case "star":
        setStar((prev) => !prev);
        if (Star) {
          fetch(`/api/decRxn?id=${ArticleID}&rxn=star`).then();
        } else {
          fetch(`/api/incRxn?id=${ArticleID}&rxn=star`).then();
        }
        break;
      case "rocket":
        setRocket((prev) => !prev);
        if (Rocket) {
          fetch(`/api/decRxn?id=${ArticleID}&rxn=rocket`).then();
        } else {
          fetch(`/api/incRxn?id=${ArticleID}&rxn=rocket`).then();
        }
        break;
      case "heart":
        setHeart((prev) => !prev);
        if (Heart) {
          fetch(`/api/decRxn?id=${ArticleID}&rxn=heart`).then();
        } else {
          fetch(`/api/incRxn?id=${ArticleID}&rxn=heart`).then();
        }
        break;

      default:
        break;
    }
  }

  // React functional component that gives a component which includes reacts fetched from FaunaDB
  function Reacts({ title }) {
    const { data, error } = useSWR(
      `/api/getIDfromTitle?title=${title}`,
      fetcher,
      {
        refreshInterval: 1000,
      }
    );

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading reacts...</div>;
    // render data

    //update the article ID with ID of the article fetched from FaunaDB
    ArticleID = data._id;
    return (
      <div className="flex flex-col items-center  text-indigo-700 mb-4">
        <h1 className="mb-10 text-xl " onClick={() => handleReacts("heart")}>
          {Heart ? (
            <AiFillHeart className=" text-red-400 mr-2  text-3xl " />
          ) : (
            <AiOutlineHeart className=" text-red-400 mr-2  text-3xl " />
          )}{" "}
          <span className="ml-1">{data.heart}</span>
        </h1>
        <h1 className="mb-10 text-xl" onClick={() => handleReacts("rocket")}>
          {Rocket ? (
            <RiRocketFill className=" text-red-400 mr-2  text-3xl " />
          ) : (
            <RiRocketLine className=" text-red-400 mr-2  text-3xl " />
          )}{" "}
          <span className="mx-auto"> {data.rocket}</span>
        </h1>
        <h1 className="mb-10 text-xl" onClick={() => handleReacts("star")}>
          {Star ? (
            <AiFillStar className=" text-red-400 mr-2  text-3xl " />
          ) : (
            <AiOutlineStar className=" text-red-400 mr-2 text-3xl" />
          )}{" "}
          <span className="ml-1"> {data.star}</span>
        </h1>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Dev.to : {RichText.asText(article.data.title)}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="flex w-2/3 mx-auto relative">
        <div className=" w-1/12 h-screen sticky top-0 flex flex-col justify-center">
          <Reacts title={article.uid} />
        </div>
        <div className="w-11/12">
          <h1 className="text-3xl uppercase font-bold opacity-50 my-10">
            {RichText.render(article.data.title)}
          </h1>

          <h1 className="text-lg opacity-75">
            {RichText.render(article.data.content)}
          </h1>
          <Link href="/">
            <button
              className="bg-black text-white py-3 px-10 my-4 text-lg uppercase
                   "
            >
              {" "}
              Back to home &nbsp; 👈
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// this gets called on each new request
export async function getServerSideProps(context) {
  // fetch a particular article from Prismic CMS
  const article = await Client().getByUID("article", context.query.article);

  return {
    props: {
      article: article,
    },
  };
}
