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
                    <h1>The Best Agriculture Market</h1>
                    <p>
                    In the world of agriculture, the landscape is ever-evolving, with numerous markets showcasing a rich tapestry of produce. However, many of these markets have undergone significant transformations over time.

The pulse of the industry beats strongly in regions where innovation meets tradition, driving a dynamic exchange of goods. From the rolling fields of grain to vibrant farmer’s markets, the agriculture sector continually adapts to meet the needs of a changing world.
                    </p>
                    <ul>
                        <li>Diverse Offerings: A variety of crops and livestock, each contributing to the local economy.</li>
                        <li>Sustainable Practices: Increasing focus on eco-friendly farming techniques that ensure the longevity of resources.</li>
                        <li>Market Access: Enhanced distribution channels that connect farmers directly to consumers.</li>
                    </ul>
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
