create table if not exists public.baby_guesses (
  id bigint generated always as identity (start with 1 increment by 1) primary key,
  created_at timestamptz not null default now(),
  birth_date date not null,
  first_name text not null check (char_length(trim(first_name)) > 0),
  weight_kg numeric(5, 2) not null check (weight_kg > 0),
  length_cm numeric(5, 1) not null check (length_cm > 0)
);

alter table public.baby_guesses enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'baby_guesses'
      and policyname = 'Anyone can submit baby guesses'
  ) then
    create policy "Anyone can submit baby guesses"
      on public.baby_guesses
      for insert
      to anon, authenticated
      with check (true);
  end if;
end
$$;

grant insert on table public.baby_guesses to anon, authenticated;
grant usage on sequence public.baby_guesses_id_seq to anon, authenticated;
