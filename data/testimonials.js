/* ==========================================================================
   AZASHOOTS — Source des témoignages clients
   --------------------------------------------------------------------------
   Éditez cet array pour ajouter / modifier / supprimer un avis.
   Champs :
     name   : (string, requis)    Nom du client
     role   : (string, optionnel) Poste ou contexte (ex : "Athlète", "Événement")
     text   : (string, optionnel) Texte de l'avis. Vide ou null = "Avis à venir"
     rating : (number, optionnel) Note de 1 à 5. null = pas d'étoiles affichées
     avatar : (string, optionnel) Chemin vers une photo carrée (avatar 42×42)
   --------------------------------------------------------------------------
   POUR AJOUTER UN NOUVEAU CLIENT :
     - Crée son entrée dans l'array (laisse text/rating à null si pas encore d'avis)
     - Pointe avatar vers une photo de son dossier asset
     - Le rendu affichera automatiquement avatar + nom + "Avis à venir"
   ========================================================================== */

window.AZA_TESTIMONIALS = [
  {
    name: 'Goran',
    role: 'Athlète · Giga Arena Bordeaux',
    text: null,
    rating: null,
    avatar: 'assets/Athlete/Goran/DSC02018.jpg',
  },
  {
    name: 'Mélina',
    role: 'Athlète · Giga Arena Bordeaux',
    text: 'Très bonne expérience ! Met à l\'aise devant l\'appareil même quand on ne l\'est pas forcément au départ. Le rendu final est super propre, qualitatif et professionnel. Très contente du résultat final !',
    rating: 5,
    avatar: 'assets/Athlete/Melina/DSC01779.jpg',
  },
  {
    name: 'Maevane',
    role: 'Athlète · Fitness Park Poitiers',
    text: 'Très satisfaite du résultat, je ne m\'attendais pas à un si beau rendu ! La qualité des photos est vraiment au-dessus de mes attentes : travail soigné, détails travaillés, rendu final tout simplement incroyable. Il a su me guider sur les poses avec beaucoup de professionnalisme, me mettre en confiance dès le début de la séance et surtout me mettre en valeur sur les photos. On se sent accompagnée tout au long de la séance, ce qui permet d\'être naturelle et à l\'aise devant l\'objectif. Le résultat final dépasse toutes mes attentes — c\'est ce qui fait vraiment la différence. Je recommande sans hésiter, les yeux fermés ! 😌',
    rating: 5,
    avatar: 'assets/Athlete/Maevane/DSC02407.jpg',
  },
  {
    name: 'Julia Arnaud',
    role: 'Athlète · Fitness Park La Sentinelle',
    text: null,
    rating: null,
    avatar: 'assets/Athlete/Julia/cover.jpg',
  },
  {
    name: 'Grégoire Boucher',
    role: 'Athlète · Fitness Park La Sentinelle',
    text: null,
    rating: null,
    avatar: 'assets/Athlete/Gregoire/cover.jpg',
  },
  {
    name: 'Valentin Leperck',
    role: 'Athlète · Gold\'s Gym Mouscron',
    text: null,
    rating: null,
    avatar: 'assets/Athlete/Valentin%20Leperck/cover.jpg',
  },
  {
    name: 'Fabio Cassina',
    role: 'Athlète · Fitness Park La Sentinelle',
    text: null,
    rating: null,
    avatar: 'assets/Athlete/Fabio/cover.jpg',
  },
  {
    name: 'Kettlebell',
    role: 'Événement',
    text: null,
    rating: null,
    avatar: 'assets/Evenement/Kettlebell/DSC01185.jpg',
  },
  {
    name: 'CrossFit',
    role: 'Événement',
    text: null,
    rating: null,
    avatar: 'assets/Evenement/CroosFit/DSC01081.jpg',
  },
  {
    name: 'Fit Your Body',
    role: 'Marque · Catalogue produits',
    text: null,
    rating: null,
    avatar: 'assets/Evenement/FYB/cover.jpg',
  },
  {
    name: 'USA GYM',
    role: 'Événement · Automobile',
    text: null,
    rating: null,
    avatar: null,
  },
  {
    name: 'Lounge Barber By Chris',
    role: 'Barbershop',
    text: null,
    rating: null,
    avatar: 'assets/Barber/Lounge%20Barber%20By%20Chris/DSC01498.jpg',
  },
];
