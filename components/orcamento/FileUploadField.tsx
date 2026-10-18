'use client';

import { useId, useState } from 'react';
import { cn } from '@/lib/cn';
import type { Anexo } from '@/lib/orcamento-schema';
import type { UploadResponse } from '@/app/api/orcamento/upload/route';

interface FileUploadFieldProps {
  label: string;
  hint?: string;
  pastaId: string;
  value: Anexo[];
  onChange: (anexos: Anexo[]) => void;
  max?: number;
  single?: boolean;
  error?: string;
}

const TAMANHO_MAXIMO_BYTES = 10 * 1024 * 1024;
const ACEITA = 'image/jpeg,image/png,image/heic,image/heif,application/pdf';

export function FileUploadField({
  label,
  hint,
  pastaId,
  value,
  onChange,
  max = 6,
  single = false,
  error,
}: FileUploadFieldProps) {
  const fieldId = useId();
  const [enviando, setEnviando] = useState(false);
  const [erroLocal, setErroLocal] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setErroLocal(null);

    const restante = single ? 1 : Math.max(0, max - value.length);
    const selecionados = Array.from(files).slice(0, restante || files.length);
    if (selecionados.length === 0) {
      setErroLocal(`Máximo de ${max} arquivo(s)`);
      return;
    }

    setEnviando(true);
    const novos: Anexo[] = [];
    for (const file of selecionados) {
      if (file.size > TAMANHO_MAXIMO_BYTES) {
        setErroLocal(`"${file.name}" acima de 10 MB — não enviado`);
        continue;
      }
      const form = new FormData();
      form.append('file', file);
      form.append('pastaId', pastaId);
      try {
        const res = await fetch('/api/orcamento/upload', { method: 'POST', body: form });
        const json = (await res.json()) as UploadResponse;
        if (json.success && json.anexo) {
          novos.push(json.anexo);
        } else {
          setErroLocal(json.error ?? `Falha ao enviar "${file.name}"`);
        }
      } catch {
        setErroLocal(`Falha ao enviar "${file.name}" — verifique sua conexão`);
      }
    }
    setEnviando(false);
    onChange(single ? novos.slice(0, 1) : [...value, ...novos]);
  }

  function remover(path: string) {
    onChange(value.filter((a) => a.path !== path));
  }

  return (
    <div className="space-y-1.5">
      <label htmlFor={fieldId} className="block text-sm font-semibold text-forest">
        {label}
      </label>
      {hint && <p className="text-xs text-graphite/60">{hint}</p>}

      <label
        htmlFor={fieldId}
        className={cn(
          'flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-sm border border-dashed border-rule bg-sand/40 px-4 py-3 text-sm font-semibold text-forest hover:border-forest',
          enviando && 'pointer-events-none opacity-60',
        )}
      >
        {enviando ? 'Enviando...' : value.length > 0 ? 'Adicionar mais um arquivo' : 'Tirar foto ou escolher arquivo'}
      </label>
      <input
        id={fieldId}
        type="file"
        accept={ACEITA}
        capture="environment"
        multiple={!single}
        className="sr-only"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {value.length > 0 && (
        <ul className="space-y-1.5">
          {value.map((a) => (
            <li
              key={a.path}
              className="flex items-center justify-between gap-3 rounded-sm border border-rule bg-paper px-3 py-2 text-sm"
            >
              <span className="truncate text-graphite/80">{a.nome}</span>
              <button
                type="button"
                onClick={() => remover(a.path)}
                className="shrink-0 text-xs font-semibold text-[#b3261e] hover:underline"
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}

      {(erroLocal || error) && (
        <p role="alert" className="text-xs font-medium text-[#b3261e]">
          {erroLocal || error}
        </p>
      )}
    </div>
  );
}
