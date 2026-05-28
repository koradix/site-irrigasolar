# n8n — Régua de WhatsApp e CRM

> **Status atual:** WhatsApp em standby. Esses workflows ficam documentados pra quando
> a Irrigasolar definir o provedor de WhatsApp (Z-API, Evolution API, ou WhatsApp Cloud API).
>
> A LP já dispara `POST` para `N8N_WEBHOOK_URL` com `{ leadId, payload, kit }`
> sempre que um lead conclui o configurador. Basta plugar o webhook do Workflow 1 nessa URL
> pra começar.

---

## Visão geral

Três workflows que controlam toda a jornada pós-captura:

| Workflow | Disparo | O que faz |
|---|---|---|
| **1. Recebe lead da LP** | Webhook (URL pública chamada pela API) | Envia régua M1 → M2 → M4 com delays humanizados |
| **2. Follow-up proposta** | Webhook chamado quando o time marca tag "proposta enviada" no CRM | Régua M6 → M7 → M8 → M9 (reativação 60 dias) |
| **3. Recebe resposta do cliente** | Webhook do provedor WhatsApp (mensagem inbound) | Para todas as automações + notifica time |

---

## Credenciais a configurar no n8n

Antes de importar os workflows, criar as credenciais em **n8n → Credentials**:

| Nome da credencial | Tipo n8n | Campos |
|---|---|---|
| `Supabase Irrigasolar` | Supabase | `host` = `https://xxxxx.supabase.co` · `serviceRole` = service_role key |
| `Z-API Irrigasolar` | HTTP Header Auth | `Client-Token: <seu_token_seguranca>` (se for usar Z-API) |
| `Slack Irrigasolar` | Slack OAuth2 | Workspace + canal `#leads` |
| `Email SMTP` | SMTP (ou Resend HTTP) | usado em fallback caso WhatsApp falhe |

> **Nunca commite credenciais.** O n8n armazena credenciais no banco dele (cifradas).
> No código deste projeto, só guardamos a `N8N_WEBHOOK_URL` (pública).

---

## WORKFLOW 1 — "Recebe lead da LP"

### Fluxo

```
Webhook (POST)
   ↓
Set (padronizar payload + extrair campos)
   ↓
Wait 60s (delay humanizado pra parecer envio manual)
   ↓
HTTP Request → WhatsApp API → M1 (mensagem-mãe)
   ↓
Wait 15min
   ↓
HTTP Request → WhatsApp API → M2 (case real do perfil do lead)
   ↓
Wait 23h45min
   ↓
Supabase: SELECT leads WHERE id = leadId
   ↓
IF responded_at IS NULL
   ↓ true: HTTP Request → WhatsApp API → M4 (lembrete suave)
   ↓ false: STOP
```

### Configuração dos nós

**1. Webhook**
- Method: `POST`
- Path: `/webhook/lead-recebido` (n8n gera o URL completo)
- Response: `Last Node` (resposta vem do último nó, mas geralmente respondemos no início)
- Authentication: nenhuma (a URL é o segredo) — opcionalmente Header Auth

> Copie a Production URL e cole em `N8N_WEBHOOK_URL` no `.env.local` do site.

**2. Set — padroniza payload**
- Mode: `Manual Mapping`
- Campos:
  - `leadId` ← `{{ $json.leadId }}`
  - `nome` ← `{{ $json.payload.nome }}`
  - `primeiroNome` ← `{{ $json.payload.nome.split(" ")[0] }}`
  - `whatsapp` ← `{{ $json.payload.whatsapp.replace(/\D/g, "") }}` (apenas dígitos)
  - `phoneE164` ← `55{{ $json.payload.whatsapp.replace(/\D/g, "").replace(/^55/, "") }}`
  - `cidade` ← `{{ $json.payload.cidade || "sua propriedade" }}`
  - `aplicacao` ← `{{ $json.payload.aplicacao }}`
  - `kit` ← `{{ JSON.stringify($json.kit) }}`
  - `valor` ← `{{ "R$ " + ($json.kit.valorBase).toLocaleString("pt-BR") }}`
  - `qtdPlacas` ← `{{ $json.kit.modulos.qtd }}`
  - `wpModulo` ← `{{ $json.kit.modulos.wp_unitario }}`
  - `modeloInversor` ← `{{ $json.kit.inversor.modelo }}`
  - `vazao` ← `{{ $json.kit.vazao_estimada }}`
  - `kwp` ← `{{ $json.kit.kwp }}`

**3. Wait — 60 segundos**
- Resume: `After Time Interval`
- Amount: `60`, Unit: `Seconds`

