create table if not exists public.launch_projects (
  id text primary key,
  status text not null default 'queued',
  progress integer not null default 0,
  input jsonb not null default '{}'::jsonb,
  blueprint jsonb not null default '{}'::jsonb,
  stages jsonb not null default '[]'::jsonb,
  export_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.launch_jobs (
  id text primary key,
  project_id text not null,
  status text not null default 'queued',
  current_stage text not null default 'input',
  error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists launch_jobs_status_idx on public.launch_jobs(status);
create index if not exists launch_jobs_project_idx on public.launch_jobs(project_id);
