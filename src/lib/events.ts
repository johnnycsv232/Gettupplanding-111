/**
 * Event Bus
 * Simple Pub/Sub for inter-component communication.
 * Useful for triggering global animations or non-state notifications.
 */

type EventCallback = (data?: any) => void;

class EventBus {
  private events: Record<string, EventCallback[]> = {};

  on(event: string, callback: EventCallback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    return () => this.off(event, callback);
  }

  off(event: string, callback: EventCallback) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter((cb) => cb !== callback);
  }

  emit(event: string, data?: any) {
    if (!this.events[event]) return;
    this.events[event].forEach((cb) => cb(data));
  }
}

export const events = new EventBus();

// Predefined Events for consistency
export const EVENT_NAMES = {
  UI_GLINT_TRIGGER: 'ui:glint-trigger',
  ANIMATION_COMPLETE: 'animation:complete',
  MODAL_OPENED: 'modal:opened',
} as const;
