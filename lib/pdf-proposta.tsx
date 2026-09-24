import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
} from '@react-pdf/renderer';
import {
  preparar,
  brl,
  formatDate,
  type PropostaCalculada,
  type PropostaDados,
} from './pdf-proposta-engine';

// Re-exporta tipos e helpers de engine pra manter o módulo como ponto de entrada.
export {
  preparar,
  proximoNumeroProposta,
  brl,
  formatDate,
} from './pdf-proposta-engine';
export type {
  PropostaItem,
  PropostaDados,
  PropostaCalculada,
} from './pdf-proposta-engine';

const COR = {
  inkDeep: '#0F1A12',
  ink: '#1A2A1F',
  inkSoft: '#4A5A4A',
  ocher: '#C99B3F',
  ocherDark: '#8A6B22',
  terra: '#B8593E',
  paper: '#FBF7EC',
  cream: '#F8F2E0',
  rule: '#B8A878',
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: COR.paper,
    color: COR.ink,
    fontFamily: 'Helvetica',
    fontSize: 10,
    padding: 40,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 2,
    borderBottomColor: COR.ocher,
    paddingBottom: 16,
    marginBottom: 24,
  },
  brandWrap: { flexDirection: 'column' },
  brand: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: COR.inkDeep,
    letterSpacing: -0.4,
  },
  tagline: { fontSize: 9, color: COR.inkSoft, marginTop: 2 },
  metaWrap: { alignItems: 'flex-end' },
  metaLabel: {
    fontFamily: 'Courier',
    fontSize: 8,
    color: COR.ocherDark,
    letterSpacing: 1,
  },
  metaValue: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 12,
    color: COR.inkDeep,
    marginBottom: 4,
  },
  section: { marginBottom: 18 },
  sectionTitle: {
    fontFamily: 'Courier-Bold',
    fontSize: 9,
    color: COR.ocherDark,
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  clienteCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COR.rule,
    borderRadius: 2,
    padding: 12,
  },
  clienteRow: { flexDirection: 'row', marginBottom: 3 },
  clienteLabel: {
    fontFamily: 'Courier',
    fontSize: 8,
    color: COR.inkSoft,
    letterSpacing: 1,
    width: 90,
    paddingTop: 1,
  },
  clienteValue: { fontSize: 11, color: COR.inkDeep, flex: 1 },
  tableHead: {
    flexDirection: 'row',
    backgroundColor: COR.inkDeep,
    color: COR.cream,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  th: {
    fontFamily: 'Courier-Bold',
    fontSize: 8,
    color: COR.cream,
    letterSpacing: 1,
  },
  tr: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: COR.rule,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
  },
  td: { fontSize: 10, color: COR.ink },
  colDescricao: { width: '54%', paddingRight: 6 },
  colQtd: { width: '12%', textAlign: 'right' },
  colUnit: { width: '17%', textAlign: 'right' },
  colSubtotal: { width: '17%', textAlign: 'right', fontFamily: 'Helvetica-Bold' },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: COR.ocher,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 6,
  },
  totalLabel: {
    fontFamily: 'Courier-Bold',
    fontSize: 10,
    color: COR.inkDeep,
    letterSpacing: 1,
    marginRight: 16,
    paddingTop: 4,
  },
  totalValor: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 18,
    color: COR.inkDeep,
  },
  irriBox: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 3,
    borderLeftColor: COR.ocher,
    padding: 10,
    marginTop: 12,
  },
  irriBoxText: {
    fontSize: 9,
    color: COR.ink,
    lineHeight: 1.4,
    flex: 1,
  },
  condicoes: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: COR.rule,
    padding: 12,
  },
  condicaoItem: { fontSize: 9, color: COR.ink, marginBottom: 3, lineHeight: 1.4 },
  observacoes: {
    fontSize: 9,
    color: COR.inkSoft,
    fontStyle: 'italic',
    lineHeight: 1.4,
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 40,
    right: 40,
    borderTopWidth: 0.5,
    borderTopColor: COR.rule,
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontFamily: 'Courier',
    fontSize: 7,
    color: COR.inkSoft,
    letterSpacing: 0.5,
  },
});

