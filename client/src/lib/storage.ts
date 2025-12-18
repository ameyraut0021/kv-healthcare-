import { nanoid } from 'nanoid';

export interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  isDefault: boolean;
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: Address;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

const STORAGE_KEYS = {
  ADDRESSES: 'kwikmedi_addresses',
  ORDERS: 'kwikmedi_orders',
  ADMIN_LOGGED_IN: 'kwikmedi_admin_logged_in',
};

// Address Helpers
export const getAddresses = (): Address[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ADDRESSES);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const saveAddress = (address: Omit<Address, 'id'> & { id?: string }) => {
  const addresses = getAddresses();
  
  // If set as default, unset others
  if (address.isDefault) {
    addresses.forEach(a => a.isDefault = false);
  }

  const newAddress: Address = {
    ...address,
    id: address.id || nanoid(),
  };

  // Check if updating
  const existingIndex = addresses.findIndex(a => a.id === newAddress.id);
  if (existingIndex >= 0) {
    addresses[existingIndex] = newAddress;
  } else {
    // If it's the first address, make it default automatically
    if (addresses.length === 0) {
      newAddress.isDefault = true;
    }
    addresses.push(newAddress);
  }

  localStorage.setItem(STORAGE_KEYS.ADDRESSES, JSON.stringify(addresses));
  return newAddress;
};

export const deleteAddress = (id: string) => {
  const addresses = getAddresses().filter(a => a.id !== id);
  localStorage.setItem(STORAGE_KEYS.ADDRESSES, JSON.stringify(addresses));
};

export const setDefaultAddress = (id: string) => {
  const addresses = getAddresses().map(a => ({
    ...a,
    isDefault: a.id === id
  }));
  localStorage.setItem(STORAGE_KEYS.ADDRESSES, JSON.stringify(addresses));
};

export const getDefaultAddress = (): Address | undefined => {
  return getAddresses().find(a => a.isDefault);
};

// Order Helpers
export const getOrders = (): Order[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
  const orders = getOrders();
  const newOrder: Order = {
    ...orderData,
    id: `ORD-${nanoid(6).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    status: 'PENDING',
  };
  
  orders.unshift(newOrder); // Add to top
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  return newOrder;
};

export const updateOrderStatus = (orderId: string, status: OrderStatus) => {
  const orders = getOrders().map(o => 
    o.id === orderId ? { ...o, status } : o
  );
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
};

// Admin Helpers
export const isAdminLoggedIn = () => {
  return localStorage.getItem(STORAGE_KEYS.ADMIN_LOGGED_IN) === 'true';
};

export const loginAdmin = (key: string) => {
  if (key === 'admin123') {
    localStorage.setItem(STORAGE_KEYS.ADMIN_LOGGED_IN, 'true');
    return true;
  }
  return false;
};

export const logoutAdmin = () => {
  localStorage.removeItem(STORAGE_KEYS.ADMIN_LOGGED_IN);
};
