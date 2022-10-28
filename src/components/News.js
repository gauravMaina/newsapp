import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const capitalizeCategory = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };
  const handleNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

  useEffect(() => {
    document.title = `${capitalizeCategory(props.category)} - NewsParrot`;
    handleNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    props.setProgress(10);
    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=71141ebf3e40495abf2a0c79d40ae792&pageSize=${props.pageSize}&page=${page+1}`;
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };
  return (
    <>
      <h1 className="text-center" style={{ margin: "30px",marginTop:'70px' }}>
        NewsParrot - Top {capitalizeCategory(props.category)} Headline
      </h1>
      <div className="text-center">{loading && <Spinner />}</div>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map(
              ({
                url,
                title,
                description,
                urlToImage,
                author,
                publishedAt,
                source,
              }) => {
                return (
                  <div className="col-md-4" key={url}>
                    <NewsItem
                      title={title}
                      description={description}
                      imageUrl={urlToImage}
                      newsUrl={url}
                      author={author}
                      date={publishedAt}
                      source={source.name}
                    />
                  </div>
                );
              }
            )}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};
News.defaultProps = {
  category: "general",
  pageSize: 8,
  country: "in",
};
News.propTypes = {
  category: PropTypes.string,
  pageSize: PropTypes.number,
  country: PropTypes.string,
};
export default News;
