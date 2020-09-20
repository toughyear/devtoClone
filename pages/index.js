import Prismic from "prismic-javascript";
import { RichText } from "prismic-reactjs";
import Link from "next/link";
import { Client } from "../prismic-configuration";
import Head from "next/head";
import Navbar from "../components/Navbar";
import useSWR from "swr";
import { AiFillHeart } from "react-icons/ai";
import { BiRocket } from "react-icons/bi";

export default function Home({ articles }) {
  // define a fetcher (here a basic fectch) for SWR. You can also use Axios
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  // React functional component that returns div with Reacts fetched from FaunaDB via the NextJS API routes
  function Reacts({ title }) {
    const { data, error } = useSWR(
      `/api/getIDfromTitle?title=${title}`,
      fetcher
    );

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading reacts...</div>;
    // render data
    return (
      <div className="flex items-center text-indigo-700 my-5">
        <h1 className="mr-20">
          <AiFillHeart className="inline text-red-400 mr-2 text-xl" />{" "}
          {data.heart} Likes{" "}
        </h1>
        <h1>
          <BiRocket className="inline text-red-400 mr-2 text-xl" />{" "}
          {data.rocket} Shares{" "}
        </h1>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Dev.to Clone</title>
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
              <h1 className="mb-5 text-gray-800 ">
                {" "}
                {RichText.render(article.data.details)}
              </h1>
              <Reacts title={article.uid} />

              <div className="flex justify-between">
                <div>
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

                <Link href={`article/${article.uid}`}>
                  <button className="bg-gray-900 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-md cursor-pointer">
                    Read Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// getServerSideProps is called each time you make a new request for the page/refresh
export async function getServerSideProps() {
  //fetch articles from Prismic CMS
  const articles = await Client().query(
    Prismic.Predicates.at("document.type", "article")
  );

  return {
    props: {
      articles,
    },
  };
}
