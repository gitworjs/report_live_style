export type FormDataValue = string | number | string[];

export type FormData = {
  email: string;
  priority: string;
  source: string[];
  deliveryRatio: number;
  soulFood: string;
  convQuality: string;
  happyMoment: string;
  communityIntent: string;
  restNeeds: string;
  mentoring: string;
  [key: string]: FormDataValue;
};
