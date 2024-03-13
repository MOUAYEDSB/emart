import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import ProductsComponent from "./Products";
import Footer from "./Footer";
import About from "./About";
import Contact from "./Contact";
import Services from "./Services";

const Home = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const cardSpring = useSpring({
    opacity: scrollY >= 100 ? 0 : scrollY >= 50 ? (100 - scrollY) / 10 : 1,
    transform: `translateY(${scrollY > 70 ? 100 : 0}px)`,
    config: { mass: 0.5, tension: 200, friction: 50 },
  });

  return (
    <div className="hero position-relative">
      <animated.div className="card text-white border-0" style={cardSpring}>
        <img src="/assets/hero.png" className="card-img" alt="background" />
        <div className="position-absolute  " style={{ padding: "10rem" }}>
          <div className="text-center ">
            <h5 className="card-title">NEW SEASON ARRIVALS</h5>
            <p className="card-text lead fs-1">CHECK OUT ALL THE TRENDS</p>
          </div>
        </div>
      </animated.div>
      <div>
        <About />
        <ProductsComponent />
        <Contact />
        <Services />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
