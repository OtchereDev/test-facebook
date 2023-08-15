import React from "react";
import queryString from "query-string";
import FacebookLogin from "@greatsumini/react-facebook-login";

const Facebook = () => {
  const stringifiedParams = queryString.stringify({
    client_id: "3592955034306521",
    redirect_uri: "https://www.example.com/authenticate/facebook/",
    scope: ["email"].join(","), // comma seperated string
    response_type: "code",
    auth_type: "rerequest",
    display: "popup",
  });

  const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;
  return (
    <div className="min-h-screen flex justify-center items-center">
      <FacebookLogin
        appId="3592955034306521"
        onSuccess={(response) => {
          console.log("Login Success!", response);
        }}
        onFail={(error) => {
          console.log("Login Failed!", error);
        }}
        onProfileSuccess={(response) => {
          console.log("Get Profile Success!", response);
        }}
      />
    </div>
  );
};

export default Facebook;
