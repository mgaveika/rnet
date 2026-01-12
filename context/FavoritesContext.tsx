import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoritesContextType {
    favorites: number[];
    addFavorite: (productId: number) => void;
    removeFavorite: (productId: number) => void;
}

export const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    const [favorites, setFavorites] = useState<number[]>([]);

    const addFavorite = (productId: number) => {
        try {
            const newFavorites = [...favorites, productId];
            setFavorites(newFavorites);
            AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
        } catch (e) {
            throw new Error(e as string);
        }
    };

    const removeFavorite = (productId: number) => {
        try {
            const newFavorites = favorites.filter(p => p !== productId);
            setFavorites(newFavorites);
            AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
        } catch (e) {
            throw new Error(e as string);
        }
    };

    useEffect(() => {
        try {
            AsyncStorage.getItem('favorites').then((value) => {
                if (value !== null) {
                    setFavorites(JSON.parse(value));
                }
            });
        } catch (e) {
            throw new Error(e as string);
        }
    }, [])

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
};