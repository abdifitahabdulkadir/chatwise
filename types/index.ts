export type ChatMessageype = {
  role: string;
  id: string;
  content: string;
};

export type TourResponseType = {
  city: string;
  country: string;
  title: string;
  description: string;
  stops: [string, string, string];
};
