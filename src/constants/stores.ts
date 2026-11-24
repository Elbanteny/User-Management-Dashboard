export interface Store {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  transactionCount: number;
}

export const initialStores: Store[] = [
  { id: "s1", userId: "1", name: "Toko Elektronik Jaya", createdAt: "2023-01-15", transactionCount: 1250 },
  { id: "s2", userId: "1", name: "Gadget Murah", createdAt: "2023-03-22", transactionCount: 890 },
  { id: "s3", userId: "2", name: "Butik Fashion", createdAt: "2023-02-10", transactionCount: 2100 },
  { id: "s4", userId: "3", name: "Logistik Cepat", createdAt: "2022-11-05", transactionCount: 450 },
  { id: "s5", userId: "4", name: "Alpha Computer", createdAt: "2023-05-18", transactionCount: 3200 },
  { id: "s6", userId: "5", name: "Konsultan Keuangan", createdAt: "2023-04-30", transactionCount: 180 },
  { id: "s7", userId: "6", name: "Media Kreatif", createdAt: "2023-06-12", transactionCount: 560 },
  { id: "s8", userId: "7", name: "Retail Sejahtera", createdAt: "2022-09-20", transactionCount: 980 },
  { id: "s9", userId: "8", name: "Apotek Sehat", createdAt: "2023-07-01", transactionCount: 4500 },
  { id: "s10", userId: "9", name: "Energi Baru", createdAt: "2023-08-14", transactionCount: 330 },
  { id: "s11", userId: "10", name: "Ventura Capital", createdAt: "2023-01-25", transactionCount: 720 },
  { id: "s12", userId: "11", name: "Solusi Teknologi", createdAt: "2023-03-08", transactionCount: 1450 },
  { id: "s13", userId: "12", name: "Jasa Profesional", createdAt: "2022-12-12", transactionCount: 610 },
  { id: "s14", userId: "13", name: "Lab Riset", createdAt: "2023-04-02", transactionCount: 290 },
  { id: "s15", userId: "14", name: "Media Digital", createdAt: "2023-05-20", transactionCount: 870 },
  { id: "s16", userId: "15", name: "Teknik Mandiri", createdAt: "2023-06-30", transactionCount: 1120 },
];