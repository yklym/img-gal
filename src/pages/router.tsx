import { useAuthContext } from "../components/authContext";
import { HomePage } from "./home";
import { AuthPage } from "./auth";
import { AllPageLoader } from "../components/allPageLoader";

const Router = () => {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return <AllPageLoader />;
  }

  if (isAuthenticated) {
    return <HomePage />;
  }

  //   auth page
  return <AuthPage />;
};

export { Router };
