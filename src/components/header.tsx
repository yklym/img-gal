import { Button, Stack } from "@mui/material";
import { useAuthContext } from "./authContext";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { alpha, styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useImageDataContext } from "./imageDataContext";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

// https://mui.com/material-ui/react-button/#icon-button

const Header = () => {
  const { username, onLogout } = useAuthContext();
  const { selectedImages, onDeleteImages, onUpload } = useImageDataContext();

  const handleDeleteClick = () => {
    onDeleteImages(selectedImages);
  };

  return (
    <header
      style={{
        background: alpha("#33A843", 0.2),
      }}
    >
      <Stack direction="row" px={5} py={3} justifyContent={"space-between"}>
        <Stack gap={2} direction="row">
          {/* UPLOAD FILES */}
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload files
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => onUpload(event.target.files[0])}
            />
          </Button>

          {/* DELETE */}
          <Button
            disabled={!selectedImages.length}
            variant="outlined"
            onClick={handleDeleteClick}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Stack>

        <Stack gap={3} direction="row" alignItems="center">
          <span>{username}</span>
          {/* LOGOUT */}
          <Button
            onClick={onLogout}
            variant="outlined"
            startIcon={<ExitToAppIcon />}
          >
            Sign out
          </Button>
        </Stack>
      </Stack>
    </header>
  );
};

export { Header };
