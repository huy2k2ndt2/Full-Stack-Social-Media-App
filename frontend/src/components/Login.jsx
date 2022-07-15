/* eslint-disable no-undef */
import React, { useEffect } from "react";
// import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";

import WatchVideo from "../assets/watchme.mp4";
import watchme_white from "../assets/watchme_white.png";

import { client } from "../client";

import jwtDecode from "jwt-decode";
import { v4 as uuidv4 } from "uuid";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "340557495688-2ribqrsugka69gqp4r04vabvpkpf57rq.apps.googleusercontent.com",
      callback: handleLoginSuccess,
    });

    google.accounts.id.renderButton(document.getElementById("login-google"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  const handleLoginSuccess = (response) => {
    const { credential } = response;

    const user = jwtDecode(credential);

    const { picture: imageUrl, given_name: name } = user;
    const _id = uuidv4();

    // saving the user info inthe localstorage for future access
    localStorage.setItem(
      "user",
      JSON.stringify({
        name,
        imageUrl,
        _id,
      })
    );

    // saving the user detail to sanity
    const doc = {
      _id,
      _type: "user",
      userName: name,
      image: imageUrl,
    };

    // create a client file to acces the sanity db
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  const handleLoginFailed = (err) => {
    console.log({ err });
  };

  // login contianer
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        {/* login screen video */}
        <video
          src={WatchVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
      </div>

      {/* overlay for the video */}
      <div className="absolute flex-col flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-blackOverlay">
        {/* login content */}

        {/* logo */}
        <div className="p-5">
          <img src={watchme_white} width="180px" alt="" />
        </div>

        {/* login Button */}
        <div className="shadow-2xl" id="login-google">
          {/* <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_TOKEN}
            // clientId="236167692005-eh3f7ploa06ikb2kmn1rg2dmu1l1ccso.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                type="button"
                className="bg-mainColor flex justify-center items-center p-2 rounded-lg cursor-pointer outline-none"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FcGoogle className="mr-4" /> Sign in with Google
              </button>
            )}
            onSuccess={handleLoginSuccess}
            onFailure={handleLoginFailed}
            cookiePolicy="single_host_origin"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
