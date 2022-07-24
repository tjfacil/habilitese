import {
  getDate,
  getGender,
  getJuiz,
  getTitulo,
  getVocativo,
  normalizeStr,
} from '../../utils/lib';

jest.useFakeTimers('modern').setSystemTime(new Date(1970, 0, 1));

describe('lib tests', () => {
  test('getDate returns date properly formatted as string', () => {
    const date = getDate();
    expect(date).toEqual('01 de janeiro de 1970');
  });

  test('getVocativo returns properly according to gender', () => {
    let vocativo = getVocativo('M');
    expect(vocativo).toEqual('EXCELENTÍSSIMO SENHOR DOUTOR');
    vocativo = getVocativo('F');
    expect(vocativo).toEqual('EXCELENTÍSSIMA SENHORA DOUTORA');
  });

  test('getTitulo retuns proper titles', () => {
    let titulo = getTitulo('M', '1', 'mock');
    expect(titulo).toEqual('JUIZ');
    titulo = getTitulo('F', '1', 'mock');
    expect(titulo).toEqual('JUÍZA');
    titulo = getTitulo('M', '2', 'mock');
    expect(titulo).toEqual('DESEMBARGADOR RELATOR');
    titulo = getTitulo('F', '2', 'mock');
    expect(titulo).toEqual('DESEMBARGADORA RELATORA');
    titulo = getTitulo('M', '3', 'mock');
    expect(titulo).toEqual('MINISTRO RELATOR');
    titulo = getTitulo('F', '3', 'mock');
    expect(titulo).toEqual('MINISTRA RELATORA');
    titulo = getTitulo('M', '3', 'gabinete presidencia');
    expect(titulo).toEqual('MINISTRO PRESIDENTE');
    titulo = getTitulo('F', '3', 'gabinete presidencia');
    expect(titulo).toEqual('MINISTRA PRESIDENTE');
    titulo = getTitulo('M', '3', 'gabinete presidência');
    expect(titulo).toEqual('MINISTRO PRESIDENTE');
    titulo = getTitulo('M', '3', 'gabinete PRESIDENCIA    ');
    expect(titulo).toEqual('MINISTRO PRESIDENTE');
    titulo = getTitulo('M', '3', 'gabinete       PRESIDÊNCIA    ');
    expect(titulo).toEqual('MINISTRO PRESIDENTE');
    titulo = getTitulo('M', '4', 'mock');
    expect(titulo).toEqual('');
  });

  test('getJuiz returns judge name with a leading space', () => {
    const juiz = getJuiz('Fulano');
    expect(juiz).toEqual(' Fulano');
  });

  test('getJuiz returns empty string on invalid name', () => {
    const juiz = getJuiz('      ');
    expect(juiz).toEqual('');
  });

  test('getGender retuns proper genders for name inputs', () => {
    let gender = getGender('benjamin');
    expect(gender).toEqual('M');
    gender = getGender('   benjamin    ');
    expect(gender).toEqual('M');
    gender = getGender('nancy');
    expect(gender).toEqual('F');
    gender = getGender('aaaaaaaaaa');
    expect(gender).toEqual('M');
    gender = getGender('     ');
    expect(gender).toEqual('M');
  });

  test('normalizeStr removes graphic signs from strings', () => {
    let s = normalizeStr('test');
    expect(s).toEqual('test');
    s = normalizeStr('joão');
    expect(s).toEqual('joao');
    s = normalizeStr('ilhéus');
    expect(s).toEqual('ilheus');
    s = normalizeStr('         ');
    expect(s).toEqual('');
  });
});
