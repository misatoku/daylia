-- バケットを非公開にする
update storage.buckets set public = false where id = 'day-photos';

-- 古い「誰でもOK」のルールを削除
drop policy if exists "Public can read photos" on storage.objects;
drop policy if exists "Public can upload photos" on storage.objects;
drop policy if exists "Public can delete photos" on storage.objects;

-- 新しい「自分のフォルダだけOK」のルールを作る
create policy "Users can read own photos"
on storage.objects for select to authenticated
using (
  bucket_id = 'day-photos'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Users can upload own photos"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'day-photos'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Users can delete own photos"
on storage.objects for delete to authenticated
using (
  bucket_id = 'day-photos'
  and (storage.foldername(name))[1] = auth.uid()::text
);