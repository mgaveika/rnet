export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

export const products: Product[] = [
    {
        id: 1,
        name: "Product 1",
        price: 10,
        image: "https://placehold.co/600x400/png"
    },
    {
        id: 2,
        name: "Product 2",
        price: 20,
        image: "https://placehold.co/600x400/png"
    },
    {
        id: 3,
        name: "Product 3",
        price: 30,
        image: "https://placehold.co/600x400/png"
    }
]