import { AuthResponse, SignInPage } from "@toolpad/core";
import { useAuthContext } from "../../components/authContext";

// https://codesandbox.io/embed/g3scdl?module=/src/Demo.tsx&fontsize=12
// https://mui.com/toolpad/core/react-sign-in-page/
const providers = [{ id: "credentials", name: "Email and Password" }];

const AuthPage = () => {
  const { onLogin } = useAuthContext();

  const handleSignIn = async (
    _: unknown,
    formData: FormData
  ): Promise<AuthResponse> => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return { error: "Missing credentials" };
    }

    onLogin(email, password);
    console.log("formData", formData);

    return {};
  };

  return (
    <SignInPage
      providers={providers}
      signIn={handleSignIn}
      slotProps={{ emailField: { autoFocus: true } }}
    />
  );
};

export { AuthPage };
