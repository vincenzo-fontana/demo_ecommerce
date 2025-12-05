/**
 * Analytics Examples
 * 
 * This file demonstrates various ways to use the analytics service
 * in your React components.
 */

import { useAnalytics } from '../hooks/useAnalytics';
import { analyticsService } from '../services/analytics.service';

// ============================================================================
// Example 1: Basic Event Tracking in a Component
// ============================================================================

export function NewsletterSignup() {
  const analytics = useAnalytics();

  const handleSubmit = (email: string) => {
    // Track newsletter signup
    analytics.trackConversion('newsletter_signup');
    
    // Or with more detail
    analytics.trackEvent('newsletter_signup', {
      method: 'email',
      location: 'footer',
    });
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit('user@example.com');
    }}>
      <input type="email" placeholder="Your email" />
      <button type="submit">Subscribe</button>
    </form>
  );
}

// ============================================================================
// Example 2: Track Button Clicks
// ============================================================================

export function SocialShareButtons() {
  const analytics = useAnalytics();

  const handleShare = (platform: string) => {
    analytics.trackEngagement('share', 'Social', platform);
    
    // Alternative: custom event
    analytics.trackEvent('social_share', {
      platform,
      content_type: 'product',
    });
  };

  return (
    <div>
      <button onClick={() => handleShare('facebook')}>Share on Facebook</button>
      <button onClick={() => handleShare('twitter')}>Share on Twitter</button>
      <button onClick={() => handleShare('linkedin')}>Share on LinkedIn</button>
    </div>
  );
}

// ============================================================================
// Example 3: Track Form Interactions
// ============================================================================

export function ContactForm() {
  const analytics = useAnalytics();

  const handleFieldFocus = (fieldName: string) => {
    analytics.trackEvent('form_field_focus', {
      form_name: 'contact_form',
      field_name: fieldName,
    });
  };

  const handleFormSubmit = () => {
    analytics.trackConversion('contact_form_submission');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input 
        type="text" 
        onFocus={() => handleFieldFocus('name')}
        placeholder="Name" 
      />
      <input 
        type="email" 
        onFocus={() => handleFieldFocus('email')}
        placeholder="Email" 
      />
      <textarea 
        onFocus={() => handleFieldFocus('message')}
        placeholder="Message" 
      />
      <button type="submit">Send</button>
    </form>
  );
}

// ============================================================================
// Example 4: Track Video Interactions
// ============================================================================

export function VideoPlayer({ videoId, videoTitle }: { videoId: string; videoTitle: string }) {
  const analytics = useAnalytics();

  const handlePlay = () => {
    analytics.trackEvent('video_start', {
      video_id: videoId,
      video_title: videoTitle,
    });
  };

  const handleComplete = () => {
    analytics.trackEvent('video_complete', {
      video_id: videoId,
      video_title: videoTitle,
    });
  };

  const handleProgress = (progress: number) => {
    if (progress === 25 || progress === 50 || progress === 75) {
      analytics.trackEvent('video_progress', {
        video_id: videoId,
        video_title: videoTitle,
        progress_percent: progress,
      });
    }
  };

  return (
    <video
      onPlay={handlePlay}
      onEnded={handleComplete}
      onTimeUpdate={(e) => {
        const video = e.currentTarget;
        const progress = Math.round((video.currentTime / video.duration) * 100);
        handleProgress(progress);
      }}
    >
      <source src={`/videos/${videoId}.mp4`} type="video/mp4" />
    </video>
  );
}

// ============================================================================
// Example 5: Track Search with Results
// ============================================================================

export function SearchBar() {
  const analytics = useAnalytics();

  const handleSearch = (query: string, resultsCount: number) => {
    // Track the search
    analytics.trackSearch(query);
    
    // Track additional search metadata
    analytics.trackEvent('search_performed', {
      search_term: query,
      results_count: resultsCount,
      has_results: resultsCount > 0,
    });
  };

  return (
    <input
      type="search"
      onChange={(e) => {
        const query = e.target.value;
        // Perform search and get results
        const results = performSearch(query);
        handleSearch(query, results.length);
      }}
      placeholder="Search products..."
    />
  );
}

function performSearch(query: string): any[] {
  // Mock search function
  return [];
}

// ============================================================================
// Example 6: Track User Preferences
// ============================================================================

export function ThemeSelector() {
  const analytics = useAnalytics();

  const handleThemeChange = (theme: string) => {
    // Set user property
    analytics.setUserProperties({
      preferred_theme: theme,
    });

    // Track the event
    analytics.trackEvent('theme_changed', {
      theme,
    });
  };

  return (
    <select onChange={(e) => handleThemeChange(e.target.value)}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="auto">Auto</option>
    </select>
  );
}

// ============================================================================
// Example 7: Track Scroll Depth
// ============================================================================

