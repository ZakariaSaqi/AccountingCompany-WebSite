import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersCount } from "../redux/apiCalls/userCalls";
import { getBlogsCount } from "../redux/apiCalls/blogCalls";
import { getServicesCount } from "../redux/apiCalls/serviceCalls";
import { getCommentsCount } from "../redux/apiCalls/commentCalls";
import { getTestimoniesCount } from "../redux/apiCalls/testimonyCalls";
function CounterBox({ iconClass, initialValue, label }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startValue = 0;
    const animationDuration = 4000;
    const stepDuration = 16; // approximately 60 frames per second

    const increment = Math.ceil(
      (initialValue / animationDuration) * stepDuration
    );

    const interval = setInterval(() => {
      startValue += increment;
      if (startValue >= initialValue) {
        startValue = initialValue;
        clearInterval(interval);
      }
      setCount(startValue);
    }, stepDuration);

    return () => clearInterval(interval);
  }, [initialValue]);

  return (
    <div className="counter col-md-4">
      <div  class="single_counter py-2 mt-1 d-flex align-items-center flex-column">
      <i className={iconClass}></i>
      <h2 class=" text-dark-blue">{count}</h2>
        <p>{label}</p>
      </div>
    </div>
  );
}
function Counters() {
  const { servicesCount} = useSelector(state => state.service)
  const {  userCount } = useSelector((state) => state.user);
  const {  blogsCount } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersCount())
    dispatch(getBlogsCount())
    dispatch(getServicesCount())
  },[])
  return (
    <div className="container"  data-aos="fade-left">
      <div className="row mt-4 py-4 d-flex justify-content-center">
      <div className="col-md-4 d-flex justify-content-center">
      <CounterBox
      iconClass="fa-solid fa-list-check text-dark-blue"
            initialValue={servicesCount}
            label="Services"
          />
        </div>
        <div className="col-md-4 d-flex justify-content-center">
        <CounterBox
        iconClass="fa-solid fa-users text-dark-blue"
            initialValue={userCount}
            label="Utilisateurs"
          />
           
        </div>
        <div className="col-md-4 d-flex justify-content-center">
        <CounterBox
         iconClass="fa-solid fa-newspaper text-dark-blue"
            initialValue={blogsCount}
            label="Posts"
          />
        </div>
        
      </div>
    </div>
  );
}

export default Counters;
