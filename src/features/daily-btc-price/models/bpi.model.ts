export interface BPI {
  bpi: { [key: string]: number };
  disclaimer: string;
  time: {
    updated: string;
    updatedISO: string;
  };
}
