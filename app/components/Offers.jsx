import React from 'react';

export default function PrimeProductSection() {
  return (
    <section className="primeSection">
      <style dangerouslySetInnerHTML={{ __html: `
        .primeSection {
          position: relative;
          width: 100%;
          min-height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #ffffff; 
          padding: 40px 24px;
          overflow: hidden;
          box-sizing: border-box;
        }

        .patternOverlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          /* 1. Adjusted to 'repeat' and 'contain' to ensure your logo pattern duplicates across the background */
          background-image: url('/assets/pattern-gelatin-01.webp');
          background-position: center;
          background-repeat: repeat;
          background-size: contain; 
          background-attachment: fixed;
          /* 2. Cranked opacity up to 100% visibility so it is impossible to miss */
          opacity: 1.0; 
          z-index: 1;
        }

        .contentContainer {
          position: relative;
          max-width: 950px;
          margin: 0 auto;
          text-align: center;
          z-index: 2; 
          /* 3. Added a soft text-shadow to ensure readability if the background gets busy */
          text-shadow: 0px 2px 4px rgba(255, 255, 255, 0.8);
        }

        .heading {
          color: #111827; 
          font-weight: 800;
          text-transform: uppercase;
          line-height: 1.3;
          letter-spacing: 0.04em;
          margin: 0;
          font-size: 2rem; 
        }

        .subHeading {
          display: block; 
          margin-top: 6px;
          color: #374151; 
          font-weight: 700;
        }

        /* --- Responsive Viewports --- */
        @media (max-width: 1024px) {
          .heading {
            font-size: 1.75rem;
          }
          .primeSection {
            min-height: 200px;
            padding: 35px 20px;
          }
        }

        @media (max-width: 640px) {
          .heading {
            font-size: 1.35rem;
            letter-spacing: 0.02em;
          }
          .primeSection {
            min-height: 180px;
            padding: 30px 16px;
          }
          .patternOverlay {
            background-attachment: scroll; 
          }
        }
      `}} />

      <div className="patternOverlay"></div>
      
      <div className="contentContainer">
        <h2 className="heading">
          We offer our customers a prime product
          <span className="subHeading">
            that represents the spearhead of the industry.
          </span>
        </h2>
      </div>
    </section>
  );
}