export const getDate = () => {
  return new Date().toLocaleString('pt-BR', { dateStyle: 'long' });
};

export const getFullEnderecamento = (
  serventia: string,
  tribunal: string,
  instancia: string,
  juiz: string
) => {
  const titulo = getTitulo(instancia, serventia);
  const _juiz = getJuiz(juiz);
  const enderecamento = `EXCELENTÍSSIMO SENHOR DOUTOR ${titulo}${_juiz} DA ${serventia} DO ${tribunal}`;
  return enderecamento.toUpperCase();
};

export const getTitulo = (instancia: string, serventia: string) => {
  if (instancia === '1') {
    return 'JUIZ';
  } else if (instancia === '2') {
    return 'DESEMBARGADOR RELATOR';
  } else if (instancia === '3') {
    const serv = serventia.trim().toLowerCase();
    const presidencia =
      serv.includes('presidência') || serv.includes('presidencia');
    return presidencia ? 'MINISTRO PRESIDENTE' : 'MINISTRO RELATOR';
  } else {
    return '';
  }
};

export const getJuiz = (juiz: string) => {
  juiz = juiz.trim();
  if (juiz.length > 0) {
    return ` ${juiz}`;
  }
  return juiz;
};
