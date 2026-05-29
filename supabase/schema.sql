-- Cole este script no SQL Editor do Supabase para criar as tabelas.
-- Idempotente: roda em ambientes novos sem quebrar.

create extension if not exists "uuid-ossp";

-- =========================================================
-- LEADS — capturados pelo configurador da LP
-- =========================================================
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

alter table leads enable row level security;

drop policy if exists "anon can insert leads" on leads;
create policy "anon can insert leads"
  on leads for insert
  to anon
  with check (true);

-- =========================================================
-- CONVERSATIONS — memória do agente Claude por chatId WhatsApp
-- =========================================================
create table if not exists conversations (
  id uuid primary key default uuid_generate_v4(),
  chat_id text not null,
  role text not null check (role in ('user', 'assistant')),
  content jsonb not null,
  created_at timestamptz default now(),
  expires_at timestamptz default (now() + interval '24 hours')
);

create index if not exists conversations_chat_id_created_at_idx
  on conversations(chat_id, created_at desc);
create index if not exists conversations_expires_at_idx
  on conversations(expires_at);

alter table conversations enable row level security;

-- Sem policy pra anon: conversas só são manipuladas via service_role
-- pelo webhook do WhatsApp (que roda server-side).

-- =========================================================
-- PROPOSTAS — registro de cada PDF gerado e enviado
-- =========================================================
create table if not exists propostas (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now(),
  lead_id uuid references leads(id) on delete set null,
  chat_id text,
  numero_proposta text unique,
  dados jsonb not null,
  valor numeric not null,
  pdf_url text,
  enviada_em timestamptz,
  status text default 'gerada'
);

create index if not exists propostas_created_at_idx on propostas(created_at desc);
create index if not exists propostas_lead_id_idx on propostas(lead_id);
create index if not exists propostas_chat_id_idx on propostas(chat_id);

alter table propostas enable row level security;

-- =========================================================
-- Função utilitária: limpa conversas expiradas
-- Rode via cron do Supabase (pg_cron) ou chame manualmente.
-- =========================================================
create or replace function cleanup_expired_conversations()
returns integer
language plpgsql
as $$
declare
  removed integer;
begin
  delete from conversations where expires_at < now();
  get diagnostics removed = row_count;
  return removed;
end;
$$;
