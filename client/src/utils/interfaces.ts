export interface userInt {
  _id: string;
  name: string;
  phone: string;
  email: string;
  image: string;
  // role: string;
}

export interface fundraiserInt {
  _id: string;
  category: string;
  state: string;
  zipCode: number;
  type: string;
  goal: string;
  user: userInt | null;
  image: string | null;
  title: string;
  description: string;
  secondaryImages: string[];
  secondaryVideos: string[];
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface message {
  _id: string;
  senderId: userInt | null;
  recipientId: userInt;
  name: string;
  email: string;
  message: string;
  seen: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface donation {
  user: userInt | null;
  fundraiser: fundraiserInt | null;
  amount: number;
  tip: number;
  incognito: boolean;
  message: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
