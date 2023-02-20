export class Studio {
  _id: string;
  user: string;
  name: string;
  date: Date;
  address: string;
  description: string;
  full_description: string;
  approved: boolean; // odobreno od strane admina
  likes: number;
  free_spaces: number;
  registered_users: Array<String>;
  waiting_users: Array<String>;
  registration_requested: Array<String>;
  icon: string;
  icons: Array<String>;
  // ulogovani treba jos da vidi galeriju slika i mapu sa adresom odrzavanja
}
