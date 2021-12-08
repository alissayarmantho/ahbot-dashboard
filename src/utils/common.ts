import { UserWithFullUserAssociation } from "../types/users";

// return the user data from the session storage
export const getUser = (): UserWithFullUserAssociation | null => {
  // The user is saved but it can't be parsed and I can't do something like user.myAccount
  // I don't know why
  // TODO: Fix this, or do more hacks (eg: storing the items one by one instead of as a JSON)
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr ?? "") as UserWithFullUserAssociation;
  else return null;
};

// return the token from the session storage
export const getToken = (): string | null => {
  return localStorage.getItem("token") || null;
};

// remove the token and user from the session storage
export const removeUserSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// set the token from the session storage
export const setTokenSession = (token: string) => {
  localStorage.setItem("token", token);
};

// set the user from the session storage
export const setUserSession = (user: UserWithFullUserAssociation) => {
  localStorage.setItem("user", JSON.stringify(user));
};
