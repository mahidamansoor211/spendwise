import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../authentication/useUser";

function ProtectedRoutes({ children }) {
  const navigate = useNavigate();

  //1.load the authenticated user
  const { isAuthenticated, isLoading } = useUser();

  //2.if there's no authentication user, redirect to opening page
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("GetStarted");
    },
    [isAuthenticated, isLoading, navigate]
  );

  //3.while loading show spinner
  if (isLoading)
    return (
      <p>loading...</p>
      // <FullPage>
      //   <Spinner />
      // </FullPage>
    );

  //4. if usthere IS a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoutes;
