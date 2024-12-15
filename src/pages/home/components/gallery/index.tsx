import { useImageDataContext } from "@/components/imageDataContext";
import { Box, Checkbox, Grid2, Stack } from "@mui/material";

const HomepageGallery = ({ size = 6 }: { size: 6 | 4 }) => {
  const { images, selectedImages, onSelectImage } = useImageDataContext();

  return (
    <Grid2
      container
      spacing={3}
      p={4}
      sx={{
        borderTop: "1px solid #C4C4C4",
      }}
    >
      {images.map((img) => (
        <Grid2 size={size} key={img.id} columnSpacing={3}>
          <Stack
            height={"100%"}
            justifyContent={"center"}
            sx={{
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "relative",
              }}
            >
              <Checkbox
                value={true}
                checked={selectedImages.includes(img.id)}
                sx={{
                  position: "absolute",
                  top: 0,
                }}
              />
              <img
                onClick={() => onSelectImage(img.id)}
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  cursor: "pointer",
                }}
                src={img.url}
                alt="eslint idi"
              />
            </Box>
            <span style={{ textTransform: "capitalize" }}>
              {img?.caption?.unitType || "Not defined"}
            </span>
            <span style={{ color: "gray" }}>
              {img.createdAt.format("DD/MM/YYYY")}
            </span>
          </Stack>
        </Grid2>
      ))}
    </Grid2>
  );
};
export { HomepageGallery };
