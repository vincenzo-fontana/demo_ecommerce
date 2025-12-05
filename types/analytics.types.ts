/**
 * Analytics Type Definitions
 * TypeScript types for analytics events and parameters
 */

// ============================================================================
// Core Types
// ============================================================================

export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD' | string;

export interface AnalyticsConfig {
  ga4MeasurementId: string;
  gtmContainerId: string;
  enableInDev: boolean;
  debug: boolean;
}

// ============================================================================
// Ecommerce Item Types
// ============================================================================

export interface EcommerceItem {
  item_id: string | number;
  item_name: string;
  affiliation?: string;
  coupon?: string;
  currency?: Currency;
  discount?: number;
  index?: number;
  item_brand?: string;
  item_category?: string;
  item_category2?: string;
  item_category3?: string;
  item_category4?: string;
  item_category5?: string;
  item_list_id?: string;
  item_list_name?: string;
  item_variant?: string;
  location_id?: string;
  price?: number;
  quantity?: number;
}

// ============================================================================
// Event Parameter Types
// ============================================================================

export interface BaseEventParams {
  [key: string]: any;
}

export interface ViewItemParams {
  currency?: Currency;
  value: number;
  items: EcommerceItem[];
}

export interface ViewItemListParams {
  item_list_id?: string;
  item_list_name: string;
  items: EcommerceItem[];
}

export interface SelectItemParams {
  item_list_id?: string;
  item_list_name?: string;
  items: EcommerceItem[];
}

export interface AddToCartParams {
  currency?: Currency;
  value: number;
  items: EcommerceItem[];
}

export interface RemoveFromCartParams {
  currency?: Currency;
  value: number;
  items: EcommerceItem[];
}

export interface ViewCartParams {
  currency?: Currency;
  value: number;
  items: EcommerceItem[];
}

export interface BeginCheckoutParams {
  currency?: Currency;
  value: number;
  coupon?: string;
  items: EcommerceItem[];
}

export interface AddPaymentInfoParams {
  currency?: Currency;
  value: number;
  coupon?: string;
  payment_type: string;
  items: EcommerceItem[];
}

export interface AddShippingInfoParams {
  currency?: Currency;
  value: number;
  coupon?: string;
  shipping_tier: string;
  items: EcommerceItem[];
}

export interface PurchaseParams {
  transaction_id: string;
  currency?: Currency;
  value: number;
  affiliation?: string;
  coupon?: string;
  shipping?: number;
  tax?: number;
  items: EcommerceItem[];
}

export interface RefundParams {
  transaction_id: string;
  currency?: Currency;
  value?: number;
  affiliation?: string;
  coupon?: string;
  shipping?: number;
  tax?: number;
  items?: EcommerceItem[];
}

export interface SelectPromotionParams {
  creative_name?: string;
  creative_slot?: string;
  location_id?: string;
  promotion_id?: string;
  promotion_name?: string;
  items?: EcommerceItem[];
}

export interface ViewPromotionParams {
  creative_name?: string;
  creative_slot?: string;
  location_id?: string;
  promotion_id?: string;
  promotion_name?: string;
  items?: EcommerceItem[];
}

// ============================================================================
// Standard Event Types
// ============================================================================

export interface PageViewParams {
  page_title?: string;
  page_location?: string;
  page_path?: string;
}

export interface SearchParams {
  search_term: string;
}

export interface ShareParams {
  method: string;
  content_type: string;
  item_id: string;
}

export interface LoginParams {
  method: string;
}

export interface SignUpParams {
  method: string;
}

export interface GenerateLeadParams {
  currency?: Currency;
  value?: number;
}

// ============================================================================
// Custom Event Types
// ============================================================================

export interface EngagementParams {
  event_category: string;
  event_action: string;
  event_label?: string;
  value?: number;
}

export interface ConversionParams {
  conversion_name: string;
  value?: number;
  currency?: Currency;
}

export interface ErrorParams {
  error_message: string;
  error_code?: string;
  error_stack?: string;
  component_stack?: string;
  error_boundary?: string;
}

export interface FormInteractionParams {
  form_name: string;
  form_destination?: string;
  form_id?: string;
  form_submit_text?: string;
}

export interface FormFieldParams {
  form_name: string;
  field_name: string;
  field_type?: string;
}

export interface FormValidationErrorParams {
  form_name: string;
  field_name: string;
  error_type: string;
  error_message?: string;
}

export interface VideoParams {
  video_id: string;
  video_title: string;
  video_provider?: string;
  video_url?: string;
  video_duration?: number;
  video_current_time?: number;
  video_percent?: number;
}

export interface FileDownloadParams {
  file_name: string;
  file_extension?: string;
  file_type?: string;
  link_text?: string;
  link_url?: string;
}

export interface OutboundLinkParams {
  link_domain: string;
  link_url: string;
  link_text?: string;
  outbound: boolean;
}

export interface ScrollDepthParams {
  percent: number;
  page_path: string;
}

export interface FilterParams {
  filter_type: string;
  filter_value: string;
  results_count?: number;
}

export interface SortParams {
  sort_type: string;
  sort_order: 'asc' | 'desc';
}

// ============================================================================
// GTM Data Layer Types
// ============================================================================

export interface DataLayerEvent {
  event: string;
  [key: string]: any;
}

