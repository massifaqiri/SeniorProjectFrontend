import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image'
import "./styles/Slideshow.css";

// This component handles the slideshow on the home page. The images are imported from AWS S3. 
// The component utilizes Carousel from React-Bootstrap. 
function ControlledCarousel() {
    const [index, setIndex] = React.useState(0);
    const [direction, setDirection] = React.useState(null);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
      setDirection(e.direction);
    };
  
    return (
      <Carousel activeIndex={index} direction={direction} onSelect={handleSelect}>
        <Carousel.Item>
            <Image className="carouselImg" src="https://elasticbeanstalk-us-east-2-875968549276.s3.us-east-2.amazonaws.com/banner1.png" fluid />
        </Carousel.Item>
        <Carousel.Item>
            <Image className="carouselImg" src="https://elasticbeanstalk-us-east-2-875968549276.s3.us-east-2.amazonaws.com/banner_2.png" fluid />
        </Carousel.Item>
      </Carousel>
    );
  }

export default ControlledCarousel;