**4. HTTP Request — Z-API send-text (M1)**
- Method: `POST`
- URL: `https://api.z-api.io/instances/{{ $env.ZAPI_INSTANCE }}/token/{{ $env.ZAPI_TOKEN }}/send-text`
- Authentication: `Z-API Irrigasolar` (header Client-Token)
- Body Content Type: `JSON`
- Body:
  ```json
  {
    "phone": "{{ $json.phoneE164 }}",
    "message": "Olá, {{ $json.primeiroNome }}. Aqui é da engenharia da Irrigasolar.\n\nMontei o kit que você configurou em {{ $json.cidade }}:\n\n🔧 SEU KIT IRRIGASOLAR\n• {{ $json.qtdPlacas }} módulos {{ $json.wpModulo }}Wp\n• Inversor WEG {{ $json.modeloInversor }}\n• Vazão estimada: {{ $json.vazao }} m³/h\n• Potência total: {{ $json.kwp }} kWp\n• ✓ IrrigaBox® de monitoramento (temperatura, umidade, segurança)\n• Garantia WEG 10 anos + 18 meses de serviço estendido\n\n💰 Investimento turn-key chave em mão: *{{ $json.valor }}*\nIncluso: equipamento + IrrigaBox + acabamento elétrico + instalação.\n\nQual a melhor hora pra gente conversar sobre cronograma e visita técnica?"
  }
  ```

**5. Wait — 15 minutos**
- Amount: `15`, Unit: `Minutes`

**6. HTTP Request — Z-API send-text (M2 case real)**
- Mesma URL/auth do nó 4
- Body: mensagem com case real (ajustar texto manualmente conforme perfil — pivô/poço/fazenda)

**7. Wait — 23h 45min**
- Amount: `1425`, Unit: `Minutes`

**8. Supabase — verifica resposta**
- Operation: `Get rows`
- Table: `leads`
- Filters: `id = {{ $('Set').item.json.leadId }}`
- Output: linha com `responded_at`

**9. IF — `responded_at` é nulo?**
- Condition: `{{ $json.responded_at }}` `Is Empty`
- Branch `true`: vai pro nó M4
- Branch `false`: vai pra `Stop and Error` (lead já respondeu, fim da régua)

**10. HTTP Request — Z-API send-text (M4 lembrete)**
- Mesma URL/auth
- Body: lembrete suave

---

### JSON exportável (importar em n8n)

> Cola em **n8n → Workflows → Import from File** ou no menu **⋮ → Import from URL/Clipboard**.

