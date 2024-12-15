import { FilterSortKey, IImage, IImageFilters } from "@/types";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const createSortImagesCb = (sort: FilterSortKey) => {
  return (imageA: IImage, imageB: IImage) => {
    if (sort === FilterSortKey.CREATED_ASC)
      return imageA.createdAt.diff(imageB.createdAt);
    if (sort === FilterSortKey.CREATED_DESC)
      return imageB.createdAt.diff(imageA.createdAt);
    return 0;
  };
};

type FilterAction = (image: IImage) => boolean;

export const filterImages = (images: IImage[], filters: IImageFilters) => {
  const filterActions: FilterAction[] = [];

  if (filters.unitTypes?.length) {
    filterActions.push((image) =>
      filters.unitTypes.includes(image.caption.unitType)
    );
  }

  if (filters.date && !!filters.date.startDate && !!filters.date.endDate) {
    filterActions.push(
      (image) =>
        image.createdAt.isSameOrAfter(filters.date.startDate, "day") &&
        image.createdAt.isSameOrBefore(filters.date.endDate, "day")
    );
  }

  return [...images]
    .sort(createSortImagesCb(filters.sort))
    .filter((image) => filterActions.every((action) => action(image)));
};

export const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.toString());
    reader.onerror = (error) => reject(error);
  });
};
