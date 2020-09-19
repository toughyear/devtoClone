import { RichText } from "prismic-reactjs";
import { Client } from "../../prismic-configuration";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function Article({ article }) {
  return (
    <div>
      <Navbar />
      <div className="w-2/3 mx-auto">
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
  );
}

// this gets called on each request

export async function getServerSideProps(context) {
  const article = await Client().getByUID("article", context.query.article);

  return {
    props: {
      article: article,
    },
  };
}
