import { instance, APIResponseType } from "./api";
import { PhotosType, ProfileType } from "../types/types";

type GetProfileType = ProfileType;

type ResponsePhotoDataType = {
  photos: PhotosType;
};

export const profileAPI = {
  getProfilePage(userId: number | null) {
    return instance
      .get<GetProfileType>(`profile/` + userId)
      .then((res) => res.data);
  },
  getStatus(userId: number) {
    return instance.get<string>(`profile/status/` + userId).then((res) => res);
  },
  updateStatus(status: string) {
    return instance
      .put<APIResponseType>(`profile/status`, { status })
      .then((res) => res.data);
  },
  updateProfileInfo(profile: ProfileType) {
    return instance
      .put<APIResponseType>(`profile`, { ...profile })
      .then((res) => res.data);
  },
  savePhoto(photoFile: any) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance
      .put<APIResponseType<ResponsePhotoDataType>>(`profile/photo`, formData, {
        headers: {
          "Content-Type": "multypart/form-data",
        },
      })
      .then((res) => res.data);
  },
};
