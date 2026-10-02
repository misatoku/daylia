-- 古い「誰でもOK」のルールを削除
drop policy if exists "Public can read entries" on public.day_entries_public;
drop policy if exists "Public can insert entries" on public.day_entries_public;
drop policy if exists "Public can update entries" on public.day_entries_public;

-- ログインしていない人（anon）からテーブルを触る権限を取り上げる
revoke all on table public.day_entries_public from anon;

-- 新しい「本人だけOK」のルールを作る
create policy "Users can read own entries"
on public.day_entries_public for select to authenticated
using (auth.uid() = user_id);

create policy "Users can insert own entries"
on public.day_entries_public for insert to authenticated
with check (auth.uid() = user_id);

create policy "Users can update own entries"
on public.day_entries_public for update to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);