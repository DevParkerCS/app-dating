import { createContext, ReactNode, useContext, useState } from "react";

type GeoPoint = {
  type: "Point";
  coordinates: [number, number];
};

export type PromptType = {
  title: string;
  text: string;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  dob: Date;
  gender: string;
  curLikes: number;
  location: GeoPoint;
  imageUrls: string[];
  prompts: PromptType[];
};

export type StoredUser = User & {
  imageUrls: string;
  prompts: string;
};

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logIn: (userInfo: StoredUser) => void;
  logOut: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const logIn = (userInfo: StoredUser) => {
    setUser({
      ...userInfo,
      dob: new Date(userInfo.dob),
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
  User,
  "location" | "id" | "curLikes" | "imageUrls" | "prompts"
>;

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  const { user, setUser, logIn, logOut } = context;

  const updateField = <K extends UserField>(field: K, value: User[K]) => {
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