export function ArticlePage() {
  const analytics = useAnalytics();
  const trackedMilestones = new Set<number>();

  const handleScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    );

    // Track at 25%, 50%, 75%, and 100%
    [25, 50, 75, 100].forEach((milestone) => {
      if (scrollPercent >= milestone && !trackedMilestones.has(milestone)) {
        trackedMilestones.add(milestone);
        analytics.trackEvent('scroll_depth', {
          percent: milestone,
          page: window.location.pathname,
        });
      }
    });
  };

  return (
    <article onScroll={handleScroll}>
      {/* Article content */}
    </article>
  );
}

// ============================================================================
// Example 8: Track File Downloads
// ============================================================================

export function DownloadButton({ fileName, fileType }: { fileName: string; fileType: string }) {
  const analytics = useAnalytics();

  const handleDownload = () => {
    analytics.trackEvent('file_download', {
      file_name: fileName,
      file_type: fileType,
      link_url: `/downloads/${fileName}`,
    });
  };

  return (
    <a 
      href={`/downloads/${fileName}`} 
      download 
      onClick={handleDownload}
    >
      Download {fileName}
    </a>
  );
}

// ============================================================================
// Example 9: Track Outbound Links
// ============================================================================

export function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  const analytics = useAnalytics();

  const handleClick = () => {
    analytics.trackEvent('outbound_link_click', {
      link_url: href,
      link_domain: new URL(href).hostname,
    });
  };

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      onClick={handleClick}
    >
      {children}
    </a>
  );
}

// ============================================================================
// Example 10: Track Filter Usage
// ============================================================================

export function ProductFilters() {
  const analytics = useAnalytics();

  const handleFilterChange = (filterType: string, filterValue: string) => {
    analytics.trackEvent('filter_applied', {
      filter_type: filterType,
      filter_value: filterValue,
    });
  };

  return (
    <div>
      <select onChange={(e) => handleFilterChange('price', e.target.value)}>
        <option value="all">All Prices</option>
        <option value="0-50">$0 - $50</option>
        <option value="50-100">$50 - $100</option>
        <option value="100+">$100+</option>
      </select>

      <select onChange={(e) => handleFilterChange('rating', e.target.value)}>
        <option value="all">All Ratings</option>
        <option value="4+">4+ Stars</option>
        <option value="3+">3+ Stars</option>
      </select>
    </div>
  );
}

// ============================================================================
// Example 11: Direct Service Usage (Non-React)
// ============================================================================

// In a utility function or non-React code
export function trackFormValidationError(formName: string, fieldName: string, errorType: string) {
  analyticsService.sendEvent('form_validation_error', {
    form_name: formName,
    field_name: fieldName,
    error_type: errorType,
  });
}

// In an API utility
export function trackAPIError(endpoint: string, statusCode: number, errorMessage: string) {
  analyticsService.sendEvent('api_error', {
    endpoint,
    status_code: statusCode,
    error_message: errorMessage,
  });
}

// Track app initialization
export function trackAppInitialization() {
  analyticsService.initialize();
  
  analyticsService.sendEvent('app_initialized', {
    app_version: '1.0.0',
    environment: process.env.NODE_ENV,
    user_agent: navigator.userAgent,
  });
}

// ============================================================================
// Example 12: Track Authentication Events
// ============================================================================

export function LoginForm() {
  const analytics = useAnalytics();

  const handleLogin = async (email: string, method: string) => {
    try {
      // Perform login
      const userId = await login(email, method);
      
      // Set user ID
      analytics.setUserId(userId);
      
      // Track successful login
      analytics.trackEvent('login', {
        method,
      });
      
      // Set user properties
      analytics.setUserProperties({
        login_method: method,
        account_type: 'standard',
      });
    } catch (error) {
      // Track failed login
      analytics.trackEvent('login_failed', {
        method,
        error_type: 'invalid_credentials',
      });
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleLogin('user@example.com', 'email');
    }}>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}

async function login(email: string, method: string): Promise<string> {
  // Mock login function
  return 'user_12345';
}

// ============================================================================
// Example 13: Track Error Boundaries
// ============================================================================

import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundaryWithAnalytics extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Track error to analytics
    analyticsService.sendEvent('app_error', {
      error_message: error.message,
      error_stack: error.stack,
      component_stack: errorInfo.componentStack,
      error_boundary: 'main',
    });

    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

// ============================================================================
// Example 14: Track Performance Metrics
// ============================================================================

export function trackPageLoadTime() {
  // Wait for page load
  window.addEventListener('load', () => {
    // Get performance metrics
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
    
    analyticsService.sendEvent('page_performance', {
      page_load_time: pageLoadTime,
      dom_ready_time: domReadyTime,
      page_path: window.location.pathname,
    });
  });
}

// ============================================================================
// Example 15: Track Custom Ecommerce Events
// ============================================================================

export function WishlistButton({ product }: { product: any }) {
  const analytics = useAnalytics();

  const handleAddToWishlist = () => {
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
  };

  return (
    <button onClick={handleAddToWishlist}>
      Add to Wishlist
    </button>
  );
}
