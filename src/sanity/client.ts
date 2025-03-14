import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "bzt69isn",
  dataset: "production",
  apiVersion: "2025-03-13",
  token: 'skhogvZrQWqpmuYc3bqbbDgbFRBfgWpm3ubK0uYPE3Z3S2rF4292IK0FEWXzEyQjaA4dHHrmBy57Q9UitgIqEAaxsDy1HWBe2dDDv2B6Wo5DKo5DPQDmqz96aTUQl6n1hbNtIV1HJjV01p2mKULpiIDkyJbiTCtkJgTiQj64HW7d087xjg02',
  useCdn: false,
});