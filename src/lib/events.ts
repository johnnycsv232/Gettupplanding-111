/**
 * Event Bus
 * Type-safe Pub/Sub for inter-component communication.
 * Use for global animations, ephemeral triggers, or non-state notifications.
 *
 * @see https://egghead.io/blog/using-branded-types-in-typescript (TypeScript Expert skill)
 */

// --- Event Registry: Define all allowed events and their payloads here ---
interface EventPayloads {
  'ui:glint-trigger': { elementId?: string };
  'animation:complete': { animationName: string; duration: number };
  'modal:opened': { modalId: string };
  'modal:closed': { modalId: string };
  'lead:captured': { source: string };
}

type EventName = keyof EventPayloads;
type EventCallback<T extends EventName> = (data: EventPayloads[T]) => void;

class EventBus {
  private listeners: {
    [K in EventName]?: EventCallback<K>[];
  } = {};

  /**
   * Subscribe to an event.
   * @returns Unsubscribe function.
   */
  on<T extends EventName>(event: T, callback: EventCallback<T>): () => void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    (this.listeners[event] as EventCallback<T>[]).push(callback);
    return () => this.off(event, callback);
  }

  off<T extends EventName>(event: T, callback: EventCallback<T>): void {
    const eventListeners = this.listeners[event] as EventCallback<T>[] | undefined;
    if (!eventListeners) return;
    this.listeners[event] = eventListeners.filter(
      (cb) => cb !== callback
    ) as (typeof this.listeners)[T];
  }

  emit<T extends EventName>(event: T, data: EventPayloads[T]): void {
    const eventListeners = this.listeners[event] as EventCallback<T>[] | undefined;
    if (!eventListeners) return;
    eventListeners.forEach((cb) => cb(data));
  }
}

export const events = new EventBus();

// Predefined Events for consistency (matches EventPayloads keys)
export const EVENT_NAMES = {
  UI_GLINT_TRIGGER: 'ui:glint-trigger',
  ANIMATION_COMPLETE: 'animation:complete',
  MODAL_OPENED: 'modal:opened',
  MODAL_CLOSED: 'modal:closed',
  LEAD_CAPTURED: 'lead:captured',
} as const satisfies Record<string, EventName>;
