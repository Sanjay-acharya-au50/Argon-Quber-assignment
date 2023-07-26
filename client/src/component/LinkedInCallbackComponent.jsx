// LinkedInCallbackComponent.js
import React, { useEffect } from "react";

const LinkedInCallbackComponent = () => {
  useEffect(() => {
    const fun = async () => {
      try {
        const res = await axios("/auth/linkedin/callback");
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fun();
  }, []);

  return <div>Loading... hello there!!!</div>; // Show a loading screen, or you can leave this empty
};

export default LinkedInCallbackComponent;
