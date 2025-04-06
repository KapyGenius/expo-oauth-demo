import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { AuthError, AuthRequestConfig, DiscoveryDocument, makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { BASE_URL } from '@/constant';

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
    signIn: () => { },
    signOut: () => { },
    fetchWithAuth: (url: string, options: RequestInit) => Promise.resolve(new Response()),
    isLoading: false,
    error: null as AuthError | null,
});

const config: AuthRequestConfig = {
    clientId: "google",
    scopes: ["openid", "profile", "email"],
    redirectUri: makeRedirectUri(),
};


// Our OAuth flow uses a server-side approach for enhanced security:
// 1. Client initiates OAuth flow with Google through our server
// 2. Google redirects to our server's /api/auth/authorize endpoint
// 3. Our server handles the OAuth flow with Google using server-side credentials
// 4. Client receives an authorization code from our server
// 5. Client exchanges the code for tokens through our server
// 6. Server uses its credentials to get tokens from Google and returns them to the client
const discovery: DiscoveryDocument = {
    // URL where users are redirected to log in and grant authorization.
    // Our server handles the OAuth flow with Google and returns the authorization code
    authorizationEndpoint: `${BASE_URL}/api/auth/authorize`,
    // URL where our server exchanges the authorization code for tokens
    // Our server uses its own credentials (client ID and secret) to securely exchange
    // the code with Google and return tokens to the client
    tokenEndpoint: `${BASE_URL}/api/auth/token`,
};



export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = React.useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<AuthError | null>(null);

    const [request, response, promptAsync] = useAuthRequest(config, discovery);

    const signIn = async () => {
        console.log("signIn");
        try {
            if (!request) {
                console.log("No request");
                return;
            }
            await promptAsync();
        } catch (e) {
            console.log(e);
        }
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
