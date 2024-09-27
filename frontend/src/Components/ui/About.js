import React from 'react';
import './css/About.css';
import img1 from "./img/1557-e-commerce-groups-welcome-rush-of-agricultural-products (1).jpg"
import img2 from "./img/WhatsApp Image 2024-09-21 at 01.51.31_83da0e81.jpg"
import img3 from "./img/WhatsApp Image 2024-09-21 at 01.51.31_496dcb39.jpg"
import img4 from "./img/WhatsApp Image 2024-09-21 at 01.51.31_d04bcecf.jpg"
import img5 from "./img/WhatsApp Image 2024-09-21 at 01.51.32_4fc912c3.jpg"

const About = () => {
    return (
        <div className="about-page">
            {/* Banner Section */}
            <section className="header-banner">
                <h1>About</h1>
            </section>

            {/* Content Section */}
            <section className="content-section">
                <div className="about-content">
                    <h2>Get to Know Us</h2>
                    <h1>WHO WE ARE</h1>
                    <p>ගොවි මිතුරු brings together a diverse team of experienced individuals who have worked across the agricultural sector in Sri Lanka and beyond. With backgrounds in both academic and practical study, we can assist with the design, build and ongoing supply for for all kinds of agricultural and horticultural projects across Sri Lanka.
                        <br></br>
                        We are proud to work in close collaboration with some of the leading greenhouse and irrigation system manufacturers in the world. Our high-quality grow tunnels, broad-spectrum irrigation systems other specialist agricultural products originate from manufacturers in Israel, Europe, Thailand, China, India and beyond.
                        <br></br>
                        Projects we have worked on include building some of the country’s largest export-orientated farms, island-wide CSR cluster farms for Sri Lanka’s largest corporations, farm-to-fork restaurants for high end resorts in Sri Lanka and the Maldives and the introduction of game-changing irrigation and fertigation systems across the country.
                        <br></br>
                        Alongside introducing Dutch seeds and technologies, ගොවි මිතුරු have also established a R&D centre in the up-country region of Sri Lanka where new varieties and methods are tested to address longstanding challenges faced by farmers and growers.
                        <br></br>
                        ගොවි මිතුරු understand the imprtance of knowledge-sharing across the industry and are proud to conduct and participate in frequent farmer outreach and training programmes throughout the country. We also frequently host international crops specialists and our farm facilities in Kadawatha and the hill country are open to visitors
                    </p>
                    
                    <button className="discover-btn">Discover More</button>
                </div>
                <div className="about-image">
                <img src={img1} a alt="Agriculture Market" />
                </div>
                
            </section>

            {/* Team Members Section */}
            <section className="team-section">
                <h2>Meet Our Farmers</h2>
                <div className="farmers-gallery">
                    <img src={img2} alt="Farmer 1" />
                    <img src={img3}  alt="Farmer 2" />
                    <img src={img4}  alt="Farmer 3" />
                    <img src={img5}  alt="Farmer 4" />
                </div>
            </section>

           
        </div>
    );
};

export default About;
