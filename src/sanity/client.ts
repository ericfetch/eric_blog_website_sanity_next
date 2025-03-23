import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "bzt69isn",
  dataset: "production",
  apiVersion: "2025-03-13",
  token: 'skxWa0ktpkfQ0cIiCZbj1TTT1StsorkZuLPozCPrgIOHdmBrW7Vhh7tybnEfh2HbZhINbNtS7D7GamR0JBHJo6GAmH3JfxTaZwnr6q1ttgK9ijLv2veFZ1GCW07VFziHcyl2g3Y7vYuIh60FQWRb3nklvUdme8vBXejhWslyBDq4EUKK0Hy7',
  useCdn: false,
});