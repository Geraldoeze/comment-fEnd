import classes from "./styless.module.css";

import Image from "next/image";
import { createdAT } from "../../../data/createdAt";

const Heading = ({ currentUser, create, headData }) => {
  const imageSrc = headData.image.png;
  // This removes the dot ./ so that next can access the image from public folder
  const imageContent = imageSrc.slice(1, imageSrc.length);
  const TimeStamp = createdAT(create);
  
  return (
    <div className={classes.heading}>
      <div>
      <Image src={imageContent} width={"40px"} height={"40px"} alt="vero" />
      </div>
      <h4 className={classes.heading_name}>{headData.username}</h4>
      {currentUser[0].username === headData.username && (
        <span className={classes.creator_span}>you</span>
      )}
      <div className={classes.heading_time}>{TimeStamp}</div>
      
    </div>
  );
};

export default Heading;
