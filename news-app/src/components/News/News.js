import React, { useEffect, useState } from 'react';
import "./News.css"; // Import CSS file for styling

const News = () => {
    const [mynews, setMyNews] = useState([]); // State to store news articles
    const [error, setError] = useState(null); // State to store error message

    // Function to fetch news data from the API
    const fetchData = async () => {
        try {
            let response = await fetch("https://newsapi.org/v2/top-headlines?country=in&apiKey=236deaff066c4344a4705d10f1d40914");
            // Check if response is not ok (status code other than 200)
            if (!response.ok) {
                throw new Error('Failed to fetch news. Please try again later.');
            }
            let data = await response.json(); // Parse response JSON
            let articlesWithImages = data.articles.filter(article => article.urlToImage); // Filter articles with images
            setMyNews(articlesWithImages); // Update state with filtered articles
        } catch (error) {
            setError(error.message); // Store error message in state
        }
    };

    // Effect to fetch news data when component mounts
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='mainDiv'>
            {/* Conditional rendering to display error message if present */}
            {error ? (
                <div className="error-message">{error}</div>
            ) : (
                // Mapping through news articles to display each article as a card
                mynews.map((ele, index) => (
                    <div className="card" key={index}>
                        <img src={ele.urlToImage} className="card-img-top" alt={ele.title} />
                        <div className="card-body">
                            <h5 className="card-title">{ele.title}</h5>
                            <p className="card-text">{ele.description}</p>
                            <a href={ele.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Read more</a>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default News;
