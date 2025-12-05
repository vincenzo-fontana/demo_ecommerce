# 📊 Analytics Integration

This ecommerce application includes a complete **Google Analytics 4 (GA4)** and **Google Tag Manager (GTM)** integration with automatic ecommerce event tracking.

## 🎯 Features

- ✅ **Google Analytics 4 (GA4)** - Advanced analytics and reporting
- ✅ **Google Tag Manager (GTM)** - Flexible tag and trigger management  
- ✅ **Automatic Ecommerce Tracking** - All standard GA4 ecommerce events
- ✅ **Custom Event Tracking** - Track any custom events you need
- ✅ **React Hook Interface** - Easy-to-use `useAnalytics()` hook
- ✅ **TypeScript Support** - Full type safety with TypeScript definitions
- ✅ **Debug Mode** - Console logging for development and testing
- ✅ **Production Ready** - Optimized for performance

## 🚀 Quick Start (3 Steps)

### 1. Get Your IDs

Get your **GA4 Measurement ID** (format: `G-XXXXXXXXXX`) from [Google Analytics](https://analytics.google.com/) and your **GTM Container ID** (format: `GTM-XXXXXXX`) from [Google Tag Manager](https://tagmanager.google.com/).

### 2. Configure

Edit `/config/analytics.config.ts`:

```typescript
export const analyticsConfig = {
  ga4MeasurementId: 'G-ABC123DEF4',  // Your GA4 ID
  gtmContainerId: 'GTM-ABC1234',     // Your GTM ID
  enableInDev: false,                // Enable in development?
  debug: false,                      // Show console logs?
};
```

### 3. Done! 🎉

Analytics is automatically initialized. No additional setup needed!

## 📦 What's Included

### Files Created

```
/config/
  └── analytics.config.ts          # Configuration file

/services/
  └── analytics.service.ts         # Core analytics service

/hooks/
  └── useAnalytics.ts              # React hook for components

/types/
  └── analytics.types.ts           # TypeScript type definitions

/docs/
  ├── ANALYTICS.md                 # Complete documentation
  └── ANALYTICS_QUICK_START.md     # Quick setup guide

/examples/
  └── analytics-examples.tsx       # 15+ code examples
```

### Already Integrated

Analytics tracking has been integrated into:

- ✅ **App.tsx** - Category filtering
- ✅ **ProductCard.tsx** - Product views  
- ✅ **ShoppingCart.tsx** - Cart events & checkout
- ✅ **Add to Cart** - Tracked automatically
- ✅ **Remove from Cart** - Tracked automatically

## 📊 Events Tracked Automatically

| Event | When Triggered | GA4 Event Name |
|-------|---------------|----------------|
| **Product View** | Product displayed | `view_item` |
| **Add to Cart** | Item added to cart | `add_to_cart` |
| **Remove from Cart** | Item removed from cart | `remove_from_cart` |
| **View Cart** | Cart opened | `view_cart` |
| **Begin Checkout** | Checkout button clicked | `begin_checkout` |
| **Purchase** | Order completed | `purchase` |
| **Category View** | Category filter changed | `view_item_list` |

All events follow [GA4 ecommerce standards](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce).

## 💻 Usage Examples

### Track a Button Click

```typescript
import { useAnalytics } from './hooks/useAnalytics';

function MyComponent() {
  const analytics = useAnalytics();
  
  return (
    <button onClick={() => analytics.trackEvent('button_click', {
      button_name: 'Subscribe',
      location: 'Header'
    })}>
      Subscribe
    </button>
  );
}
```

### Track Form Submission

```typescript
const analytics = useAnalytics();

const handleSubmit = () => {
  analytics.trackConversion('newsletter_signup');
};
```

### Track Search

```typescript
const handleSearch = (query: string) => {
  analytics.trackSearch(query);
};
```

### Track Custom Event

```typescript
analytics.trackEvent('custom_event', {
  property1: 'value1',
  property2: 'value2',
});
```

### Set User Properties

```typescript
analytics.setUserProperties({
  user_type: 'premium',
  preferred_category: 'electronics',
});
```

## 📚 Documentation

- **[Quick Start Guide](/docs/ANALYTICS_QUICK_START.md)** - Get started in 5 minutes
- **[Complete Documentation](/docs/ANALYTICS.md)** - Full guide with all features
- **[Code Examples](/examples/analytics-examples.tsx)** - 15+ practical examples
- **[Type Definitions](/types/analytics.types.ts)** - TypeScript types

## 🔍 Testing & Debugging

### Enable Debug Mode

```typescript
// In /config/analytics.config.ts
debug: true,
```

This will log all events to the browser console.

### Test in Development

```typescript
// In /config/analytics.config.ts
enableInDev: true,
```

This enables tracking in development mode.

### Verify in GA4

1. Go to **Google Analytics** → **Reports** → **Realtime**
2. Use your app in another tab
3. Events appear in seconds!

### GTM Preview Mode

1. In GTM, click **Preview**
2. Enter your app URL  
3. See all events in real-time

## 🛠️ Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `ga4MeasurementId` | string | `'G-XXXXXXXXXX'` | Your GA4 Measurement ID |
| `gtmContainerId` | string | `'GTM-XXXXXXX'` | Your GTM Container ID |
| `enableInDev` | boolean | `false` | Enable in development mode |
| `debug` | boolean | `false` | Log events to console |

## 🎓 Learn More

### Available Methods (useAnalytics hook)

```typescript
const analytics = useAnalytics();

// Ecommerce
analytics.trackProductView(product)
analytics.trackAddToCart(product, quantity)
analytics.trackRemoveFromCart(cartItem)
analytics.trackViewCart(cartItems)
analytics.trackBeginCheckout(cartItems)
analytics.trackPurchase(transactionId, cartItems, tax, shipping)

// Standard Events
analytics.trackPageView(path, title)
analytics.trackSearch(searchTerm)
analytics.trackCategoryView(category, itemCount)

// Custom Events
analytics.trackEvent(eventName, eventParams)
analytics.trackEngagement(action, category, label, value)
analytics.trackConversion(conversionName, value)

// User Properties
analytics.setUserId(userId)
analytics.setUserProperties(properties)

// GTM Data Layer
analytics.pushToDataLayer(data)
```

### Direct Service Usage (non-React)

```typescript
import { analyticsService } from './services/analytics.service';

analyticsService.sendEvent('custom_event', { key: 'value' });
analyticsService.pushToDataLayer({ event: 'custom', data: 'value' });
```

## 🔧 Advanced Usage

### Custom Ecommerce Events

```typescript
// Add to Wishlist
analytics.trackEvent('add_to_wishlist', {
  currency: 'USD',
  value: product.price,
  items: [{
    item_id: product.id,
    item_name: product.name,
    price: product.price,
    item_category: product.category,
  }],
});
```

### Track Promotions

```typescript
analytics.trackEvent('view_promotion', {
  creative_name: 'Summer Sale Banner',
  creative_slot: 'homepage_hero',
  promotion_id: 'SUMMER2024',
  promotion_name: 'Summer Sale',
});
```

### Track Refunds

```typescript
import { analyticsService } from './services/analytics.service';

analyticsService.trackRefund({
  transaction_id: 'ORDER-12345',
  currency: 'USD',
  value: 199.99,
  items: [...],
});
```

## 🚨 Troubleshooting

**Events not showing?**
- Verify IDs are correct format
- Check browser console for errors
- Disable ad blockers
- Enable debug mode

**Only working in dev?**
- Check `enableInDev` setting
- In production, tracking is automatic

**GTM not loading?**
- Verify container is published
- Check container ID format
- Look for script errors in console

For more help, see [Complete Documentation](/docs/ANALYTICS.md#troubleshooting).

## 📖 Additional Resources

- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [GTM Documentation](https://developers.google.com/tag-platform/tag-manager/web)
- [GA4 Ecommerce Events](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [GA4 Event Reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)

## ⚠️ Important Notes

- **Never track PII** (Personally Identifiable Information) without proper consent
- **Test thoroughly** before deploying to production
- **Use GTM** for additional tags without code changes
- **Review privacy policies** and comply with regulations (GDPR, CCPA, etc.)
- **Monitor quota limits** in GA4 (500 events per session recommended)

## 🎉 You're All Set!

Your ecommerce app now has enterprise-level analytics tracking. Start tracking, analyzing, and optimizing your user experience!

---

**Need help?** Check the [documentation](/docs/ANALYTICS.md) or [examples](/examples/analytics-examples.tsx).
