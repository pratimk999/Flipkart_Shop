import React from "react";
import "../styling/myCard.css";

const MyCard = (props) => {
  return (
    <div className="card" {...props}>
      {(props.headerLeft || props.headerRight) && (
        <div className="cardHeader">
          {props.headerLeft && (
            <div
              style={{
                alignSelf: "center",
                fontSize: "20px",
                fontWeight: "500",
              }}
            >
              {props.headerLeft}
            </div>
          )}
          {props.headerRight && props.headerRight}
        </div>
      )}

      {props.children}
    </div>
  );
};

export default MyCard;
