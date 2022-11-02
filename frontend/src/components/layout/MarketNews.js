import React, {useEffect, useState} from 'react';
import styles from '../pages/styles/company.module.css'
import axios from 'axios';

export default function MarketNews () {

    const [news, setNews] = useState()

    useEffect(()=> {
        
        /*axios.get(`https://finnhub.io/api/v1/news?category=general&token=cd4pfi2ad3i98jhu32i0cd4pfi2ad3i98jhu32ig`, 
        {withCredentials: false})
        .then((response)=> {
            setNews([response.data[Math.floor(Math.random() * 99)], response.data[Math.floor(Math.random() * 99)]])
            console.log(news)
        })
        .catch((error)=> {
            console.log(error)
        })*/

        setNews([
            {
              "headline": "Kroger has to win over Wall Street and Washington on its Albertsons deal – here's how it plans to do that",
              "image": "https://image.cnbcfm.com/api/v1/image/107104116-1660590301443-gettyimages-1415035613-l1002589_f7f2e8ae-9fe5-4a55-905b-145c7287285c.jpeg?v=1665770108&w=1920&h=1080",
              "summary": "Kroger and Albertsons must persuade federal regulators, investors and shoppers that the deal is beneficial.",
              "url": "https://www.cnbc.com/2022/10/14/albertsons-deal-how-kroger-plans-to-win-over-regulators-investors.html",
              "id": 7190722
            
            },
            {
              "headline": "Morgan Stanley's decline on Q3 results is too severe and may lead to a buying opportunity",
              "image": "https://image.cnbcfm.com/api/v1/image/107121163-16636733462022-09-20t110046z_916998079_rc2ykw94dd2c_rtrmadp_0_usa-sec-morganstanley.jpeg?v=1665768404&w=1920&h=1080",
              "summary": "The stock was punished too harshly for the quarter, given this year's tough macroeconomic backdrop and terrible equity market.",
              "url": "https://www.cnbc.com/2022/10/14/morgan-stanleys-decline-on-q3-results-is-too-severe-and-may-lead-to-a-buying-opportunity.html",
              "id": 7190750,
            }])

    }, [])

    return (<>
        <div className={styles.market}>

            <h2>How Is the Market Today? 📊</h2>

            {news ? news.map(news => (
            <div className={styles.news_card} key={news.id}>
                <h4 >{news.headline}</h4>
                <a href={news.url}><img src={news.image} alt="News" /></a>   
                <p>{news.summary}</p>
            </div>)) : 'No News here'}

        </div>
    </>)
}