import { Router } from "./pages/router";
import { AuthContextWrapper } from "./components/authContext";
import { ImageDataContextWrapper } from "./components/imageDataContext";

function App() {
  return (
    <AuthContextWrapper>
      <ImageDataContextWrapper>
        <Router />
      </ImageDataContextWrapper>
    </AuthContextWrapper>
  );
}

export default App;
