import { createContext, useContext, useState, useEffect } from "react";
import { EMPTY_VOID } from "types";
import { UserProfile } from "types/userProfile/interfaces";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    name: string;
    // Add other fields if needed
}

export interface IUserContext {
    userProfile: UserProfile | null;
    setUserProfile: (profile: UserProfile | null) => void;
}

export function useUserContextState(): IUserContext {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            try {
                const decoded: DecodedToken = jwtDecode(token);
                const username = decoded.name;
                // For userImage, since it's not in the token, maybe set a default or fetch from somewhere else
                // For now, set a default image
                setUserProfile({
                    username,
                    userImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png", // default image
                });
            } catch (error) {
                console.error("Failed to decode token:", error);
                setUserProfile(null);
            }
        } else {
            setUserProfile(null);
        }
    }, []);

    return {
        userProfile,
        setUserProfile,
    };
}

export const UserContext = createContext<IUserContext>({
    userProfile: null,
    setUserProfile: EMPTY_VOID as (profile: UserProfile | null) => void,
});

export const useUserContext = () => useContext(UserContext);
export default UserContext;