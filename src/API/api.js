import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  headers: {
    "API-KEY": "20953ceb-ea30-4381-8db5-490625f2fa1d",
  },
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
});

export const usersAPI = {
  getUsers(currentPage, pageSize) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`);
  },
  followSuccess(id) {
    return instance.post(`follow/${id}`, {});
  },
  unfollowSuccess(id) {
    return instance.delete(`follow/${id}`);
  },
};

export const profileAPI = {
  getProfilePage(userId) {
    return instance.get(`profile/` + userId);
  },
  getStatus(userId) {
    return instance.get(`profile/status/` + userId);
  },
  updateStatus(status) {
    return instance.put(`profile/status`, { status });
  },
  updateProfileInfo(profile) {
    return instance.put(`profile`, { ...profile });
  },
  savePhoto(photoFile) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance.put(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multypart/form-data",
      },
    });
  },
};

export const authAPI = {
  getAuthMe() {
    return instance.get(`auth/me`);
  },
  login(email, password, rememberMe = false, captcha = null) {
    return instance.post(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha,
    });
  },
  logout() {
    return instance.delete(`auth/login`);
  },
};

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`);
  },
};
