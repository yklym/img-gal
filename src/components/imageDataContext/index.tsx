import { FilterSortKey, IImage, IImageFilters } from "@/types";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { filterImages, getBase64 } from "./common";
import dayjs from "dayjs";
import { fetchImages } from "./mocks";

interface IImageDataContext {
  images: IImage[];
  isLoading: boolean;
  filters: IImageFilters;
  selectedImages: string[];

  onSelectImage: (id: string) => void;
  onSetFilters: (filters: IImageFilters) => void;
  onDeleteImages: (ids: string[]) => void;
  onSetFilter: <T extends keyof IImageFilters>(
    key: T,
    value: IImageFilters[T]
  ) => void;
  onUpload: (image: File) => void;
}

const DEFAULT_FILTERS = {
  date: null,
  sort: FilterSortKey.CREATED_DESC,
  unitTypes: [],
};

const DEFAULT_STATE: IImageDataContext = {
  images: [],
  isLoading: false,
  filters: DEFAULT_FILTERS,
  selectedImages: [],

  onSelectImage: () => {},
  onSetFilters: (filters: IImageFilters) => {},
  onSetFilter: (key, value) => {},
  onDeleteImages: (ids: string[]) => {},
  onUpload: () => {},
};

const ImageDataContext = createContext<IImageDataContext>(DEFAULT_STATE);

const ImageDataContextWrapper = ({ children }: { children: JSX.Element }) => {
  const [images, setImages] = useState<IImage[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const [isLoading, setLoading] = useState(false);
  const [filters, setFilters] = useState<IImageFilters>(DEFAULT_FILTERS);

  useEffect(() => {
    setLoading(true);

    setTimeout(async () => {
      const images = await fetchImages();

      setImages(images as IImage[]);

      setLoading(false);
    }, 1000);
  }, []);

  const handleDeleteImages = (ids: string[]) => {
    setLoading(true);

    setTimeout(() => {
      setImages((images) => images.filter(({ id }) => !ids.includes(id)));
      setSelectedImages((images) => images.filter((id) => !ids.includes(id)));

      setLoading(false);
    }, 1000);
  };

  const handleSetFilter = <T extends keyof IImageFilters>(
    key: T,
    value: IImageFilters[T]
  ) => {
    handleSetFilters({
      ...filters,
      [key]: value,
    });
  };

  const handleSetFilters = (filters: IImageFilters) => {
    setFilters(filters);
  };

  const handleUpload = async (newImage: File) => {
    const newImages = [
      ...images,
      {
        url: await getBase64(newImage),
        createdAt: dayjs(),
        id: (Math.random() * 1488).toString(),
        caption: null,
      },
    ];

    setImages(newImages);
  };

  const imagesFiltered = useMemo(
    () => filterImages(images, filters),
    [images, filters]
  );

  const handleSelectItems = (id: string) => {
    if (selectedImages.includes(id)) {
      return setSelectedImages((images) =>
        images.filter((imgId) => imgId !== id)
      );
    }

    setSelectedImages((images) => [...images, id]);
  };

  const ctxValue = useMemo<IImageDataContext>(
    () => ({
      images: imagesFiltered,
      filters,
      isLoading,
      selectedImages,
      onSelectImage: handleSelectItems,
      onUpload: handleUpload,
      onSetFilters: handleSetFilters,
      onSetFilter: handleSetFilter,
      onDeleteImages: handleDeleteImages,
    }),
    [images, selectedImages, filters, isLoading]
  );

  return (
    <ImageDataContext.Provider value={ctxValue}>
      {children}
    </ImageDataContext.Provider>
  );
};

const useImageDataContext = () => useContext(ImageDataContext);

export { ImageDataContextWrapper, useImageDataContext };
