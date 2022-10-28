import React, { Component } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {
  static defaultProps = {
    category: "general",
    pageSize: 8,
    country: "in",
  };
  static propTypes = {
    category: PropTypes.string,
    pageSize: PropTypes.number,
    country: PropTypes.string,
  };
  capitalizeCategory = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeCategory(
      this.props.category
    )} - NewsParrot`;
  }
  async handleNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    this.handleNews();
  }

  fetchMoreData = async () => {
    this.props.setProgress(10);
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=71141ebf3e40495abf2a0c79d40ae792&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    let data = await fetch(url);
    this.props.setProgress(50);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  };
  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "30px" }}>
          NewsParrot - Top {this.capitalizeCategory(this.props.category)}{" "}
          Headline
        </h1>
        <div className="text-center">{this.state.loading && <Spinner />}</div>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map(
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
  }
}

export default News;
