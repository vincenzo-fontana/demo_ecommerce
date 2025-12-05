/**
 * Analytics Service
 * Handles Google Analytics 4 (GA4) and Google Tag Manager (GTM) integration
 * Provides methods to track custom events and ecommerce actions
 */

import analyticsConfig from '../config/analytics.config';

// Type definitions for GA4 events
interface GAEvent {
  event: string;
  [key: string]: any;
}

interface EcommerceItem {
  item_id: string | number;
  item_name: string;
  price: number;
  quantity?: number;
  item_category?: string;
  item_brand?: string;
  item_variant?: string;
  index?: number;
}

interface ViewItemParams {
  currency?: string;
  value: number;
  items: EcommerceItem[];
}

interface AddToCartParams {
  currency?: string;
  value: number;
  items: EcommerceItem[];
}

interface RemoveFromCartParams {
  currency?: string;
  value: number;
  items: EcommerceItem[];
}

interface PurchaseParams {
  transaction_id: string;
  currency?: string;
  value: number;
  tax?: number;
  shipping?: number;
  items: EcommerceItem[];
}

interface ViewCartParams {
  currency?: string;
  value: number;
  items: EcommerceItem[];
}

interface BeginCheckoutParams {
  currency?: string;
  value: number;
  items: EcommerceItem[];
}

// Extend Window interface to include dataLayer and gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

class AnalyticsService {
  private isInitialized = false;
  private isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

  /**
   * Initialize Google Tag Manager
   */
  initializeGTM(): void {
    if (this.isInitialized) return;
    
    const { gtmContainerId, enableInDev, debug } = analyticsConfig;

    // Skip initialization if in development and not enabled
    if (this.isDevelopment && !enableInDev) {
      console.log('[Analytics] Skipping GTM initialization in development mode');
      return;
    }

    if (!gtmContainerId || gtmContainerId === 'GTM-XXXXXXX') {
      console.warn('[Analytics] GTM Container ID not configured');
      return;
    }

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];

