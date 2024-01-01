import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
function Flag({ sysFlag }) {
  const [country, setCountry] = useState(null);
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/alpha/${sysFlag}`,
        );
        setCountry(response.data);
      } catch (error) {
        console.error("Error fetching country:", error);
      }
    };
    if (sysFlag) {
      fetchCountry();
    }
  }, [sysFlag]);

  return (
    <div className={"flag"}>
      {country && country[0] && country[0].flags && country[0].flags.svg && (
        <div className="div_flag">
          <img
            title={country[0].name?.common}
            className="img_flag"
            src={country[0].flags.svg}
            alt={`Flag of ${country[0].name?.common || "Unknown"}`}
          />
        </div>
      )}
    </div>
  );
}

export default Flag;
