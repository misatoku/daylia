delete from public.day_entries_public;

alter table public.day_entries_public
  add column user_id uuid not null
  default auth.uid()
  references auth.users (id) on delete cascade;

alter table public.day_entries_public
  drop constraint day_entries_public_pkey;

alter table public.day_entries_public
  add primary key (user_id, date);