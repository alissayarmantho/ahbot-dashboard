export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  accountType: UserRoles;
}

export interface FullUser extends User {
  caregiverIds: String[];
  elderIds: String[];
}

export interface UserWithFullUserAssociation extends FullUser {
  myAccount: FullUser;
  associatedCaregivers: FullUser[];
  associatedElders: FullUser[];
}

export enum UserRoles {
  ELDERLY = "elder",
  CAREGIVER = "caregiver",
  FAMILYCAREGIVER = "familycaregiver", // for future purposes
  // TODO: Need to check for this to decide which menu options is displayed
}
