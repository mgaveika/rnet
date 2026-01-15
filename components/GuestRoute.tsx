import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

const GuestRoute = ({ children }: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("http://172.20.10.2:5001/api/auth/isAuthenticated", {
                    credentials: "include"
                });
                const data = await response.json();

                if (data.status === 'success') {
                    setAuthenticated(true);
                    router.replace("/(tabs)/home");
                } else {
                    setAuthenticated(false);
                }
            } catch (error) {
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, [])

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (authenticated) {
        return null;
    }

    return children;
};

export default GuestRoute;