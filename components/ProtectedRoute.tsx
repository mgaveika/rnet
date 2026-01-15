import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter, usePathname } from "expo-router";

const ProtectedRoute = ({ children }: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const pathname = usePathname();
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("http://172.20.10.2:5001/api/auth/isAuthenticated", {
                    credentials: 'include'
                });
                const data = await response.json();

                if (data.status === 'success') {
                    setAuthenticated(true);
                } else {
                    setAuthenticated(false);
                    router.replace("/");
                    console.log(data.message)
                }
            } catch (error) {
                setAuthenticated(false);
                router.replace("/");
                console.log(error)
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, [pathname]);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!authenticated) {
        return null;
    }

    return children;
};

export default ProtectedRoute;