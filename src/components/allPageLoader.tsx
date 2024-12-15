import { Backdrop, CircularProgress } from "@mui/material";

const AllPageLoader = () => {
  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export { AllPageLoader };
