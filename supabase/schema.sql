-- Bella Bot / AdaptativeCBot — Supabase Schema
-- À exécuter dans : Supabase Dashboard → SQL Editor → New query

-- ─────────────────────────────────────────
-- 1. PROFILS UTILISATEURS
-- ─────────────────────────────────────────
create table if not exists public.user_profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  name       text not null,
  role       text not null default 'student',
  created_at timestamptz not null default now()
);

-- Sécurité : chaque utilisateur ne voit que son propre profil
alter table public.user_profiles enable row level security;

create policy "own profile" on public.user_profiles
  for all using (auth.uid() = id);

-- Trigger : crée automatiquement un user_profile à l'inscription
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.user_profiles (id, name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'student')
  );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─────────────────────────────────────────
-- 2. PROFIL D'APPRENTISSAGE (Felder-Silverman)
-- ─────────────────────────────────────────
create table if not exists public.learner_profiles (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  profile_id   text not null,
  selected_at  timestamptz not null default now(),
  unique (user_id)
);

alter table public.learner_profiles enable row level security;

create policy "own learner profile" on public.learner_profiles
  for all using (auth.uid() = user_id);

-- ─────────────────────────────────────────
-- 3. PROGRESSION DE LEÇON
-- ─────────────────────────────────────────
create table if not exists public.lesson_progress (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users(id) on delete cascade,
  lesson_id        text not null,
  current_step     text not null,
  practiced_steps  jsonb not null default '[]',
  adaptation       jsonb not null default '{}',
  completed        boolean not null default false,
  updated_at       timestamptz not null default now(),
  unique (user_id, lesson_id)
);

alter table public.lesson_progress enable row level security;

create policy "own lesson progress" on public.lesson_progress
  for all using (auth.uid() = user_id);
