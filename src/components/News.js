import React, { Component } from 'react';
import NewsItem from '../NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor() {
        super();
        console.log("Constructor");
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async updateNews() {
        this.props.setProgress(10);
const url = `https://api.mediastack.com/v1/news?access_key=70f27d1b598e9ded8ef5980f4da61c4e&countries=${this.props.country}&categories=${this.props.category}&limit=${this.props.pageSize}&offset=${(this.state.page - 1) * this.props.pageSize}`;
        console.log("Fetching news from URL:", url);
        this.setState({ loading: true });
        let data;
        try {
            data = await fetch(url);
            if (!data.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error("Error fetching news:", error);
            this.setState({ loading: false });
            return;
        }
        this.props.setProgress(30);
let parsedData = await data.json();
console.log("Parsed Data:", JSON.stringify(parsedData, null, 2));
        this.props.setProgress(60);
        console.log(parsedData);
        this.setState({
            articles: parsedData.data,
            totalArticles: parsedData.totalResults,
            loading: false
        });
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }

    handlePrevClick = async () => {
        console.log("Previous");
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    handleNextClick = async () => {
        console.log("Next");
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    };

    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center' style={{ margin: '40px 0px' }}> HeadlineHunt - Top Headlines</h1>
                {this.state.loading && <Spinner />}
                <div className='row'>
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col md-3" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""}
                                description={element.description ? element.description.slice(0, 88) : ""}
                                imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}

                    <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>
                </div>
            </div>
        )
    }
}
