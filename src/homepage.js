import React, { useEffect, useState } from 'react';


const Homepage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        'https://media.istockphoto.com/id/1148925683/photo/elegant-young-woman-with-shopping-bags-standing-on-the-street.jpg?s=612x612&w=0&k=20&c=WK7PsrqiWS1uIPqpT-huPaWNS-2WtTtr3yzW6L-8JFo=', // Replace with your image paths
        'https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-05/revenge%20shopping.jpg',
        'https://media.istockphoto.com/id/1729402032/photo/an-unrecognizable-beautiful-woman-holding-her-shopping-bags.jpg?s=612x612&w=0&k=20&c=lld45QpIxSQUrhVsZLPuSC3X08jJYU6rsHT8U4l7MS0='
    
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 3000); 
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        
            <div>
           

                <main>
                    <div className="image-slider">
                        {slides.map((slide, index) => (
                            <img
                                key={index}
                                src={slide}
                                alt={`Slide ${index + 1}`}
                                className={index === currentSlide ? 'active' : ''}
                            />
                        ))}
                    </div>

                    <div className="additional-images">
                        <img src="https://img.freepik.com/free-vector/seasonal-sale-discounts-presents-purchase-visiting-boutiques-luxury-shopping-price-reduction-promotional-coupons-special-holiday-offers-vector-isolated-concept-metaphor-illustration_335657-2766.jpg?w=360" alt="Additional Image 1" /> 
                        <img src="https://www.shutterstock.com/image-vector/best-deal-sale-sticker-template-600nw-2227446359.jpg" alt="Additional Image 1" />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHRICNBHOI1q2QjD-vRbuh9pMqpVbipHhSCg&s" alt="Additional Image 1" />
                        <img src="https://img.freepik.com/free-vector/seasonal-sale-discounts-presents-purchase-visiting-boutiques-luxury-shopping-price-reduction-promotional-coupons-special-holiday-offers-vector-isolated-concept-metaphor-illustration_335657-2766.jpg?w=360" alt="Additional Image 2" />
                    
                    </div>
                </main>


            </div>
      
    );
};

export default Homepage;
