-- my_matches() — return the profiles this user has matched with.
--
-- Bug it fixes: a match is stored as ONE row with the pair ordered so
-- user_a < user_b (see orderedPair() in app-files/mingle-identity.js). The old
-- version joined in a single direction (returning user_b where user_a =
-- auth.uid()), so only the smaller-uuid user ever saw the match and the other
-- user got 0 distinct matches.
--
-- This version returns the *other* member of the pair no matter which column
-- the caller sits in, so both users see the match.
--
-- Run this in the Supabase SQL Editor (main / production project).

drop function if exists public.my_matches();

create function public.my_matches()
returns setof public.profile
language sql
stable
security definer
set search_path = public
as $$
  select p.*
  from public.matches m
  join public.profile p
    on p.id = case
                when m.user_a = auth.uid() then m.user_b
                else m.user_a
              end
  where auth.uid() in (m.user_a, m.user_b);
$$;

-- Supabase anonymous users carry the `authenticated` role; grant both to be safe.
grant execute on function public.my_matches() to anon, authenticated;