export interface EcommerceDataLayer extends DataLayerEvent {
  ecommerce: {
    currency?: Currency;
    value?: number;
    items?: EcommerceItem[];
    transaction_id?: string;
    affiliation?: string;
    coupon?: string;
    shipping?: number;
    tax?: number;
    [key: string]: any;
  };
}

// ============================================================================
// User Property Types
// ============================================================================

export interface UserProperties {
  user_id?: string;
  user_type?: string;
  account_type?: string;
  signup_date?: string;
  preferred_category?: string;
  preferred_theme?: string;
  login_method?: string;
  language?: string;
  country?: string;
  [key: string]: any;
}

// ============================================================================
// Analytics Service Method Types
// ============================================================================

export interface IAnalyticsService {
  initialize(): void;
  initializeGA4(): void;
  initializeGTM(): void;
  
  sendEvent(eventName: string, eventParams?: BaseEventParams): void;
  pushToDataLayer(data: DataLayerEvent): void;
  
  trackPageView(pagePath: string, pageTitle?: string): void;
  trackViewItem(params: ViewItemParams): void;
  trackViewItemList(params: ViewItemListParams): void;
  trackSelectItem(params: SelectItemParams): void;
  trackAddToCart(params: AddToCartParams): void;
  trackRemoveFromCart(params: RemoveFromCartParams): void;
  trackViewCart(params: ViewCartParams): void;
  trackBeginCheckout(params: BeginCheckoutParams): void;
  trackAddPaymentInfo(params: AddPaymentInfoParams): void;
  trackAddShippingInfo(params: AddShippingInfoParams): void;
  trackPurchase(params: PurchaseParams): void;
  trackRefund(params: RefundParams): void;
  trackSelectPromotion(params: SelectPromotionParams): void;
  trackViewPromotion(params: ViewPromotionParams): void;
  
  trackSearch(searchTerm: string): void;
  trackShare(params: ShareParams): void;
  trackLogin(params: LoginParams): void;
  trackSignUp(params: SignUpParams): void;
  trackGenerateLead(params?: GenerateLeadParams): void;
  
  trackEngagement(action: string, category: string, label?: string, value?: number): void;
  trackConversion(conversionName: string, value?: number): void;
  trackError(params: ErrorParams): void;
  
  setUserProperties(properties: UserProperties): void;
  setUserId(userId: string): void;
}

// ============================================================================
// Hook Return Type
// ============================================================================

export interface UseAnalyticsReturn {
  trackPageView: (pagePath: string, pageTitle?: string) => void;
  trackProductView: (product: any) => void;
  trackAddToCart: (product: any, quantity?: number) => void;
  trackRemoveFromCart: (cartItem: any) => void;
  trackViewCart: (cartItems: any[]) => void;
  trackBeginCheckout: (cartItems: any[]) => void;
  trackPurchase: (transactionId: string, cartItems: any[], tax?: number, shipping?: number) => void;
  trackSearch: (searchTerm: string) => void;
  trackCategoryView: (category: string, itemCount: number) => void;
  trackEvent: (eventName: string, eventParams?: BaseEventParams) => void;
  trackEngagement: (action: string, category: string, label?: string, value?: number) => void;
  trackConversion: (conversionName: string, value?: number) => void;
  pushToDataLayer: (data: DataLayerEvent) => void;
  setUserProperties: (properties: UserProperties) => void;
  setUserId: (userId: string) => void;
}

// ============================================================================
// GA4 Event Names (Standard)
// ============================================================================

export const GA4_EVENTS = {
  // Ecommerce
  ADD_PAYMENT_INFO: 'add_payment_info',
  ADD_SHIPPING_INFO: 'add_shipping_info',
  ADD_TO_CART: 'add_to_cart',
  ADD_TO_WISHLIST: 'add_to_wishlist',
  BEGIN_CHECKOUT: 'begin_checkout',
  PURCHASE: 'purchase',
  REFUND: 'refund',
  REMOVE_FROM_CART: 'remove_from_cart',
  SELECT_ITEM: 'select_item',
  SELECT_PROMOTION: 'select_promotion',
  VIEW_CART: 'view_cart',
  VIEW_ITEM: 'view_item',
  VIEW_ITEM_LIST: 'view_item_list',
  VIEW_PROMOTION: 'view_promotion',
  
  // Engagement
  GENERATE_LEAD: 'generate_lead',
  LOGIN: 'login',
  SEARCH: 'search',
  SELECT_CONTENT: 'select_content',
  SHARE: 'share',
  SIGN_UP: 'sign_up',
  
  // Other
  PAGE_VIEW: 'page_view',
  SCREEN_VIEW: 'screen_view',
  
  // Custom (commonly used)
  ENGAGEMENT: 'engagement',
  CONVERSION: 'conversion',
  ERROR: 'error',
  FORM_START: 'form_start',
  FORM_SUBMIT: 'form_submit',
  VIDEO_START: 'video_start',
  VIDEO_PROGRESS: 'video_progress',
  VIDEO_COMPLETE: 'video_complete',
  FILE_DOWNLOAD: 'file_download',
  OUTBOUND_CLICK: 'outbound_click',
  SCROLL_DEPTH: 'scroll_depth',
} as const;

export type GA4EventName = typeof GA4_EVENTS[keyof typeof GA4_EVENTS];
