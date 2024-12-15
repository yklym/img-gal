import { Router } from "./pages/router";
import { AuthContextWrapper } from "./components/authContext";

function App() {
  return (
    <AuthContextWrapper>
      <Router />
    </AuthContextWrapper>
  );
}

export default App;
