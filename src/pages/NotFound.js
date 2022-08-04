import React from "react";
import { useParams } from "react-router-dom";

function NotFound() {
  const params = useParams();

  return (
    <div>
      <p>OOPS PAGE NOT FOUND</p>
    </div>
  );
}

export default NotFound;
