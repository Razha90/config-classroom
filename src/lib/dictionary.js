// const cache = {};
// let hitung = 0;
// export const getDictionary = async (locale, module) => {
//   const cacheKey = `${locale}-${module}`;
//   if (cache[cacheKey]) {
//     hitung += 1;
//     console.log("cache", hitung);
//     return cache[cacheKey];
//   }

//   try {
//     const dictionary = await import(`../../dictionaries/${locale}/${module}.json`);
//     cache[cacheKey] = dictionary.default;
//     return dictionary.default;
//   } catch (error) {
//     throw new Error(`Dictionary untuk "${module}" dengan locale "${locale}" tidak ditemukan.`);
//   }
// };


// export const getDictionary = async (locale, module) => {
//   const cacheKey = `${locale}-${module}`;

//   // Cek jika data sudah ada dalam cache global
//   if (global.cache && global.cache[cacheKey]) {
//     console.log("cache");
//     return global.cache[cacheKey];
//   }

//   try {
//     // Jika tidak ada, ambil data dan simpan ke cache global
//     const dictionary = await import(`../../dictionaries/${locale}/${module}.json`);
//     if (!global.cache) global.cache = {}; // Inisialisasi cache jika belum ada
//     global.cache[cacheKey] = dictionary.default;
//     console.log("pernah");

//     return dictionary.default;
//   } catch (error) {
//     throw new Error(`Dictionary untuk "${module}" dengan locale "${locale}" tidak ditemukan.`);
//   }
// };

let cache = {}; // cache tetap pada runtime

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
