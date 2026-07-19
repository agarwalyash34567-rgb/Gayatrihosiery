/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'women' | 'men' | 'kids' | 'unisex' | 'accessories' | 'new-arrivals';
  badge?: 'Premium' | 'Bestseller' | 'Daily Wear' | 'New Arrival' | 'Premium Collection';
  description: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  fabric: string;
  packInfo?: string;
  details?: string[];
  inStock?: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export type ScreenType = 'home' | 'women' | 'men' | 'kids' | 'new-arrivals' | 'about-us' | 'product-detail' | 'contact' | 'admin';
