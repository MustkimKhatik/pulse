create table posts (
  id          uuid primary key default gen_random_uuid(),
  category    text not null check (category in ('A', 'B')),
  title       text not null,
  content     text not null,
  source_url  text,
  source_name text,
  topic       text,
  fetched_at  timestamptz default now()
);

create index posts_category_fetched_at_idx on posts (category, fetched_at desc);
create index posts_topic_fetched_at_idx on posts (topic, fetched_at desc);
