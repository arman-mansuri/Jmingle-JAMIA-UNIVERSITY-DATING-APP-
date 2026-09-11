'use strict';

// ==========================================
// MINGLE IDENTITY — login-free anonymous users, likes and matches
//
// One shared Supabase client for the whole site, plus the anonymous identity
// built on top of Supabase Anonymous Auth. There is no signup and no login UI:
// the first visit silently mints an anonymous auth user, and every later visit
// reuses it from the stored session.
//
// The user id is never taken from anything the page can edit. It comes from a
// Supabase-signed JWT, and RLS on `likes` / `matches` re-checks it server side,
// so a tampered client cannot act as somebody else.
// ==========================================

var Mingle = (function() {

  // Same project as profile-hotspots.js / PROFILE.HTML.
  var SUPABASE_URL = 'https://tpweaiounyjzgiasthgv.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwd2VhaW91bnlqemdpYXN0aGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyNTg4NzUsImV4cCI6MjA5ODgzNDg3NX0.5fPFgXjq3C-OYuqv0wG4gpRWnNDstOKMgpXVRTUvl7E';

  if (!window.supabase || !window.supabase.createClient) {
    throw new Error('mingle-identity.js: load @supabase/supabase-js before this file.');
  }

  // persistSession + autoRefreshToken are what make the identity survive a
  // reload: supabase-js keeps the refresh token under `sb-<ref>-auth-token`
  // and trades it for a fresh access token on the next visit.
  var client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false
    }
  });

  var uid = null;
  var readyPromise = null;

  // Reuse this browser's anonymous user if it has one, otherwise create one.
  async function resolveIdentity() {
    var sessionResult = await client.auth.getSession();
    var session = sessionResult.data ? sessionResult.data.session : null;

    if (!session) {
      var signIn = await client.auth.signInAnonymously();
      if (signIn.error) throw signIn.error;
      session = signIn.data ? signIn.data.session : null;
    }

    if (!session || !session.user) {
      throw new Error('Could not establish an anonymous identity.');
    }

    uid = session.user.id;

    // The visitor's record in the database. `id` also defaults to auth.uid()
    // server side, so this cannot register anybody but the caller.
    var upsert = await client
      .from('app_user')
      .upsert({ id: uid, last_seen_at: new Date().toISOString() }, { onConflict: 'id' });

    // Non-fatal: a failure here must not stop the tour from rendering.
    if (upsert.error) {
      console.warn('Could not record anonymous user:', upsert.error.message);
    }

    return uid;
  }

  // Idempotent — every caller awaits the same identity, and only one is created.
  function ready() {
    if (!readyPromise) {
      readyPromise = resolveIdentity().catch(function(err) {
        readyPromise = null; // let a later call retry after a network blip
        throw err;
      });
    }
    return readyPromise;
  }

  // Matches are stored with the pair ordered so there is only ever one row for
  // two users. Lowercase hex uuids compare the same in JS as they do in
  // Postgres, so this agrees with the `user_a < user_b` constraint.
  function orderedPair(a, b) {
    return a < b ? { user_a: a, user_b: b } : { user_a: b, user_b: a };
  }

  async function isMatchedWith(otherId) {
    var pair = orderedPair(uid, otherId);
    var result = await client
      .from('matches')
      .select('id')
      .eq('user_a', pair.user_a)
      .eq('user_b', pair.user_b)
      .maybeSingle();

    if (result.error) {
      console.warn('Could not read match state:', result.error.message);
      return false;
    }
    return !!result.data;
  }

  // Because a profile's primary key IS its owner's user id, `profileId` is also
  // the liked user's id — no lookup needed to find who was liked.
  async function likeProfile(profileId) {
    var me = await ready();

    if (!profileId || profileId === me) {
      return { liked: false, alreadyLiked: false, matched: false };
    }

    // liker_id is sent for clarity only; RLS rejects it unless it equals the
    // JWT's user id, and the `likes_once` unique constraint blocks duplicates.
    var insert = await client
      .from('likes')
      .insert({ liker_id: me, liked_profile_id: profileId });

    var alreadyLiked = false;
    if (insert.error) {
      if (insert.error.code === '23505') {
        alreadyLiked = true; // liked before; treat as success, not an error
      } else {
        throw insert.error;
      }
    }

    // The match is created by a database trigger the moment the second like
    // lands, so by now it either exists or this was the first of the pair.
    return {
      liked: true,
      alreadyLiked: alreadyLiked,
      matched: await isMatchedWith(profileId)
    };
  }

  // RLS scopes this to the caller's own likes, so it can never be used to see
  // who liked you.
  async function myLikes() {
    await ready();
    var result = await client.from('likes').select('liked_profile_id');

    if (result.error) {
      console.warn('Could not load likes:', result.error.message);
      return [];
    }
    return (result.data || []).map(function(row) { return row.liked_profile_id; });
  }

  async function myMatches() {
    await ready();
    var result = await client.rpc('my_matches');

    if (result.error) {
      console.warn('Could not load matches:', result.error.message);
      return [];
    }
    return result.data || [];
  }

  return {
    client: client,
    URL: SUPABASE_URL,
    ANON_KEY: SUPABASE_ANON_KEY,
    ready: ready,
    userId: function() { return uid; },
    likeProfile: likeProfile,
    myLikes: myLikes,
    myMatches: myMatches
  };
})();
