import { FileFormat } from 'components/FileUploader/FileUploader';

export const mapFormatsToFileUploader = (formats: FileFormat[]) => {
  let data: Record<string, string[]> = {};

  const FormatToData: Record<FileFormat, Record<string, string[]>> = {
    pdf: {
      'application/pdf': ['.pdf'],
    },
    doc: {
      'application/msword': ['.doc'],
    },
    docx: {
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
  };

  formats.forEach((format) => {
    data = {
      ...data,
      ...FormatToData[format],
    };
  });

  return data;
};
