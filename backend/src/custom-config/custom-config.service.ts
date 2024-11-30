/* eslint-disable prettier/prettier */
import { cosmiconfigSync } from 'cosmiconfig';

export default (options: Record<string, any>) => {
  console.log("loading config");
  const explorer = cosmiconfigSync('kuzco');
  console.log('explorer setup ', explorer);
  const searchPaths = options?.searchPaths || [process.cwd()];
  console.log('search paths ', ...searchPaths);
  try {
    const result = explorer.search();
    console.log('result ', result);
    if (result)
      return result.config;

    return {
      url: 'http://localhost:11434',
      model: 'llama2',
      requestOptions: {
        useMMap: true,
        numThread: 6,
        numGpu: 1
      },
      database: {
        tableName: 'documents',
        columnName: 'match_documents'
      },
      extensions: ['.ts', '.js', '.json', '.jsonc', '.md'],
      format: 'json',
      chatTemperature: 0.5,
      topP: 1,
      topK: 40
    };
  }
  catch(error) {
    console.error(error);
  }
}