    // Add GTM script to head
    const gtmScript = document.createElement('script');
    gtmScript.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmContainerId}');
    `;
    document.head.appendChild(gtmScript);

    // Add GTM noscript iframe to body
    const gtmNoScript = document.createElement('noscript');
    gtmNoScript.innerHTML = `
      <iframe src="https://www.googletagmanager.com/ns.html?id=${gtmContainerId}"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `;
    document.body.insertBefore(gtmNoScript, document.body.firstChild);

    if (debug) {
      console.log('[Analytics] GTM initialized with container:', gtmContainerId);
    }
  }

  /**
   * Initialize Google Analytics 4
   */
  initializeGA4(): void {
    if (this.isInitialized) return;

    const { ga4MeasurementId, enableInDev, debug } = analyticsConfig;

    // Skip initialization if in development and not enabled
    if (this.isDevelopment && !enableInDev) {
      console.log('[Analytics] Skipping GA4 initialization in development mode');
      return;
    }

    if (!ga4MeasurementId || ga4MeasurementId === 'G-XXXXXXXXXX') {
      console.warn('[Analytics] GA4 Measurement ID not configured');
      return;
    }

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    // Set default timestamp
    window.gtag('js', new Date());

    // Configure GA4
    window.gtag('config', ga4MeasurementId, {
      send_page_view: true,
      debug_mode: debug,
    });

    // Add GA4 script
    const ga4Script = document.createElement('script');
    ga4Script.async = true;
    ga4Script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`;
    document.head.appendChild(ga4Script);

    if (debug) {
      console.log('[Analytics] GA4 initialized with ID:', ga4MeasurementId);
    }
  }

  /**
   * Initialize both GTM and GA4
   */
  initialize(): void {
    if (this.isInitialized) return;

    this.initializeGTM();
    this.initializeGA4();
    this.isInitialized = true;
  }

  /**
   * Check if analytics is enabled
   */
  private isEnabled(): boolean {
    if (this.isDevelopment && !analyticsConfig.enableInDev) {
      return false;
    }
    return true;
  }

  /**
   * Send a custom event to GA4
   */
  sendEvent(eventName: string, eventParams: Record<string, any> = {}): void {
    if (!this.isEnabled()) {
      if (analyticsConfig.debug) {
        console.log('[Analytics] Event (dev mode):', eventName, eventParams);
      }
      return;
    }

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventParams);
      if (analyticsConfig.debug) {
        console.log('[Analytics] Event sent:', eventName, eventParams);
      }
    }
  }

  /**
   * Push data to GTM dataLayer
   */
  pushToDataLayer(data: GAEvent): void {
    if (!this.isEnabled()) {
      if (analyticsConfig.debug) {
        console.log('[Analytics] DataLayer (dev mode):', data);
      }
      return;
    }

    if (window.dataLayer) {
      window.dataLayer.push(data);
      if (analyticsConfig.debug) {
        console.log('[Analytics] DataLayer pushed:', data);
      }
    }
  }

  /**
   * Track page view
   */
  trackPageView(pagePath: string, pageTitle?: string): void {
    this.sendEvent('page_view', {
      page_path: pagePath,
      page_title: pageTitle || document.title,
      page_location: window.location.href,
    });

    this.pushToDataLayer({
      event: 'page_view',
      page_path: pagePath,
      page_title: pageTitle || document.title,
    });
  }

  /**
   * Track product view (view_item)
   */
  trackViewItem(params: ViewItemParams): void {
    const eventParams = {
      currency: params.currency || 'USD',
      value: params.value,
      items: params.items,
    };

    this.sendEvent('view_item', eventParams);
    this.pushToDataLayer({
      event: 'view_item',
      ecommerce: eventParams,
    });
  }

  /**
   * Track add to cart (add_to_cart)
   */
  trackAddToCart(params: AddToCartParams): void {
    const eventParams = {
      currency: params.currency || 'USD',
      value: params.value,
      items: params.items,
    };

    this.sendEvent('add_to_cart', eventParams);
    this.pushToDataLayer({
      event: 'add_to_cart',
      ecommerce: eventParams,
    });
  }

  /**
   * Track remove from cart (remove_from_cart)
   */
  trackRemoveFromCart(params: RemoveFromCartParams): void {
    const eventParams = {
      currency: params.currency || 'USD',
      value: params.value,
      items: params.items,
    };

    this.sendEvent('remove_from_cart', eventParams);
    this.pushToDataLayer({
      event: 'remove_from_cart',
      ecommerce: eventParams,
    });
  }

  /**
   * Track view cart (view_cart)
   */
  trackViewCart(params: ViewCartParams): void {
    const eventParams = {
      currency: params.currency || 'USD',
      value: params.value,
      items: params.items,
    };

    this.sendEvent('view_cart', eventParams);
    this.pushToDataLayer({
      event: 'view_cart',
      ecommerce: eventParams,
    });
  }

  /**
   * Track begin checkout (begin_checkout)
   */
  trackBeginCheckout(params: BeginCheckoutParams): void {
    const eventParams = {
      currency: params.currency || 'USD',
      value: params.value,
      items: params.items,
    };

    this.sendEvent('begin_checkout', eventParams);
    this.pushToDataLayer({
      event: 'begin_checkout',
      ecommerce: eventParams,
    });
  }

  /**
   * Track purchase (purchase)
   */
  trackPurchase(params: PurchaseParams): void {
    const eventParams = {
      transaction_id: params.transaction_id,
      currency: params.currency || 'USD',
      value: params.value,
      tax: params.tax || 0,
      shipping: params.shipping || 0,
      items: params.items,
    };

    this.sendEvent('purchase', eventParams);
    this.pushToDataLayer({
      event: 'purchase',
      ecommerce: eventParams,
    });
  }

  /**
   * Track search
   */
  trackSearch(searchTerm: string): void {
    this.sendEvent('search', {
      search_term: searchTerm,
    });

    this.pushToDataLayer({
      event: 'search',
      search_term: searchTerm,
    });
  }

  /**
   * Track category selection
   */
  trackCategoryView(category: string, itemCount: number): void {
    this.sendEvent('view_item_list', {
      item_list_name: category,
      item_count: itemCount,
    });

    this.pushToDataLayer({
      event: 'view_item_list',
      item_list_name: category,
      item_count: itemCount,
    });
  }

  /**
   * Track custom conversion event
   */
  trackConversion(conversionName: string, value?: number): void {
    const eventParams: Record<string, any> = {
      conversion_name: conversionName,
    };

    if (value !== undefined) {
      eventParams.value = value;
      eventParams.currency = 'USD';
    }

    this.sendEvent('conversion', eventParams);
    this.pushToDataLayer({
      event: 'conversion',
      ...eventParams,
    });
  }

  /**
   * Track user engagement
   */
  trackEngagement(action: string, category: string, label?: string, value?: number): void {
    const eventParams: Record<string, any> = {
      event_category: category,
      event_action: action,
    };

    if (label) eventParams.event_label = label;
    if (value !== undefined) eventParams.value = value;

    this.sendEvent('engagement', eventParams);
    this.pushToDataLayer({
      event: 'engagement',
      ...eventParams,
    });
  }

  /**
   * Set user properties
   */
  setUserProperties(properties: Record<string, any>): void {
    if (!this.isEnabled()) return;

    if (typeof window.gtag === 'function') {
      window.gtag('set', 'user_properties', properties);
      if (analyticsConfig.debug) {
        console.log('[Analytics] User properties set:', properties);
      }
    }
  }

  /**
   * Set user ID
   */
  setUserId(userId: string): void {
    if (!this.isEnabled()) return;

    if (typeof window.gtag === 'function') {
      window.gtag('set', { user_id: userId });
      if (analyticsConfig.debug) {
        console.log('[Analytics] User ID set:', userId);
      }
    }
  }
}

// Export singleton instance
export const analyticsService = new AnalyticsService();
export default analyticsService;
