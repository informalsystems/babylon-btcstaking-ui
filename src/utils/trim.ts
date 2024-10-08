export const trim = (str: string, symbols: number = 10) => {
  return `${str.slice(0, symbols / 2)}...${str.slice(-symbols / 2)}`;
};
