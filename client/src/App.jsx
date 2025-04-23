import React from "react";
import "./App.css";
import AutocorrectFail from './components/AutocorrectFail';

export default function App() {
  return (
    <div className="app-container">
      <video autoPlay loop muted className="background-video">
        <source src="/123.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="content">
        <h1 className="site-title">List of Auto-Correct Fails</h1>
        <p className="tagline">Welcome to the most hilarious collection of texting disasters!</p>

        <section className="info-section">
          <h2>What is this site about?</h2>
          <p>
            This project collects and showcases some of the funniest and weirdest auto-correct fails people have experienced. 
            It's designed to entertain, and maybe make you feel better about your own typos.
          </p>
        </section>

        <section className="info-section">
          <h2>Why this project?</h2>
          <p>
            It’s light-hearted, it’s relatable, and it gives you a fun way to work with full-stack tools, routes, databases, and more!
          </p>
        </section>
        <section className="info-section">
        <h2>failures </h2>
        <p>
           text: "Let’s meat at noon",  
           </p>                   
           <p> 
           intended: "Let’s meet at noon",       
           </p>
           <p>       
           failLevel: "moderate",
           </p>
           <p>                   
           context: "Lunch planning",
           </p>
           <p>              
           submittedBy: "funnyUser99", 
           </p>
           <p>           
           timestamp: "2025-04-23T12:00:00Z"
           </p>
           </section>
      </div>
    </div>
  );
}
