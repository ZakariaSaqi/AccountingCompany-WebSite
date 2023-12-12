import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTestimoniesAccepted } from "../../redux/apiCalls/testimonyCalls";
import TestimonyItem from "./TestimonyItem";
import FormTestimony from "./FormTestimony";

function TestimonyList() {
  const { user } = useSelector((state) => state.auth);
  const { testimonies } = useSelector((state) => state.testimony);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTestimoniesAccepted());
  }, [dispatch]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
      slidesToSlide: 2,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="container" data-aos="fade-right">
      {user ? (
        <div className="d-flex flex-column align-items-center justify-content-center py-4">
          <h2>Exprimez votre témoignage.</h2>
          <button
            data-toggle="modal"
            data-target="#addTestimony"
            data-whatever="@mdo"
            type="button"
            className="icon btn btn-lg btn-info rounded-0 text-dark-blue"
          >
            <i className="fa-solid fa-plus text-dark-blue"></i>
          </button>
        </div>
      ) : (
        <p className="text-center">Veuillez vous connecter pour exprimer votre témoignage !</p>
      )}
      {testimonies.length > 0 ? (
        <>
          <h2>Témoignages</h2>
          <Carousel showDots={false} responsive={responsive} className="py-3">
            {testimonies.map((testimony, index) => {
              if (testimony.isAccepted) {
                return <TestimonyItem index={index} testimony={testimony} />;
              }
            })}
          </Carousel>
        </>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default TestimonyList;
