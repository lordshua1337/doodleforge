-- DoodleForge V3 Database Schema

-- ============================================
-- USERS
-- ============================================
create table if not exists user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  credits_remaining integer not null default 3,
  subscription_tier text default 'free' check (subscription_tier in ('free', 'dip', 'binge', 'addiction')),
  stripe_customer_id text,
  shipping_address jsonb default '{}',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table user_profiles enable row level security;
create policy "Users can read own profile" on user_profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on user_profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on user_profiles for insert with check (auth.uid() = id);

create or replace function handle_new_user()
returns trigger as $$
begin
  insert into user_profiles (id, display_name, credits_remaining)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email), 3);
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ============================================
-- CHILDREN
-- ============================================
create table if not exists children (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  age integer,
  avatar_emoji text default '🎨',
  created_at timestamptz default now() not null
);

alter table children enable row level security;
create policy "Users can manage own children" on children for all using (auth.uid() = user_id);
create index idx_children_user on children(user_id);

-- ============================================
-- DRAWINGS (originals uploaded by parent)
-- ============================================
create table if not exists drawings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  child_id uuid references children(id) on delete set null,
  original_url text not null,
  file_name text,
  file_size integer,
  created_at timestamptz default now() not null
);

alter table drawings enable row level security;
create policy "Users can manage own drawings" on drawings for all using (auth.uid() = user_id);
create index idx_drawings_user on drawings(user_id);

-- ============================================
-- FORGES (AI-generated results)
-- ============================================
create table if not exists forges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  drawing_id uuid references drawings(id) on delete set null,
  child_id uuid references children(id) on delete set null,
  style text not null,
  is_epic boolean default false,
  result_url text,
  prompt_used text,
  status text default 'pending' check (status in ('pending', 'generating', 'complete', 'failed')),
  generation_time_ms integer,
  created_at timestamptz default now() not null
);

alter table forges enable row level security;
create policy "Users can manage own forges" on forges for all using (auth.uid() = user_id);
create index idx_forges_user on forges(user_id);
create index idx_forges_status on forges(status);

-- ============================================
-- CREDIT LEDGER
-- ============================================
create table if not exists credit_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  amount integer not null,
  balance_after integer not null,
  transaction_type text not null check (transaction_type in ('grant', 'purchase', 'use', 'refund', 'bonus')),
  description text,
  forge_id uuid references forges(id) on delete set null,
  created_at timestamptz default now() not null
);

alter table credit_ledger enable row level security;
create policy "Users can read own ledger" on credit_ledger for select using (auth.uid() = user_id);
create index idx_ledger_user on credit_ledger(user_id);

-- ============================================
-- SUBSCRIPTIONS
-- ============================================
create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  stripe_subscription_id text unique,
  tier text not null check (tier in ('dip', 'binge', 'addiction')),
  status text default 'active' check (status in ('active', 'past_due', 'cancelled')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz default now() not null
);

alter table subscriptions enable row level security;
create policy "Users can read own subscriptions" on subscriptions for select using (auth.uid() = user_id);
create index idx_subscriptions_user on subscriptions(user_id);

-- ============================================
-- ORDERS (Print-on-Demand)
-- ============================================
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  forge_id uuid references forges(id) on delete set null,
  product_type text not null,
  status text default 'pending' check (status in ('pending', 'in_production', 'shipped', 'delivered', 'cancelled')),
  stripe_payment_id text,
  printful_order_id text,
  shipping_address jsonb not null default '{}',
  tracking_number text,
  tracking_url text,
  total_amount integer not null default 0,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table orders enable row level security;
create policy "Users can manage own orders" on orders for all using (auth.uid() = user_id);
create index idx_orders_user on orders(user_id);

-- ============================================
-- SHARE LINKS
-- ============================================
create table if not exists share_links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  token text unique not null,
  title text default 'My Gallery',
  forge_ids uuid[] not null default '{}',
  views integer default 0,
  expires_at timestamptz default (now() + interval '90 days'),
  created_at timestamptz default now() not null
);

alter table share_links enable row level security;
create policy "Users can manage own share links" on share_links for all using (auth.uid() = user_id);
create policy "Anyone can read share links by token" on share_links for select using (true);
create index idx_share_token on share_links(token);
