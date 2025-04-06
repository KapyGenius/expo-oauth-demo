import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { AuthError } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export type AuthUser = {
    id: string;
    email: string;
    name: string;
    picture?: string;
    given_name?: string;
    family_name?: string;
    email_verified?: boolean;
    provider?: string;
    exp?: number;
    cookieExpiration?: number; // Added for web cookie expiration tracking
};

const AuthContext = React.createContext({
    user: null as AuthUser | null,
    signIn: () => {},
    signOut: () => {}, 
    fetchWithAuth: (url: string, options: RequestInit) => Promise.resolve(new Response()),
    isLoading: false,
    error: null as AuthError | null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = React.useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<AuthError | null>(null);

    const signIn = async () => {
        // Implement sign-in logic here
    };

    const signOut = async () => {
        // Implement sign-out logic here
    };

    const fetchWithAuth = async (url: string, options: RequestInit) => {
        // Implement fetch with authentication logic here
        return new Response();
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signOut, fetchWithAuth, isLoading, error }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
