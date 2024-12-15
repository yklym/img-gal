import dayjs from "dayjs";

const MOCK_IMAGES = [
  {
    id: "1",
    createdAt: dayjs("2024-11-05"),
    url: "https://image.pollinations.ai/prompt/bm-21",
    caption: {
      boxCords: { x1: 10, x2: 50, y1: 20, y2: 60 },
      unitType: "bm-21",
    },
  },
  {
    id: "2",
    createdAt: dayjs("2024-11-10"),
    url: "https://image.pollinations.ai/prompt/bmd-2",
    caption: {
      boxCords: { x1: 15, x2: 55, y1: 25, y2: 65 },
      unitType: "bmd-2",
    },
  },
  {
    id: "3",
    createdAt: dayjs("2024-11-15"),
    url: "https://image.pollinations.ai/prompt/bmp-1",
    caption: {
      boxCords: { x1: 20, x2: 60, y1: 30, y2: 70 },
      unitType: "bmp-1",
    },
  },
  {
    id: "4",
    createdAt: dayjs("2024-11-20"),
    url: "https://image.pollinations.ai/prompt/bmp-2",
    caption: {
      boxCords: { x1: 25, x2: 65, y1: 35, y2: 75 },
      unitType: "bmp-2",
    },
  },
  {
    id: "5",
    createdAt: dayjs("2024-11-25"),
    url: "https://image.pollinations.ai/prompt/btr-70",
    caption: {
      boxCords: { x1: 30, x2: 70, y1: 40, y2: 80 },
      unitType: "btr-70",
    },
  },
  {
    id: "6",
    createdAt: dayjs("2024-11-30"),
    url: "https://image.pollinations.ai/prompt/btr-80",
    caption: {
      boxCords: { x1: 35, x2: 75, y1: 45, y2: 85 },
      unitType: "btr-80",
    },
  },
  {
    id: "7",
    createdAt: dayjs("2024-12-02"),
    url: "https://image.pollinations.ai/prompt/mt-lb",
    caption: {
      boxCords: { x1: 40, x2: 80, y1: 50, y2: 90 },
      unitType: "mt-lb",
    },
  },
  {
    id: "8",
    createdAt: dayjs("2024-12-04"),
    url: "https://image.pollinations.ai/prompt/t-64",
    caption: {
      boxCords: { x1: 45, x2: 85, y1: 55, y2: 95 },
      unitType: "t-64",
    },
  },
  {
    id: "9",
    createdAt: dayjs("2024-12-06"),
    url: "https://image.pollinations.ai/prompt/t-72",
    caption: {
      boxCords: { x1: 50, x2: 90, y1: 60, y2: 100 },
      unitType: "t-72",
    },
  },
  {
    id: "10",
    createdAt: dayjs("2024-12-08"),
    url: "https://image.pollinations.ai/prompt/t-80",
    caption: {
      boxCords: { x1: 55, x2: 95, y1: 65, y2: 105 },
      unitType: "t-80",
    },
  },
  {
    id: "11",
    createdAt: dayjs("2024-12-10"),
    url: "https://image.pollinations.ai/prompt/bm-21",
    caption: {
      boxCords: { x1: 60, x2: 100, y1: 70, y2: 110 },
      unitType: "bm-21",
    },
  },
  {
    id: "12",
    createdAt: dayjs("2024-12-12"),
    url: "https://image.pollinations.ai/prompt/bmd-2",
    caption: {
      boxCords: { x1: 65, x2: 105, y1: 75, y2: 115 },
      unitType: "bmd-2",
    },
  },
  {
    id: "13",
    createdAt: dayjs("2024-12-13"),
    url: "https://image.pollinations.ai/prompt/bmp-1",
    caption: {
      boxCords: { x1: 70, x2: 110, y1: 80, y2: 120 },
      unitType: "bmp-1",
    },
  },
  {
    id: "14",
    createdAt: dayjs("2024-12-14"),
    url: "https://image.pollinations.ai/prompt/bmp-2",
    caption: {
      boxCords: { x1: 75, x2: 115, y1: 85, y2: 125 },
      unitType: "bmp-2",
    },
  },
  {
    id: "15",
    createdAt: dayjs("2024-12-15"),
    url: "https://image.pollinations.ai/prompt/btr-70",
    caption: {
      boxCords: { x1: 80, x2: 120, y1: 90, y2: 130 },
      unitType: "btr-70",
    },
  },
  {
    id: "16",
    createdAt: dayjs("2024-12-15"),
    url: "https://image.pollinations.ai/prompt/btr-80",
    caption: {
      boxCords: { x1: 85, x2: 125, y1: 95, y2: 135 },
      unitType: "btr-80",
    },
  },
  {
    id: "17",
    createdAt: dayjs("2024-12-15"),
    url: "https://image.pollinations.ai/prompt/mt-lb",
    caption: {
      boxCords: { x1: 90, x2: 130, y1: 100, y2: 140 },
      unitType: "mt-lb",
    },
  },
  {
    id: "18",
    createdAt: dayjs("2024-12-15"),
    url: "https://image.pollinations.ai/prompt/t-64",
    caption: {
      boxCords: { x1: 95, x2: 135, y1: 105, y2: 145 },
      unitType: "t-64",
    },
  },
  {
    id: "19",
    createdAt: dayjs("2024-12-15"),
    url: "https://image.pollinations.ai/prompt/t-72",
    caption: {
      boxCords: { x1: 100, x2: 140, y1: 110, y2: 150 },
      unitType: "t-72",
    },
  },
  {
    id: "20",
    createdAt: dayjs("2024-12-15"),
    url: "https://image.pollinations.ai/prompt/t-80",
    caption: {
      boxCords: { x1: 105, x2: 145, y1: 115, y2: 155 },
      unitType: "t-80",
    },
  },
];

export const fetchImages = async () => {
  return MOCK_IMAGES;
};

export default MOCK_IMAGES;
