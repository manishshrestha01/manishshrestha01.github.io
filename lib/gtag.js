// lib/gtag.js

// Export Google Analytics Measurement ID
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Track pageviews
export const pageview = (url) => {
  if (GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  } else {
    console.error('GA_TRACKING_ID is missing');
  }
};

// Track events
export const event = ({ action, category, label, value }) => {
  if (GA_TRACKING_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
  } else {
    console.error('GA_TRACKING_ID is missing');
  }
};
