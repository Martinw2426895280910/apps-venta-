import { CONFIG } from '../data';

/**
 * Safely opens PayPal checkout in any environment (including iframe sandboxes
 * in AI Studio or restricted mobile webviews) by attempting window.open with fallback.
 */
export function openPayPalCheckout(e?: React.MouseEvent) {
  if (e) {
    e.preventDefault();
  }

  const url = CONFIG.paymentUrl;
  
  try {
    // Try opening top level or new tab
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    
    // If window.open was blocked by popup blocker or iframe sandbox:
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.assign(url);
    }
  } catch {
    // Fallback direct assignment
    window.location.href = url;
  }
}
