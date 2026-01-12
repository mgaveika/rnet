import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from "../data/products";

interface FavoritesContextType {
    favorites: Product[];
    addFavorite: (product: Product) => void;
    removeFavorite: (product: Product) => void;
    clearFavorites: () => void;
}

export const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    const [favorites, setFavorites] = useState<Product[]>([]);

    const addFavorite = (product: Product) => {
        try {
            const newFavorites = [...favorites, product];
            setFavorites(newFavorites);
            AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
        } catch (e) {
            throw new Error(e as string);
        }
    };

    const removeFavorite = (product: Product) => {
        try {
            const newFavorites = favorites.filter(p => p.id !== product.id);
            setFavorites(newFavorites);
            AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
        } catch (e) {
            throw new Error(e as string);
        }
    };

    const clearFavorites = () => {
        try {
            setFavorites([]);
            AsyncStorage.removeItem("favorites");
        } catch (e) {
            throw new Error(e as string);
        }
    }

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
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, clearFavorites }}>
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