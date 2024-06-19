export const fileExtentionsOptions = [
  {
    label: 'Mp4 (arquivos de vídeo)',
    value: '.mp4',
  },
  {
    label: 'Mp3 (arquivos de áudio)',
    value: '.mp3',
  },
  {
    label: 'Pdf (arquivos de documento)',
    value: '.pdf',
  },
  {
    label: 'Docx (arquivos de documento do Word)',
    value: '.docx',
  },
  {
    label: 'Xlsx (arquivos de planilha do Excel)',
    value: '.xlsx',
  },
  {
    label: 'Exe (executavies)',
    value: '.exe',
  },
  {
    label: 'Png (imagens)',
    value: '.png',
  },
  {
    label: 'Jpg (imagens)',
    value: '.jpg',
  },
  {
    label: 'Gif (imagens)',
    value: '.gif',
  },
  {
    label: 'Txt (arquivos de texto)',
    value: '.txt',
  },
  {
    label: 'Csv (arquivos de valores separados por vírgula)',
    value: '.csv',
  },
  {
    label: 'Html (arquivos de página web)',
    value: '.html',
  },
  {
    label: 'Js (arquivos JavaScript)',
    value: '.js',
  },
  {
    label: 'Css (arquivos de estilo em cascata)',
    value: '.css',
  },
  {
    label: 'Json (arquivos de dados JSON)',
    value: '.json',
  },
];

export type FileExtentions = (typeof fileExtentionsOptions)[number]['value'];
