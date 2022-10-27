import React, { Component } from "react";
import NewsItem from "./NewsItem";

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
    const url =
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=71141ebf3e40495abf2a0c79d40ae792&pageSize=20";
    let data = await fetch(url);
    let parsedData = await data.json();
   console.log(parsedData.totalResults)
   console.log(parsedData.totalResults)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }
  handlePreviousClick = async () => {
    if (this.state.page - 1 < 1) {
    } else {
      const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=71141ebf3e40495abf2a0c79d40ae792&pageSize=20&page=${
        this.state.page - 1
      }`;
      let data = await fetch(url);
      let parsedData = await data.json();

      this.setState({
        articles: parsedData.articles,
        page: this.state.page - 1,
      });
    }
  };
  handleNextClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {
    } else {
      const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=71141ebf3e40495abf2a0c79d40ae792&pageSize=20&page=${
        this.state.page + 1
      }`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        page: this.state.page + 1,
      });
    }
  };
  render() {
    return (
      <div className="container my-3">
        <h1>NewsParrot -top Headline</h1>
        <div className="row">
          {this.state.articles.map(
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
