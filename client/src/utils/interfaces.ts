export interface userInt {
    _id: string;
    name: string;
    phone: string;
    email: string;
    // role: string;
}


export interface fundraiserInt {
    _id: string;
    category: string;
    state: string;
    zipCode: number;
    type: string;
    goal: number;
    user: string;
    image: string | null;
    title: string;
}
