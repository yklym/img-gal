import { Grid2, Stack } from "@mui/material";
import { HomepageFilters } from "./components/filters";
import { Header } from "@/components/header";
import { HomepageGallery } from "./components/gallery";
import { HomepagePreview } from "./components/homepagePreview";
import { useImageDataContext } from "@/components/imageDataContext";
import { AllPageLoader } from "@/components/allPageLoader";

const HomePage = () => {
  const { selectedImages, isLoading } = useImageDataContext();

  return (
    <Stack>
      {isLoading && <AllPageLoader />}
      <Header />

      <Grid2 container>
        <Grid2 size={!!selectedImages.length ? 8 : 12}>
          <HomepageFilters />
          <HomepageGallery size={!!selectedImages.length ? 6 : 4} />
        </Grid2>
        <Grid2 size={4}>
          <HomepagePreview />
        </Grid2>
      </Grid2>
    </Stack>
  );
};

export { HomePage };