```json
{
  "name": "Recebe lead da LP",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "lead-recebido",
        "responseMode": "lastNode"
      },
      "id": "webhook-1",
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "position": [240, 300]
    },
    {
      "parameters": {
        "values": {
          "string": [
            { "name": "leadId", "value": "={{$json.leadId}}" },
            { "name": "primeiroNome", "value": "={{$json.payload.nome.split(\" \")[0]}}" },
            { "name": "phoneE164", "value": "=55{{$json.payload.whatsapp.replace(/\\D/g, \"\").replace(/^55/, \"\")}}" },
            { "name": "cidade", "value": "={{$json.payload.cidade || \"sua propriedade\"}}" },
            { "name": "modeloInversor", "value": "={{$json.kit.inversor.modelo}}" },
            { "name": "valor", "value": "=R$ {{Number($json.kit.valorBase).toLocaleString(\"pt-BR\")}}" }
          ],
          "number": [
            { "name": "qtdPlacas", "value": "={{$json.kit.modulos.qtd}}" },
            { "name": "wpModulo", "value": "={{$json.kit.modulos.wp_unitario}}" },
            { "name": "vazao", "value": "={{$json.kit.vazao_estimada}}" },
            { "name": "kwp", "value": "={{$json.kit.kwp}}" }
          ]
        }
      },
      "id": "set-1",
      "name": "Padronizar payload",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [460, 300]
    },
    {
      "parameters": { "amount": 60, "unit": "seconds" },
      "id": "wait-1",
      "name": "Wait 60s",
      "type": "n8n-nodes-base.wait",
      "typeVersion": 1.1,
      "position": [680, 300]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "=https://api.z-api.io/instances/{{$env.ZAPI_INSTANCE}}/token/{{$env.ZAPI_TOKEN}}/send-text",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"phone\": \"{{ $('Padronizar payload').item.json.phoneE164 }}\",\n  \"message\": \"Olá, {{ $('Padronizar payload').item.json.primeiroNome }}. Aqui é da engenharia da Irrigasolar.\\n\\nMontei o kit que você configurou em {{ $('Padronizar payload').item.json.cidade }}:\\n\\n🔧 SEU KIT IRRIGASOLAR\\n• {{ $('Padronizar payload').item.json.qtdPlacas }} módulos {{ $('Padronizar payload').item.json.wpModulo }}Wp\\n• Inversor WEG {{ $('Padronizar payload').item.json.modeloInversor }}\\n• Vazão estimada: {{ $('Padronizar payload').item.json.vazao }} m³/h\\n• Potência total: {{ $('Padronizar payload').item.json.kwp }} kWp\\n• ✓ IrrigaBox® de monitoramento (temperatura, umidade, segurança)\\n• Garantia WEG 10 anos + 18 meses de serviço estendido\\n\\n💰 Investimento turn-key chave em mão: *{{ $('Padronizar payload').item.json.valor }}*\\nIncluso: equipamento + IrrigaBox + acabamento elétrico + instalação.\\n\\nQual a melhor hora pra gente conversar sobre cronograma e visita técnica?\"\n}"
      },
      "id": "http-m1",
      "name": "Z-API M1",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [900, 300]
    },
    {
      "parameters": { "amount": 15, "unit": "minutes" },
      "id": "wait-2",
      "name": "Wait 15min",
      "type": "n8n-nodes-base.wait",
      "typeVersion": 1.1,
      "position": [1120, 300]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "=https://api.z-api.io/instances/{{$env.ZAPI_INSTANCE}}/token/{{$env.ZAPI_TOKEN}}/send-text",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"phone\": \"{{ $('Padronizar payload').item.json.phoneE164 }}\",\n  \"message\": \"AJUSTAR — texto da M2 (case real do perfil)\"\n}"
      },
      "id": "http-m2",
      "name": "Z-API M2",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [1340, 300]
    },
    {
      "parameters": { "amount": 1425, "unit": "minutes" },
      "id": "wait-3",
      "name": "Wait 23h45min",
      "type": "n8n-nodes-base.wait",
      "typeVersion": 1.1,
      "position": [1560, 300]
    },
    {
      "parameters": {
        "operation": "getAll",
        "tableId": "leads",
        "returnAll": false,
        "limit": 1,
        "filterType": "manual",
        "filters": {
          "conditions": [
            { "keyName": "id", "condition": "eq", "keyValue": "={{ $('Padronizar payload').item.json.leadId }}" }
          ]
        }
      },
      "id": "supabase-1",
      "name": "Supabase — checa responded_at",
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [1780, 300]
    },
    {
      "parameters": {
        "conditions": {
          "string": [
            { "value1": "={{ $json.responded_at }}", "operation": "isEmpty" }
          ]
        }
      },
      "id": "if-1",
      "name": "responded_at vazio?",
      "type": "n8n-nodes-base.if",
      "typeVersion": 1,
      "position": [2000, 300]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "=https://api.z-api.io/instances/{{$env.ZAPI_INSTANCE}}/token/{{$env.ZAPI_TOKEN}}/send-text",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"phone\": \"{{ $('Padronizar payload').item.json.phoneE164 }}\",\n  \"message\": \"AJUSTAR — texto da M4 (lembrete suave 24h depois)\"\n}"
      },
      "id": "http-m4",
      "name": "Z-API M4",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [2220, 220]
    }
  ],
  "connections": {
    "Webhook": { "main": [[{ "node": "Padronizar payload", "type": "main", "index": 0 }]] },
    "Padronizar payload": { "main": [[{ "node": "Wait 60s", "type": "main", "index": 0 }]] },
    "Wait 60s": { "main": [[{ "node": "Z-API M1", "type": "main", "index": 0 }]] },
    "Z-API M1": { "main": [[{ "node": "Wait 15min", "type": "main", "index": 0 }]] },
    "Wait 15min": { "main": [[{ "node": "Z-API M2", "type": "main", "index": 0 }]] },
    "Z-API M2": { "main": [[{ "node": "Wait 23h45min", "type": "main", "index": 0 }]] },
    "Wait 23h45min": { "main": [[{ "node": "Supabase — checa responded_at", "type": "main", "index": 0 }]] },
    "Supabase — checa responded_at": { "main": [[{ "node": "responded_at vazio?", "type": "main", "index": 0 }]] },
    "responded_at vazio?": { "main": [[{ "node": "Z-API M4", "type": "main", "index": 0 }]] }
  }
}
```

---

## WORKFLOW 2 — "Follow-up proposta"

Disparado quando o time marca tag `proposta-enviada` no CRM (ou via webhook manual).

### Fluxo