function DocumentProposta({ dados }: { dados: PropostaCalculada }) {
  const empresa = process.env.EMPRESA_NOME ?? 'Irrigasolar';
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.brandWrap}>
            <Text style={styles.brand}>{empresa.toUpperCase()}</Text>
            <Text style={styles.tagline}>Engenharia solar WEG para o agronegócio</Text>
          </View>
          <View style={styles.metaWrap}>
            <Text style={styles.metaLabel}>{'// PROPOSTA'}</Text>
            <Text style={styles.metaValue}>{dados.numero}</Text>
            <Text style={styles.metaLabel}>EMITIDA EM</Text>
            <Text style={styles.metaValue}>{formatDate(dados.data)}</Text>
            <Text style={styles.metaLabel}>VALIDADE</Text>
            <Text style={styles.metaValue}>{dados.validade_dias} dias</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{'// CLIENTE'}</Text>
          <View style={styles.clienteCard}>
            <View style={styles.clienteRow}>
              <Text style={styles.clienteLabel}>NOME</Text>
              <Text style={styles.clienteValue}>{dados.cliente.nome}</Text>
            </View>
            {dados.cliente.empresa && (
              <View style={styles.clienteRow}>
                <Text style={styles.clienteLabel}>EMPRESA</Text>
                <Text style={styles.clienteValue}>{dados.cliente.empresa}</Text>
              </View>
            )}
            {dados.cliente.cidade_uf && (
              <View style={styles.clienteRow}>
                <Text style={styles.clienteLabel}>LOCAL</Text>
                <Text style={styles.clienteValue}>{dados.cliente.cidade_uf}</Text>
              </View>
            )}
            {dados.cliente.whatsapp && (
              <View style={styles.clienteRow}>
                <Text style={styles.clienteLabel}>WHATSAPP</Text>
                <Text style={styles.clienteValue}>{dados.cliente.whatsapp}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{'// ITENS DA PROPOSTA'}</Text>
          <View style={styles.tableHead}>
            <Text style={[styles.th, styles.colDescricao]}>DESCRIÇÃO</Text>
            <Text style={[styles.th, styles.colQtd]}>QTD</Text>
            <Text style={[styles.th, styles.colUnit]}>UNIT.</Text>
            <Text style={[styles.th, styles.colSubtotal]}>SUBTOTAL</Text>
          </View>
          {dados.itens.map((item, i) => {
            const sub = item.quantidade * item.valor_unitario;
            return (
              <View key={i} style={styles.tr}>
                <Text style={[styles.td, styles.colDescricao]}>{item.descricao}</Text>
                <Text style={[styles.td, styles.colQtd]}>{item.quantidade}</Text>
                <Text style={[styles.td, styles.colUnit]}>{brl(item.valor_unitario)}</Text>
                <Text style={[styles.td, styles.colSubtotal]}>{brl(sub)}</Text>
              </View>
            );
          })}

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>INVESTIMENTO TURN-KEY</Text>
            <Text style={styles.totalValor}>{brl(dados.total)}</Text>
          </View>

          <View style={styles.irriBox}>
            <Text style={styles.irriBoxText}>
              <Text style={{ fontFamily: 'Helvetica-Bold' }}>
                ✓ IrrigaBox® de monitoramento inclusa.
              </Text>{' '}
              Controle de temperatura, umidade e segurança operacional.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{'// CONDIÇÕES'}</Text>
          <View style={styles.condicoes}>
            <Text style={styles.condicaoItem}>
              • Inclusos: equipamento, IrrigaBox, acabamento elétrico, instalação e
              comissionamento
            </Text>
            <Text style={styles.condicaoItem}>
              • Garantia e forma de pagamento: confirmadas pela engenharia no fechamento, conforme
              o equipamento especificado
            </Text>
            <Text style={styles.condicaoItem}>
              • Prazo de execução: confirmado pela engenharia após visita técnica
            </Text>
            <Text style={styles.condicaoItem}>
              • Proposta válida por {dados.validade_dias} dias a partir da emissão
            </Text>
          </View>
        </View>

        {dados.observacoes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{'// OBSERVAÇÕES'}</Text>
            <Text style={styles.observacoes}>{dados.observacoes}</Text>
          </View>
        )}

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>{empresa.toUpperCase()} · ENGENHARIA CREA</Text>
          <Text style={styles.footerText}>{dados.numero}</Text>
        </View>
      </Page>
    </Document>
  );
}

/**
 * Gera o PDF da proposta como Buffer (ideal pra enviar via WAHA sendFile).
 */
export async function gerarPropostaPDF(dados: PropostaDados): Promise<{
  buffer: Buffer;
  filename: string;
  calculada: PropostaCalculada;
}> {
  const calculada = preparar(dados);
  const buffer = await renderToBuffer(<DocumentProposta dados={calculada} />);
  const filename = `Proposta-${dados.numero}.pdf`;
  return { buffer, filename, calculada };
}
