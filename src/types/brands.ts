export type Brand<K, T> = K & { readonly __brand: T };

export type UserId = Brand<string, 'UserId'>;
export type StripeSubscriptionId = Brand<string, 'StripeSubscriptionId'>;
export type StripeCustomerId = Brand<string, 'StripeCustomerId'>;
export type StripePriceId = Brand<string, 'StripePriceId'>;
