import { useEffect, useState } from "react";
import { FiLink, FiCopy } from "react-icons/fi";
import { AiOutlineEnter } from "react-icons/ai";
import { useLazyGetSummaryQuery } from "../services/article";
import { BiLoaderCircle } from "react-icons/bi";

const Demo = () => {
  interface Article {
    url: string;
    summary: string;
  }

  const [article, setArticle] = useState<Article>({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  console.log(typeof allArticles);
  useEffect(() => {
    const articleFromLocalStorage = JSON.parse(
      localStorage.getItem("articles") || "[]",
    );

    articleFromLocalStorage && setAllArticles(articleFromLocalStorage);
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];
      setArticle(newArticle);
      console.log(newArticle);
      setAllArticles(updatedAllArticles);
    }
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <FiLink className="absolute left-0 my-2 ml-3 w-5" />
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e: any) =>
              setArticle({
                ...article,
                url: e.currentTarget.value,
              })
            }
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            <AiOutlineEnter />
          </button>
        </form>
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((article: Article, index: number) => {
            return (
              <div
                key={`link-${index}`}
                onClick={() => setArticle(article)}
                className="link_card"
              >
                <div className="copy_btn">
                  <FiCopy className="object-contain" />
                </div>
                <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                  {article.url}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <BiLoaderCircle className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            ERROR, please try again!
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {/* {error?.data?.error} */}
              Error
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Annotated <span className="article_gradient">Bibliography</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
