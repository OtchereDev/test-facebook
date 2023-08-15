import React from "react";
import queryString from "query-string";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { GoogleLogin } from "react-google-login";

const Facebook = () => {
  const stringifiedParams = queryString.stringify({
    client_id: "3592955034306521",
    redirect_uri: "https://www.example.com/authenticate/facebook/",
    scope: ["email"].join(","), // comma seperated string
    response_type: "code",
    auth_type: "rerequest",
    display: "popup",
  });

  const responseGoogle = async (response: any) => {
    console.log(response);
    // const url = "/api/google-login";

    // const res = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     token: response.tokenId,
    //   }),
    // });

    // if (!res.ok) return toast.error("Something went wrong... please try again");

    // const currentUser = await checkUserLoggedIn();
    // if (currentUser) {
    //   setUser(() => currentUser?.full_name);

    //   dispatch(registerUser(currentUser?.full_name));
    // }

    // router.push("/");
  };

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

      <GoogleLogin
        clientId="990750877166-rompnb60e7kqho9a4a2p2khc2dj26ebc.apps.googleusercontent.com"
        // responseType="code"
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="py-3 px-4 lg:px-7 shadow-lg w-full outline-none mx-auto rounded-md flex justify-center items-center text-gray-50 bg-red-400"
          >
            <>
              <span className="ml-2 font-semibold lg:font-medium">
                Log In with Google
              </span>
            </>
          </button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        // cookiePolicy={''}
      />
    </div>
  );
};

export default Facebook;
