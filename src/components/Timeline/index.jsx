import { useEffect, useState } from "react";
import moment from "moment";

const Timeline = ({ timeUpdate1, sys, weather, name }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [formattedTime, setFormattedTime] = useState(
    moment(timeUpdate1, "DD-MM-YYYY HH:mm:ss").format("HH:mm:ss"),
  );

  useEffect(() => {
    setFormattedTime(
      moment(timeUpdate1, "DD-MM-YYYY HH:mm:ss").format("HH:mm:ss"),
    );
  }, [timeUpdate1]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());

      const newFormattedTime = moment(formattedTime, "HH:mm:ss")
        .add(1, "seconds")
        .format("HH:mm:ss");
      setFormattedTime(newFormattedTime);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [formattedTime]);

  return (
    <div className="itens_prim">
      <p>{formattedTime}</p>
      <p>{sys}</p>
      <p>{name}</p>
      <p>{weather}</p>
    </div>
  );
};

export default Timeline;
