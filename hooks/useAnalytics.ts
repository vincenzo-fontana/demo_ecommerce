/**
 * useAnalytics Hook
 * Provides a React hook interface to the analytics service
 */

import { useEffect } from 'react';
import { analyticsService } from '../services/analytics.service';
import { Product } from '../components/ProductCard';
import { CartItem } from '../components/ShoppingCart';

export function useAnalytics() {
  // Initialize analytics on mount
  useEffect(() => {
    analyticsService.initialize();
  }, []);

  // Helper function to convert Product to EcommerceItem
  const productToItem = (product: Product, quantity: number = 1) => ({
    item_id: product.id,
    item_name: product.name,
    price: product.price,
    quantity,
    item_category: product.category,
  });

  // Helper function to convert CartItem to EcommerceItem
  const cartItemToItem = (cartItem: CartItem) => ({
    item_id: cartItem.id,
    item_name: cartItem.name,
    price: cartItem.price,
    quantity: cartItem.quantity,
    item_category: cartItem.category,
  });

  return {
    // Track page view
    trackPageView: (pagePath: string, pageTitle?: string) => {
      analyticsService.trackPageView(pagePath, pageTitle);
    },

    // Track product view
    trackProductView: (product: Product) => {
      analyticsService.trackViewItem({
        currency: 'USD',
        value: product.price,
        items: [productToItem(product)],
      });
    },

    // Track add to cart
    trackAddToCart: (product: Product, quantity: number = 1) => {
      analyticsService.trackAddToCart({
        currency: 'USD',
        value: product.price * quantity,
        items: [productToItem(product, quantity)],
      });
    },

    // Track remove from cart
    trackRemoveFromCart: (cartItem: CartItem) => {
      analyticsService.trackRemoveFromCart({
        currency: 'USD',
        value: cartItem.price * cartItem.quantity,
        items: [cartItemToItem(cartItem)],
      });
    },

    // Track view cart
    trackViewCart: (cartItems: CartItem[]) => {
      const totalValue = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      analyticsService.trackViewCart({
        currency: 'USD',
        value: totalValue,
        items: cartItems.map(cartItemToItem),
      });
    },

    // Track begin checkout
    trackBeginCheckout: (cartItems: CartItem[]) => {
      const totalValue = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      analyticsService.trackBeginCheckout({
        currency: 'USD',
        value: totalValue,
        items: cartItems.map(cartItemToItem),
      });
    },

    // Track purchase
    trackPurchase: (
      transactionId: string,
      cartItems: CartItem[],
      tax?: number,
      shipping?: number
    ) => {
      const totalValue = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      analyticsService.trackPurchase({
        transaction_id: transactionId,
        currency: 'USD',
        value: totalValue,
        tax,
        shipping,
        items: cartItems.map(cartItemToItem),
      });
    },

    // Track search
    trackSearch: (searchTerm: string) => {
      analyticsService.trackSearch(searchTerm);
    },

    // Track category view
    trackCategoryView: (category: string, itemCount: number) => {
      analyticsService.trackCategoryView(category, itemCount);
    },

    // Track custom event
    trackEvent: (eventName: string, eventParams?: Record<string, any>) => {
      analyticsService.sendEvent(eventName, eventParams);
    },

    // Track engagement
    trackEngagement: (action: string, category: string, label?: string, value?: number) => {
      analyticsService.trackEngagement(action, category, label, value);
    },

    // Track conversion
    trackConversion: (conversionName: string, value?: number) => {
      analyticsService.trackConversion(conversionName, value);
    },

    // Push to data layer
    pushToDataLayer: (data: Record<string, any> & { event: string }) => {
      analyticsService.pushToDataLayer(data);
    },

    // Set user properties
    setUserProperties: (properties: Record<string, any>) => {
      analyticsService.setUserProperties(properties);
    },

    // Set user ID
    setUserId: (userId: string) => {
      analyticsService.setUserId(userId);
    },
  };
}
