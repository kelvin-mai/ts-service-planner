create table posts (
  id varchar(14) default nanoid() primary key,
  title text not null,
  description text,
  category text,
  content text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone default now(),
  author uuid references profiles on delete cascade not null
);

create trigger handle_updated_at before update on posts
  for each row execute procedure moddatetime (updated_at);

alter table posts enable row level security;

create policy "Everyone can see posts" on posts
  for select to authenticated, anon using (true);

create policy "Only logged in users can create posts" on posts
  for insert to authenticated with check (true);

create policy "Only the author can edit their own posts" on posts
  for update to authenticated using (auth.uid() = author);

create policy "Only the author can delete their own posts" on posts
  for delete to authenticated using (auth.uid() = author);

insert into storage.buckets (id, name)
  values ('posts', 'posts');

create policy "Posts images are publicly accessible." on storage.objects
  for select using (bucket_id = 'posts');

create policy "Only logged in users can upload an avatar." on storage.objects
  for insert to authenticated with check (bucket_id = 'posts');