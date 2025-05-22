import { createContext, ReactNode, useContext, useState } from "react";
import { PublicUserType } from "../../../shared/types/user";

type UserContextType = {
  user: PublicUserType | null;
  setUser: React.Dispatch<React.SetStateAction<PublicUserType | null>>;
  logIn: (userInfo: PublicUserType) => void;
  logOut: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<PublicUserType | null>(null);

  const logIn = (userInfo: PublicUserType) => {
    setUser({
      ...userInfo,
      dob: userInfo?.dob ? new Date(userInfo.dob) : null,
    });
  };

  const logOut = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ logIn, logOut, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

type UserField = keyof Omit<
  PublicUserType,
  "location" | "id" | "curLikes" | "imageUrls" | "prompts"
>;

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  const { user, setUser, logIn, logOut } = context;

  const updateField = <K extends UserField>(
    field: K,
    value: PublicUserType[K]
  ) => {
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const updateLocation = (lat: number, lon: number) => {
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        location: {
          coordinates: [lat, lon],
          type: "Point",
        },
      };
    });
  };

  return {
    user,
    setUser,
    logIn,
    logOut,
    updateLocation,
    updateFirstName: (name: string) => updateField("firstName", name),
    updateLastName: (name: string) => updateField("lastName", name),
    updateAge: (dob: Date) => updateField("dob", dob),
    updateGender: (gender: string) => updateField("gender", gender),
  };
};
