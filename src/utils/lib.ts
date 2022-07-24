import gendersData from './genders.json';

interface GenderData {
  [key: string]: GenderOpt;
}

type GenderOpt = 'M' | 'F';

export const getDate = () => {
  return new Date().toLocaleString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
};

export const getFullEnderecamento = (
  serventia: string,
  tribunal: string,
  instancia: string,
  juiz: string
) => {
  const gender = getGender(juiz);
  const vocativo = getVocativo(gender);
  const titulo = getTitulo(gender, instancia, serventia);
  const _juiz = getJuiz(juiz);
  const enderecamento = `${vocativo} ${titulo}${_juiz} DA ${serventia} DO ${tribunal}`;
  return enderecamento.toUpperCase();
};

export const getVocativo = (gender: GenderOpt): string => {
  return gender === 'M' ? 'EXCELENTÍSSIMO SENHOR DOUTOR' : 'EXCELENTÍSSIMA SENHORA DOUTORA'
};

export const getTitulo = (
  gender: GenderOpt,
  instancia: string,
  serventia: string
) => {
  if (instancia === '1') {
    return gender === 'M' ? 'JUIZ' : 'JUÍZA';
  } else if (instancia === '2') {
    return gender === 'M' ? 'DESEMBARGADOR RELATOR' : 'DESEMBARGADORA RELATORA';
  } else if (instancia === '3') {
    const serv = normalizeStr(serventia).toLowerCase();
    const presidencia = serv.includes('presidencia');
    if (presidencia) {
      return gender === 'M' ? 'MINISTRO PRESIDENTE' : 'MINISTRA PRESIDENTE';
    }
    return gender === 'M' ? 'MINISTRO RELATOR' : 'MINISTRA RELATORA';
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

export const getGender = (name: string): GenderOpt => {
  const data = gendersData as GenderData;
  name = name.split(' ')[0] || '';
  name = normalizeStr(name).toUpperCase();
  const gender = data[name] || 'M';
  return gender;
};

export const normalizeStr = (s: string): string => {
  return s
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};
