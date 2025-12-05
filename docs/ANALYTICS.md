# Analytics Integration Guide

This document explains how to set up and use Google Analytics 4 (GA4) and Google Tag Manager (GTM) in your ecommerce application.

## Table of Contents

1. [Overview](#overview)
2. [Setup](#setup)
3. [Configuration](#configuration)
4. [Usage](#usage)
5. [Available Events](#available-events)
6. [Custom Events](#custom-events)
7. [Testing](#testing)

## Overview

The application includes a complete analytics solution with:

- **Google Analytics 4 (GA4)** - For detailed analytics and reporting
- **Google Tag Manager (GTM)** - For flexible tag management
- **Dedicated Analytics Service** - Centralized event tracking
- **React Hook Interface** - Easy integration in components
- **Ecommerce Events** - Pre-configured for ecommerce tracking

## Setup

### 1. Get Your IDs

**Google Analytics 4:**
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property (or use existing)
3. Navigate to Admin → Data Streams
4. Select your web stream
5. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

**Google Tag Manager:**
1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Create a new container (or use existing)
3. Copy the **Container ID** (format: `GTM-XXXXXXX`)

### 2. Configure the Application

Open `/config/analytics.config.ts` and replace the placeholder values:

```typescript
export const analyticsConfig = {
  // Replace with your actual GA4 Measurement ID
  ga4MeasurementId: 'G-XXXXXXXXXX',
  
  // Replace with your actual GTM Container ID
  gtmContainerId: 'GTM-XXXXXXX',
  
  // Set to true to enable tracking in development
  enableInDev: false,
  
  // Set to true to see debug logs in console
  debug: false,
};
```

### 3. That's It!

The analytics service is automatically initialized when your app loads. No additional setup required.

## Configuration

### Analytics Config Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `ga4MeasurementId` | string | `'G-XXXXXXXXXX'` | Your GA4 Measurement ID |
| `gtmContainerId` | string | `'GTM-XXXXXXX'` | Your GTM Container ID |
| `enableInDev` | boolean | `false` | Enable tracking in development mode |
| `debug` | boolean | `false` | Enable debug logging to console |

## Usage

### Using the Hook (Recommended)

The `useAnalytics` hook provides a simple interface for tracking events in React components:

```typescript
import { useAnalytics } from '../hooks/useAnalytics';

function MyComponent() {
  const analytics = useAnalytics();

  const handleAction = () => {
    analytics.trackEvent('button_click', {
      button_name: 'Subscribe',
      location: 'Header',
    });
  };

  return <button onClick={handleAction}>Subscribe</button>;
}
```

### Using the Service Directly

For non-React code or advanced usage:

```typescript
import { analyticsService } from '../services/analytics.service';

// Send a custom event
analyticsService.sendEvent('custom_event', {
  property1: 'value1',
  property2: 'value2',
});

// Push to GTM data layer
analyticsService.pushToDataLayer({
  event: 'custom_event',
  customData: 'value',
});
```

## Available Events

### Ecommerce Events

The following ecommerce events are automatically tracked:

#### Product View (view_item)
Tracked automatically when product images load in ProductCard component.

```typescript
analytics.trackProductView(product);
```

#### Add to Cart (add_to_cart)
Tracked when user adds item to cart.

```typescript
analytics.trackAddToCart(product, quantity);
```

#### Remove from Cart (remove_from_cart)
Tracked when user removes item from cart.

```typescript
analytics.trackRemoveFromCart(cartItem);
```

#### View Cart (view_cart)
Tracked when user opens shopping cart.

```typescript
analytics.trackViewCart(cartItems);
```

#### Begin Checkout (begin_checkout)
Tracked when user clicks "Proceed to Checkout".

```typescript
analytics.trackBeginCheckout(cartItems);
```

#### Purchase (purchase)
Tracked when checkout is completed.

```typescript
analytics.trackPurchase(transactionId, cartItems, tax, shipping);
```

#### Category View (view_item_list)
Tracked when user selects a category filter.

```typescript
analytics.trackCategoryView(category, itemCount);
```

### Other Events

#### Page View
```typescript
analytics.trackPageView('/page-path', 'Page Title');
```

#### Search
```typescript
analytics.trackSearch('search term');
```

#### Conversion
```typescript
analytics.trackConversion('newsletter_signup', 10.00);
```

#### Engagement
```typescript
analytics.trackEngagement('click', 'Button', 'Subscribe', 1);
```

## Custom Events

### Send Any Custom Event

```typescript
// Using the hook
const analytics = useAnalytics();

analytics.trackEvent('custom_event_name', {
  custom_param_1: 'value1',
  custom_param_2: 'value2',
  custom_param_3: 123,
});
```

### Push Custom Data to GTM

```typescript
analytics.pushToDataLayer({
  event: 'custom_event',
  userId: '12345',
  userType: 'premium',
  customData: {
    property1: 'value1',
    property2: 'value2',
  },
});
```

### Set User Properties

```typescript
analytics.setUserProperties({
  user_type: 'premium',
  signup_date: '2024-01-01',
  preferences: 'electronics',
});
```

### Set User ID

```typescript
analytics.setUserId('user_12345');
```

## Testing

### Enable Debug Mode

Set `debug: true` in `/config/analytics.config.ts` to see all events in the browser console.

### Test in Development

Set `enableInDev: true` in `/config/analytics.config.ts` to enable tracking in development mode.

### Verify GA4 Events

1. Go to Google Analytics → Reports → Realtime
2. Perform actions in your app
3. Events should appear in the Realtime report within seconds

### Verify GTM Events

1. In GTM, enable **Preview Mode**
2. Visit your application
3. The GTM debug panel will show all events being fired

### Use GA4 DebugView

1. Enable debug mode in config: `debug: true`
2. Go to Google Analytics → Configure → DebugView
3. Perform actions in your app
4. Events will appear in real-time with detailed information

## Event Data Structure

### Ecommerce Item Structure

All ecommerce events use the following item structure:

```typescript
{
  item_id: string | number;      // Product ID
  item_name: string;             // Product name
  price: number;                 // Product price
  quantity?: number;             // Quantity (default: 1)
  item_category?: string;        // Product category
  item_brand?: string;           // Product brand (optional)
  item_variant?: string;         // Product variant (optional)
  index?: number;                // Position in list (optional)
}
```

### Example: Add to Cart Event

```javascript
{
  event: 'add_to_cart',
  ecommerce: {
    currency: 'USD',
    value: 199.99,
    items: [{
      item_id: 1,
      item_name: 'Premium Wireless Headphones',
      price: 199.99,
      quantity: 1,
      item_category: 'Electronics'
    }]
  }
}
```

## Best Practices

1. **Always use the hook in React components** - It provides type safety and better integration
2. **Track meaningful events** - Don't track every click, focus on important user actions
3. **Use consistent naming** - Follow GA4 naming conventions (lowercase with underscores)
4. **Test before deploying** - Always test analytics in preview/debug mode first
5. **Don't track PII** - Never send personally identifiable information without proper consent
6. **Use GTM for flexibility** - Configure additional tags and triggers in GTM without code changes

## Troubleshooting

### Events Not Showing Up

1. Check that IDs are correctly configured in `/config/analytics.config.ts`
2. Verify `enableInDev` is `true` if testing in development
3. Check browser console for errors
4. Verify scripts loaded in browser DevTools → Network tab
5. Check ad blockers aren't blocking GA/GTM scripts

### Events Showing in DebugView but Not in Reports

- Standard GA4 reports can take 24-48 hours to populate
- Use Realtime reports for immediate verification
- DebugView shows all events including debug traffic

### GTM Not Loading

1. Verify GTM Container ID format: `GTM-XXXXXXX`
2. Check browser console for script loading errors
3. Disable browser extensions that might block scripts
4. Verify GTM container is published (not in draft mode)

## Additional Resources

- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [GTM Documentation](https://developers.google.com/tag-platform/tag-manager/web)
- [GA4 Ecommerce Events](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [GA4 Event Reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)

## Support

For issues or questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review GA4/GTM documentation
3. Check browser console for errors
4. Verify configuration in `/config/analytics.config.ts`
