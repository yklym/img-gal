import { useImageDataContext } from "@/components/imageDataContext";
import { Button, Stack } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";

const HomepagePreview = () => {
  const { selectedImages, images, onDeleteImages } = useImageDataContext();

  const image = images.find(
    (image) => image.id === selectedImages[selectedImages.length - 1]
  );

  if (!image || !selectedImages.length) {
    return <></>;
  }

  const handleDeleteClick = () => {
    onDeleteImages([image.id]);
  };
  return (
    <Stack
      sx={{
        width: "100%",
        background: "#F5F5F5",
        height: "100%",
        p: 5,
        gap: 3,
        borderLeft: "1px solid #C4C4C4",
      }}
    >
      <img
        src={image.url}
        style={{
          maxWidth: "360px",
        }}
        alt="ESLINT IDI"
      />

      <Stack>
        <span style={{ textTransform: "capitalize" }}>
          {image?.caption?.unitType || "Not defined"}
        </span>
        <span style={{ color: "gray" }}>
          {image.createdAt.format("DD/MM/YYYY")}
        </span>
      </Stack>
      <Stack justifyContent={"space-between"} direction="row" gap={2}>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          href={image.url}
          download={image?.caption ?? "project asset"}
          target="_blank"
        >
          Download
        </Button>

        <Button
          variant="outlined"
          onClick={handleDeleteClick}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </Stack>
    </Stack>
  );
};

export { HomepagePreview };
