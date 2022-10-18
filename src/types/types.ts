export type PostsType = {
  id: number;
  message: string;
  likesCount: number;
};

export type ProfileType = {
  userId: number | null;
  lookingForAJob: false;
  lookingForAJobDescription: string;
  fullName: string;
  aboutMe: string;
  contacts: ContactsType;
  photos: PhotosType;
};

export type ContactsType = {
  [key: string]: string;
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
};

export type PhotosType = {
  small: string | null;
  large: string | null;
};

export type UsersType = {
  id: number;
  name: string;
  status: string;
  photos: PhotosType;
  followed: boolean;
};
