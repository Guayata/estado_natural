$(".grid--view-items").slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }

  ]
});
$(".slider-thumbnails-nav").slick({
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
      }
    },
    {
      breakpoint: 600,
      settings: {
         slidesToShow: 3,
          slidesToScroll: 1,
      }
    },
    {
      breakpoint: 480,
      settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
      }
    }

  ]
});

