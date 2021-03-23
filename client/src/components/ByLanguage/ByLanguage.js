import React from "react";
import { Link } from "react-router-dom";
// importing images
import hindilogo from "../../assets/images/languages/hindi.png";
import tamillogo from "../../assets/images/languages/tamil.png";
import telgulogo from "../../assets/images/languages/telgu.png";
import englishlogo from "../../assets/images/languages/english.png";
import marathilogo from "../../assets/images/languages/marathi.png";
import bengalilogo from "../../assets/images/languages/bengali.png";
import kannadalogo from "../../assets/images/languages/kannada.png";
import malayalamlogo from "../../assets/images/languages/malayalam.png";
// scss
import "./ByLanguage.scss";

const languages = [
  {
    language: "Hindi",
    logo: hindilogo,
    urlShortHand: "hi",
  },
  {
    language: "Tamil",
    logo: tamillogo,
    urlShortHand: "ta",
  },
  {
    language: "Telgu",
    logo: telgulogo,
    urlShortHand: "te",
  },
  {
    language: "English",
    logo: englishlogo,
    urlShortHand: "en",
  },
  {
    language: "Marathi",
    logo: marathilogo,
    urlShortHand: "mr",
  },
  {
    language: "Bengali",
    logo: bengalilogo,
    urlShortHand: "bn",
  },
  {
    language: "Kannada",
    logo: kannadalogo,
    urlShortHand: "kn",
  },
  {
    language: "Malayalam",
    logo: malayalamlogo,
    urlShortHand: "ml",
  },
];

const ByLanguage = () => {
  const languageisSelected = (event) => {
    // console.log(event.target);
    const selectedLanguage = event.target.alt;
    // console.log(selectedLanguage);
  };
  return (
    <div className="bylanguage">
      <h3 className="bylanguage__title">Movies By Language</h3>
      <div className="bylanguage__img-container">
        {languages.map((singleLanguageItem, index) => {
          return (
            <Link key={index + 1} to={`/specificlanguage/${singleLanguageItem.urlShortHand}`}>
              <img
                src={singleLanguageItem.logo}
                alt={singleLanguageItem.language}
                title={singleLanguageItem.language}
                className="bylanguage__img-container__img-item"
                onClick={languageisSelected}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ByLanguage;
