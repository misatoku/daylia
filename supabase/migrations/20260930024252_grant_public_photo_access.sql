grant usage on schema public to anon, authenticated;

grant select, insert, update, delete
on table public.day_entries_public
to anon, authenticated;