// import en from '../../dictionaries/en.json';
// import id from '../../dictionaries/id.json';

// const dictionaries = { en, id };

// export const getDictionary = async (locale) => {
//   const dictionary = dictionaries[locale];
//   return dictionary;
// };

const cache = {};

export const getDictionary = async (locale, module) => {
  const cacheKey = `${locale}-${module}`;
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  try {
    const dictionary = await import(`../../dictionaries/${locale}/${module}.json`);
    cache[cacheKey] = dictionary.default;
    return dictionary.default;
  } catch (error) {
    throw new Error(`Dictionary untuk "${module}" dengan locale "${locale}" tidak ditemukan.`);
  }
};
