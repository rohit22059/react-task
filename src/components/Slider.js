import React, { useState, useEffect } from "react";
import "./Slider.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";

export default (props) => {
  const [activeSlide, setactiveSlide] = useState(props.activeSlide);

  const next = () =>{       // Move to next slide, if last move to first slide
      if(activeSlide < props.data.length - 1)
          setactiveSlide(activeSlide + 1);   // If not last slide, after click-next move to next slide
      else 
          setactiveSlide(0);                 // If last slide, after clicki-next move to initial slide
  } 

  const prev = () => {    // Move to prev slide, if first move to last slide
    if(activeSlide > 0)
        setactiveSlide(activeSlide - 1);      // If not last slide, after click-prev move to prev slide
    else 
        setactiveSlide(props.data.length-1);  // If last slide, after click-prev move to last slide
  } 
  const handleClickImage = (index) => {setactiveSlide(index); }; // Update activeSlide state to the clicked image index
  
  const handleDotClick = (index) => {setactiveSlide(index); } // // Update activeSlide state to the clicked dot index

  useEffect(() => {
    // Function to hide slides based on viewport width
    function hideSlides() {
      
      // mobile view
      if ($(window).width() <= 768) {
        console.log("Enter into mobile view port");
        $('.slide').each(function(index) {
          // Hide slides except the active slide and its adjacent slides
          if (index < activeSlide  || index > activeSlide ) {
            $(this).hide();
          } else {
            $(this).show();
          }
        });
      } else if ($(window).width() <= 992) {
        // tablet view
        console.log("Enter into tablet view port");
        $('.slide').each(function(index) {
          // Hide all slides except the active slide
          if (index < activeSlide-1 || index > activeSlide+1) {
            $(this).hide();
          } else {
            $(this).show();
          }
        });
      } else {
        // Show all slides for larger viewports
        $('.slide').show();
      }
    }

    // Initial call to hideSlides() on page load
    hideSlides();

    // Call hideSlides() whenever the window is resized
    $(window).resize(function() {
      hideSlides();
    });

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyDown);


    // Clean up event listener on component unmount
    return () => {
      $(window).off('resize');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeSlide]); // Call useEffect whenever activeSlide changes


  // Handling with keyboard, next and prev
  const handleKeyDown = (event) => {
    if (event.keyCode === 37) {
      // Left arrow key
      prev();
    } else if (event.keyCode === 39) {
      // Right arrow key
      next();
    }
  };

  // Different conditions handling to show the slider and circular handling
  const slideStyles = (index) => { 
    const totalItems = props.data.length;                         
    if (activeSlide === index){
      // console.log("active="+activeSlide + " index="+index);
      return {
        opacity: 1,
        transform: "translateX(0px) translateZ(0px)",
        zIndex: 10
      };
    }
    else if ((activeSlide - 1 + totalItems) % totalItems === index){ 
      // console.log("active-1="+(activeSlide-1) + " index="+index);
      return {
        opacity: 1,
        transform: "translateX(-250px) translateZ(-250px)",
        zIndex: 9
      };
    }
    else if ((activeSlide + 1) % totalItems ===index){
      // console.log("active+1="+(activeSlide+1) + " index="+index);
      return {
        opacity: 1,
        transform: "translateX(250px) translateZ(-250px)",
        zIndex: 9
      };
    }
    else if ((activeSlide - 2 + totalItems) % totalItems === index){
      // console.log("active-2="+(activeSlide-2) + " index="+index);
      return {
        opacity: 1,
        transform: "translateX(-500px) translateZ(-500px)",
        zIndex: 8
      };
    }
    else if ((activeSlide + 2) % totalItems === index ){ 
      // console.log("active+2="+(activeSlide+2) + " index="+index);
      return {
        opacity: 1,
        transform: "translateX(500px) translateZ(-500px)",
        zIndex: 8
      };
    }
    else if (index < (activeSlide - 2 + totalItems) % totalItems ){
      // console.log("active-2<"+(activeSlide-2 )+ " index="+index);
      return {
        opacity: 0,
        transform: "translateX(-500px) translateZ(-500px)",
        zIndex: 7
      };
    }
    else if (index > (activeSlide + 2) % totalItems){
      // console.log("active+2>"+(activeSlide+2) + " index="+index);
      return {
        opacity: 0,
        transform: "translateX(500px) translateZ(-500px)",
        zIndex: 7
      };
    }
  };


  return (
    <>
      {/* carousel slides */}
      <div className="featured-container">
        <h2 className="header">Featured Products</h2>
        <p className="subHeader">Explore and discover a variety of products</p>
      </div>
      <div className="slideContainer">
        {props.data.map((item, i) => (
          <React.Fragment key={item.id}>
            <div 
              className="slide"
              style={{
                background: item.bgColor,
                boxShadow: `0 5px 20px ${item.bgColor}30`,
                ...slideStyles(i)
              }}
            >
              <SliderContent {...item} index={i} onClickImage={handleClickImage} />
            </div>
          </React.Fragment>
        ))}
      </div>
      {/* carousel slides*/}

      <div className="btns">
        <FontAwesomeIcon className="btn" onClick={prev} icon={faArrowLeftLong} color="#7b7b7b" size="1x" />
        <Dots data={props.data} activeSlide={activeSlide} onClickDot={handleDotClick} />
        <FontAwesomeIcon className="btn" onClick={next} icon={faArrowRightLong} color="#7b7b7b" size="1x" />
        
      </div>
    </>
  );
};

// Handle slide-content image and overlay
const SliderContent = (props) => {
    const handleClick = () => {
        // Call the onClickImage function passed from the parent component
        props.onClickImage(props.index);
      };
  return (
    <div className="sliderContent">
      <div className="card">
        <img src={props.image} alt={props.title} onClick={handleClick} style={{ cursor: "pointer" }} />
        <div className="overlay">{props.desc}</div>
      </div>
    </div>
  );
};

// Handle dots below slider 
const Dots = ({ data, activeSlide, onClickDot }) => {
    return (
      <div className="dots">
        {data.map((_, index) => (
          <span
            key={index}
            className={activeSlide === index ? "dot active" : "dot"}
            onClick={()=> onClickDot(index) }
          ></span>
        ))}
      </div>
    );
  };