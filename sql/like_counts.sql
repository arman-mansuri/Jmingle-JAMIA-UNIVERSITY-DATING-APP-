-- like_counts() — total likes RECEIVED per profile.
--
-- Powers the "♥ N likes" pill on each profile card. RLS on `likes` scopes a
-- normal SELECT to the caller's OWN likes (liker_id = auth.uid()), so the
-- client cannot count the likes another profile received. This SECURITY DEFINER
-- function runs as the owner and returns only aggregate totals — never who
-- liked whom — so it does not weaken the "never reveal your likers" rule.
--
-- Run this in the Supabase SQL Editor (main / production project).

create or replace function public.like_counts()
returns table (profile_id uuid, likes bigint)
language sql
stable
security definer
set search_path = public
as $$
  select liked_profile_id as profile_id, count(*)::bigint as likes
  from public.likes
  group by liked_profile_id;
$$;

-- Reading counts is public (anonymous users included).
grant execute on function public.like_counts() to anon, authenticated;
