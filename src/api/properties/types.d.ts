interface IImage {
  is_portrait: boolean;
  position: number;
  tags: string[];
  unit_group_ids: number[];
  url: string;
}

interface ILocation {
  addressLine1: string;
  city: string;
  countryCode: string;
  countryName: string;
  lat: number;
  lng: number;
  postalCode: string;
}

interface ISpace {
  icon: string;
  name: string;
  name_plural: string;
  slug: string;
  value: number;
}

interface IAmenity {
  icon: string;
  name: string;
}

interface IUnitGroup {
  amenities: IAmenity[];
  custom_title: string;
  description: string;
  external_id: string;
  id: number;
  images: { url: string }[];
  lowest_price_per_month: number;
  lowest_price_per_night: number;
  max_guests: number;
  name: string;
  rental_type: string;
  spaces: ISpace;
  title: string;
}

interface IProperty {
  city: string;
  city_id: number;
  distance: number;
  external_id: string;
  id: number;
  images: IImage[];
  location: ILocation;
  lowest_price_per_month: number;
  lowest_price_per_night: number;
  name: string;
  review_widget_id: number;
  street: string;
}

interface IPropertyDetails {
  additional_services: unknown;
  city: string;
  city_id: number;
  default_check_in_time: string;
  default_check_out_time: number;
  description: string;
  distance: number;
  external_id: string;
  house_rules: string;
  id: number;
  images: IImage[];
  location: ILocation;
  lowest_price_per_month: number;
  lowest_price_per_night: number;
  name: string;
  parking: string;
  review_widget_id: number;
  street: string;
  things_to_know: string;
  unit_groups: IUnitGroup[];
}

interface IGetPropertiesResponse {
  message: string;
  payload: IProperty[];
  success: boolean;
}

interface IGetPropertyByIdResponse {
  message: string;
  payload: IPropertyDetails;
  success: boolean;
}