```
Webhook (POST { leadId })
   ↓
Wait 3 dias  → Z-API M6
   ↓
Wait 4 dias  → Z-API M7
   ↓
Wait 7 dias  → Z-API M8
   ↓
Wait 46 dias → Z-API M9 (reativação 60 dias total)
```

### Nós principais

| # | Nó | Configuração |
|---|---|---|
| 1 | Webhook | path `proposta-enviada`, recebe `{ leadId, primeiroNome, phoneE164 }` |
| 2 | Wait 3 dias | Amount: `3`, Unit: `Days` |
| 3 | HTTP Z-API M6 | Texto: "Oi {{ primeiroNome }}, conseguiu ver a proposta?" |
| 4 | Wait 4 dias | Amount: `4`, Unit: `Days` |
| 5 | HTTP Z-API M7 | Texto: novo ângulo (depoimento de case) |
| 6 | Wait 7 dias | Amount: `7`, Unit: `Days` |
| 7 | HTTP Z-API M8 | Texto: oferta com prazo |
| 8 | Wait 46 dias | Amount: `46`, Unit: `Days` |
| 9 | HTTP Z-API M9 | Reativação: "Lembra do orçamento? Tá na safra agora..." |

> **Importante:** em cada Wait, antes do envio, **idealmente checar via Supabase se o status mudou pra `fechado` ou `perdido`**. Use um IF como no Workflow 1 antes de disparar a mensagem. Mantém limpo: ninguém que fechou recebe "lembra do orçamento?".

---

## WORKFLOW 3 — "Recebe resposta do cliente"

Disparado pelo webhook de mensagem inbound do provedor WhatsApp (Z-API tem opção "On Message Received").

### Fluxo

```
Webhook (POST { phone, message, ... })
   ↓
Supabase: UPDATE leads SET responded_at = now() WHERE whatsapp LIKE %phone%
   ↓
PARAR workflows automáticos (Workflow 1 e 2)
   ↓
Notificar time via Slack
```

### Nós

**1. Webhook**
- Path: `whatsapp-inbound`
- Z-API: configurar em `https://api.z-api.io/instances/{INSTANCE}/token/{TOKEN}/webhooks` apontando pra esta URL com event `ReceivedCallback`

**2. Supabase — UPDATE**
- Operation: `Update`
- Table: `leads`
- Filters: `whatsapp ILIKE '%' || {{ $json.phone }} || '%'`
- Fields:
  - `responded_at` ← `{{ $now.toISO() }}`

**3. Parar workflows automáticos**
- Em n8n, isso requer um pequeno truque: as duas formas práticas
  - **A.** Usar um nó **Execute Workflow** para abortar — n8n não tem "stop execution by ID" nativo. Solução: cada workflow consulta `responded_at` no IF antes de enviar (jeito que já está no Workflow 1)
  - **B.** Set tag `status = contatado` no Supabase e os outros workflows checam status antes de prosseguir
- **Recomendado:** abordagem B (idempotente, sem race conditions)

**4. Slack — notifica time**
- Operation: `Post Message`
- Channel: `#leads`
- Text: `📩 *{{ $json.senderName || $json.phone }}* respondeu: \n> {{ $json.message }}\n\nLead: <https://supabase.com/dashboard/project/xxx/editor/lead?id={{ $json.leadId }}|abrir no Supabase>`

---

## Variáveis de ambiente no n8n

Em **n8n → Settings → Environment Variables**:

```
ZAPI_INSTANCE=3D...
ZAPI_TOKEN=A1B2C3...
ZAPI_CLIENT_TOKEN=Fxxxxxx
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_KEY=eyJhbG...
SLACK_LEADS_CHANNEL=#leads
```

> Use `service_role` no n8n, NÃO `anon_key` — service role bypassa RLS pra fazer UPDATE/SELECT.
> NUNCA expor `service_role` no front. Só na infra dos workflows.

---

## Checklist de go-live

- [ ] Definir provedor WhatsApp (Z-API / Evolution / Cloud API)
- [ ] Conectar instância + verificar envio manual
- [ ] Criar credenciais no n8n (Supabase, WhatsApp, Slack)
- [ ] Importar Workflow 1 e ativá-lo
- [ ] Copiar URL do Webhook para `N8N_WEBHOOK_URL` no `.env.local` e Vercel
- [ ] Testar fluxo end-to-end com lead próprio (75999590288)
- [ ] Importar Workflow 3 (inbound) e configurar callback na Z-API
- [ ] Importar Workflow 2 só depois do CRM estar definindo a tag `proposta-enviada`
- [ ] Validar régua com primeiros 5 leads reais antes de escalar
