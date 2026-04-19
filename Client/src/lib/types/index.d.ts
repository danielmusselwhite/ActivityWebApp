export type Activity = {
  id: string;
  title: string;
  date: Date;
  description: string;
  category: string;
  isCancelled: boolean;
  city: string;
  venue: string;
  latitude: number;
  longitude: number;
  attendees: Profile[];
  isGoing: boolean;
  isHost: boolean;
  hostId: string;
  hostDisplayName: string;
  hostImageUrl: string;
};

export type ActivityComment = {
  id: string;
  body: string;
  createdAt: Date;
  userId: string;
  displayName: string;
  imageUrl?: string;
}

export type Profile = {
  id: string;
  displayName: string;
  bio?: string;
  imageUrl?: string;
}

export type Photo = {
  id: string;
  url: string;
}

export type User = {
  id: string
  email: string
  displayName: string
  imageUrl?: string
}

//#region LocationIQ Types corresponding to the API response
export type LocationIQSuggestion = {
  place_id: string;
  osm_id: string;
  osm_type: string;
  licence: string;

  lat: string;
  lon: string;

  boundingbox: string[];

  "class": string;
  type: string;

  display_name: string;
  display_place: string;
  display_address: string;

  address: LocationIQAddress;
}

export type LocationIQAddress = {
  name?: string;
  road?: string;
  neighbourhood?: string;
  suburb?: string;
  city?: string;
  town?: string;
  village?: string;
  hamlet?: string;
  county?: string;
  state?: string;
  postcode?: string;
  country?: string;
  country_code?: string;
}

//#endregion