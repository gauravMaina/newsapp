import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=71141ebf3e40495abf2a0c79d40ae792&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  handlePreviousClick = async () => {
    if (!this.state.page - 1 < 1) {
      const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=71141ebf3e40495abf2a0c79d40ae792&pageSize=${
        this.props.pageSize
      }&page=${this.state.page - 1}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        page: this.state.page - 1,
        loading: false,
      });
    }
  };
  handleNextClick = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=71141ebf3e40495abf2a0c79d40ae792&pageSize=${
        this.props.pageSize
      }&page=${this.state.page + 1}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        page: this.state.page + 1,
        loading: false,
      });
    
  };
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsParrot -top Headline</h1>
        <div className="text-center">{this.state.loading ?  <Spinner />:null}</div>
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map(
              ({ url, title, description, urlToImage }) => {
                return (
                  <div className="col-md-4" key={url}>
                    <NewsItem
                      title={title}
                      description={description}
                      imageUrl={urlToImage}
                      newsUrl={url}
                    />
                  </div>
                );
              }
            )}
        </div>
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviousClick}
            disabled={this.state.page - 1 <= 0 ? true : false}
          >
            &larr;Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
