/**
 * Opinie na stronie głównej — na sztywno, z treści zgodnej z wizytówką Google (Lubin).
 * Źródło cytatów: publiczne agregatory odzwierciedlające Google (m.in. porównajdentyste.pl).
 *
 * Jeśli w Maps jest więcej opinii z tekstem, dopisz kolejne obiekty poniżej (tekst 1:1, autor jak w profilu).
 */
export type GoogleReviewHighlight = {
  text: string;
  authorLabel: string;
  rating: 1 | 2 | 3 | 4 | 5;
  timeLabel?: string;
};

export const GOOGLE_REVIEW_HIGHLIGHTS: GoogleReviewHighlight[] = [
  {
    text: 'Polecam! Jestem więcej niż zadowolony z rezultatów leczenia.',
    authorLabel: 'Paweł Regulski',
    rating: 5,
    timeLabel: 'Google Maps',
  },
  {
    text: 'Jakość usług na bardzo wysokim poziomie POLECAM',
    authorLabel: 'Jacek',
    rating: 5,
    timeLabel: 'Google Maps',
  },
  {
    text: 'Najlepszy dentysta świata prawie nic nie boli',
    authorLabel: 'Tymek Sz.',
    rating: 5,
    timeLabel: 'tydzień temu · Google Maps',
  },
  {
    text: 'Serdecznie polecam! ❤️',
    authorLabel: 'xmichaal YT',
    rating: 5,
    timeLabel: '2 miesiące temu · Google Maps',
  },
];
