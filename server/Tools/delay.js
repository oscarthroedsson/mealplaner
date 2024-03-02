/**
 * @description Delyes the code so we dont to to many req per sec.
 * @param {number} ms milliseconds to delay the code
 * @returns
 */
export const delay = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));
