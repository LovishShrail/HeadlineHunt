import React, { Component } from 'react'

export default class NewsItem extends Component {


    render() {
        let { title, description, imageUrl, newsUrl, author, date,source } = this.props;
        return (
            <div className='my-3'>
                <div className="card" style={{ width: " 18rem" }}>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{left:'90', zIndex:'1'}}>
                            {author}
                            
                        </span>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title} </h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()} | Source: {source}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}
