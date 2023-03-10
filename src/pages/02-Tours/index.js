import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import Tours from "./Tours";

// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tours-project";

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tours.length === 0) {
    return (
      <main className="main__tours">
        <div className="title__tours">
          <h2>no tours left</h2>
          <button className="btn__tours" onClick={() => fetchTours()}>
            refresh
          </button>
        </div>
      </main>
    );
  }

  return (
    <>
      <Helmet>
        <title>Tours</title>
      </Helmet>
      <Link to="/" className="link__home">
        <FiArrowLeft size={30} className="icon-home" />
        <p className="text-home">Back to Home</p>
      </Link>
      <main className="main__tours">
        <Tours tours={tours} removeTour={removeTour} />
      </main>
    </>
  );
}

export default App;
