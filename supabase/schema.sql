-- 開発用: 認証なしで読み書きできるテーブルです。
create table if not exists public.day_entries_public (
    date date primary key,
    photo_path text not null,
    mood text check (mood in ('petal1', 'petal2', 'petal3', 'petal4', 'petal5')),
    diary text not null default '',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

alter table public.day_entries_public enable row level security;

-- RLSポリシーとは別に、APIロールへテーブル操作そのものを許可します。
grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on table public.day_entries_public to anon, authenticated;

drop policy if exists "Public can read entries" on public.day_entries_public;
drop policy if exists "Public can insert entries" on public.day_entries_public;
drop policy if exists "Public can update entries" on public.day_entries_public;

create policy "Public can read entries"
on public.day_entries_public for select to anon, authenticated
using (true);

create policy "Public can insert entries"
on public.day_entries_public for insert to anon, authenticated
with check (true);

create policy "Public can update entries"
on public.day_entries_public for update to anon, authenticated
using (true) with check (true);

insert into storage.buckets (id, name, public)
values ('day-photos', 'day-photos', true)
on conflict (id) do update set public = true;

drop policy if exists "Public can read photos" on storage.objects;
drop policy if exists "Public can upload photos" on storage.objects;
drop policy if exists "Public can delete photos" on storage.objects;

create policy "Public can read photos"
on storage.objects for select to anon, authenticated
using (bucket_id = 'day-photos');

create policy "Public can upload photos"
on storage.objects for insert to anon, authenticated
with check (bucket_id = 'day-photos');

create policy "Public can delete photos"
on storage.objects for delete to anon, authenticated
using (bucket_id = 'day-photos');
