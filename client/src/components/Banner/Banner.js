import React,{ useState, useEffect } from "react";
// api,scss
import myaxios from "../../APIS/myaxios";
import "./Banner.scss";

let img_url_start = "https://image.tmdb.org/t/p/original/";
let slideIndex = 0;
const Banner = (props) => {
  const [isfetched, setIsFetched] = useState(false);
  const [bannerData, setBannerData] = useState([]);
  // console.log(props)
  useEffect(async () => {
    const request = await myaxios.get(props.fetchUrl);
    // console.log(request.data.results);
    setBannerData(request.data.results);
    setIsFetched(true);
  }, []);
  useEffect(() => {
    showSlides();
  }, [isfetched]);

  const showSlides = () => {
    let index;
    let allSlides = document.getElementsByClassName("banner__single-item");
    // console.log(allSlides.length);
    if (allSlides.length >= 1) {
      for (index = 0; index < allSlides.length; index++) {
        allSlides[index].classList.add("hideItem");
      }
      slideIndex++;
      if (slideIndex > allSlides.length) {
        slideIndex = 1;
      }
      //   console.log(allSlides.length);
      allSlides[slideIndex - 1].classList.toggle("hideItem");
      allSlides[slideIndex - 1].classList.toggle("showItem");

      setTimeout(showSlides, 5000);
    }
  };

  return (
    <header className="banner">
      {bannerData.map((singleItemOfBanner) => {
        return (
          <div
            className="banner__single-item"
            key={singleItemOfBanner.id}
            title={singleItemOfBanner.title}
          >
            <h4 className="banner__single-item__title">
              {singleItemOfBanner.title || singleItemOfBanner.name}
            </h4>
            <img
              src={`${img_url_start}${singleItemOfBanner.backdrop_path}`}
              alt={singleItemOfBanner.title}
              className="banner__single-item__image"
            />
          </div>
        );
      })}
    </header>
  );
};

export default Banner;
