import { useState } from 'react';
import jwt_decode from "jwt-decode";

export interface UserProfile {
  'access_token': string;
  'email': string;
  'role': string;
}

export const decodeProfile = (token: string): UserProfile => {
  const decoded = jwt_decode(token) as any

  return {
    'access_token': token,
    'email': decoded.identity,
    'role': decoded.role
  }
}

export const useProfile = () => {
  const getProfile = () => {
    const tokenString = localStorage.getItem('token');
    if (tokenString != null) {
      const userToken = JSON.parse(tokenString);
      return decodeProfile(userToken)
    }
  };

  const [profile, setProfile] = useState(getProfile());

  const saveProfile = (userProfile: UserProfile) => {
    localStorage.setItem('token', JSON.stringify(userProfile.access_token));
    setProfile(userProfile);
  };

  return {
    setProfile: saveProfile,
    profile
  }

}
