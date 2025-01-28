interface IUser {
    username: string;
    email: string;
    password: string;
    role: "user" | "owner";
    image? : string;
}

interface IProperty {
    title: string;
    description: string;
    type: "day" | "month";
    price: number;
    vacancies: number;
    amneties: string[];
    location: string;
    ownerID : string;
}

interface IPImages {
    propertyID: string;
    image: string;
}

interface IBooking {
    propertyID: string;
    userID: string;
    checkIn: Date;
}

export { IUser, IProperty, IBooking, IPImages }