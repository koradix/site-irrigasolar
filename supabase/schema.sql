-- Cole este script no SQL Editor do Supabase para criar a tabela `leads`.
-- Idempotente: roda em ambientes novos sem quebrar.

create extension if not exists "uuid-ossp";

create table if not exists leads (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now(),
  nome text not null,
  sobrenome text not null,
  whatsapp text not null,
  cep text,
  cidade text,
  uf text,
  aplicacao text not null,
  dimensao_dados jsonb,
  urgencia text,
  kit_calculado jsonb,
  valor_calculado numeric,
  status text default 'novo',
  enviado_whatsapp boolean default false,
  enviado_whatsapp_at timestamptz,
  responded_at timestamptz,
  tags text[]
);

create index if not exists leads_created_at_idx on leads(created_at desc);
create index if not exists leads_status_idx on leads(status);
create index if not exists leads_whatsapp_idx on leads(whatsapp);

-- RLS: a API server-side usa anon key; libere INSERT para anon
-- (leitura/edição devem ficar restritas — gerencie pelo painel).
alter table leads enable row level security;

drop policy if exists "anon can insert leads" on leads;
create policy "anon can insert leads"
  on leads for insert
  to anon
  with check (true);
