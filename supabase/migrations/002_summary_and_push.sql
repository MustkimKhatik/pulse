alter table posts add column if not exists summary text;

create table if not exists push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  subscription jsonb not null,
  created_at timestamptz default now()
);

create unique index if not exists push_subscriptions_endpoint_idx
  on push_subscriptions ((subscription->>'endpoint'));
