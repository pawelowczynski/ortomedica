/** Opcje pola „Cel wizyty” — synchronizuj z $allowedSubjects w public/contact.php */
export const CONTACT_SUBJECTS = [
  { value: 'stomatologia-dziecko', label: 'Stomatologia dziecięca / pierwsza wizyta' },
  { value: 'profilaktyka', label: 'Profilaktyka / lakowanie / higiena dziecka' },
  { value: 'chirurgia', label: 'Chirurgia stomatologiczna' },
  { value: 'gnatologia', label: 'Gnatologia / ból żuchwy / TMJ' },
  { value: 'ortodoncja', label: 'Ortodoncja dziecka lub młodzieży' },
  { value: 'ortodoncja-dorosli', label: 'Ortodoncja dorosłych' },
  { value: 'rtg-diagnostyka', label: 'RTG / diagnostyka obrazowa' },
  { value: 'inne', label: 'Inne zapytanie' },
] as const;

export type ContactSubjectKey = (typeof CONTACT_SUBJECTS)[number]['value'];
