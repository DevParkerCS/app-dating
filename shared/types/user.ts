export type InterestedIn = {
  minAge: number;
  maxAge: number;
  maxDistance: number;
  genders: string[];
};

export type GeoPoint = {
  type: "Point";
  coordinates: [number, number]; // [Longitude, Latitude]
};

export type Prompt = {
  title: string;
  text: string;
};

export type ImageUrl = {
  url: string;
  is_new: boolean;
};

export type PublicUserType = {
  id: number;
  privateId: number;
  firstName: string | null;
  lastName: string | null;
  dob: Date | null;
  gender: string | null;
  interestedIn: InterestedIn;
  curLikes: number | null;
  location: GeoPoint | null;
  imageUrls: ImageUrl[];
  prompts: Prompt[];
  is_profile_complete: boolean;
};
