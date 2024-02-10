create table comments (
  id varchar(14) default nanoid() primary key,
  content text,
  created_at timestamp with time zone not null default now(),
  post_id varchar(14) references posts on delete cascade not null,
  author uuid references profiles on delete cascade not null
);

alter table posts enable row level security;

create policy "Everyone can see comments" on comments
  for select to authenticated, anon using (true);

create policy "Only logged in users can create comments" on comments
  for insert to authenticated with check (true);

create policy "The comment author or post author can delete their own comments" on comments
  for delete to authenticated using 
  (auth.uid() = author or
   auth.uid() in (select p.author from posts p
                  where post_id = p.id)
  );