const crumbs = (name, path) => [
  { name: 'Accueil', path: '/' },
  { name, path },
]

export const legalPages = {
  '/mentions-legales': {
    title: 'Mentions légales | CalculPulse',
    description: 'Mentions légales de CalculPulse : éditeur Maketru, directeur de la publication, hébergeur Firebase et conditions de propriété intellectuelle.',
    path: '/mentions-legales',
    h1: 'Mentions légales',
    lede: 'Qui édite CalculPulse, qui en est le directeur de la publication, et où le site est hébergé.',
    crumbs: crumbs('Mentions légales', '/mentions-legales'),
    sections: [
      {
        h2: 'Éditeur du site',
        paragraphs: [
          'Le site {{url}} est édité par {{publisher}}. Forme juridique et immatriculation : {{legalForm}}. Adresse : {{address}}. Adresse électronique : {{email}}. Ces trois dernières mentions sont des espaces réservés, à remplacer par les informations définitives de l’éditeur avant toute exploitation commerciale. Elles sont centralisées pour que les autres pages affichent la même valeur.',
        ],
      },
      {
        h2: 'Directeur de la publication',
        paragraphs: [
          'Le directeur de la publication est {{director}}, conformément à l’article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique. Le directeur de la publication est la personne qui répond du contenu publié. Pour le joindre : {{email}}.',
        ],
      },
      {
        h2: 'Hébergement',
        paragraphs: [
          'Le site est hébergé par {{hostName}}, qui fournit le service {{hostService}}. Adresse : {{hostAddress}}. Téléphone : {{hostPhone}}. Site : {{hostWebsite}}. L’hébergeur assure la mise à disposition de l’infrastructure. Les calculatrices elles-mêmes s’exécutent dans le navigateur du visiteur et n’envoient pas les valeurs saisies à cet hébergeur pour traitement.',
        ],
      },
      {
        h2: 'Propriété intellectuelle',
        paragraphs: [
          'Les textes, le nom CalculPulse, le logo, l’organisation des pages et le code original sont la propriété de {{publisher}}, sauf mention contraire. Les polices Outfit, Fraunces et Fragment Mono sont utilisées sous leur licence libre respective (SIL Open Font License). Toute reproduction des textes au-delà de la citation courte et de l’usage privé est soumise à autorisation. Les marques tierces éventuellement citées (navigateurs, organismes, institutions) restent la propriété de leurs titulaires et ne sont mentionnées qu’à titre descriptif.',
        ],
      },
      {
        h2: 'Responsabilité',
        paragraphs: [
          'Les outils sont fournis gratuitement, en l’état, comme aides du quotidien. Les résultats sont indicatifs. Ils ne constituent pas un avis médical (calcul de l’IMC), un conseil fiscal ou comptable (TVA, marge), un conseil en investissement (intérêts) ni un mesurage officiel (surfaces). L’éditeur ne peut être tenu responsable d’une décision prise sur la seule foi d’un résultat, ni d’une erreur de saisie, ni d’une interruption due au réseau ou au navigateur. Les liens vers des sites tiers, lorsqu’ils existent, sont signalés. Leur contenu ne dépend pas de {{publisher}}.',
        ],
      },
      {
        h2: 'Données personnelles',
        paragraphs: [
          'Le détail des traitements figure dans la [[/politique-de-confidentialite|politique de confidentialité]] et la page [[/cookies|Cookies]]. Dernière mise à jour de ces mentions : {{updated}}.',
        ],
      },
    ],
  },
  '/politique-de-confidentialite': {
    title: 'Politique de confidentialité | CalculPulse',
    description: 'Politique de confidentialité CalculPulse : calculs locaux, cookies, AdSense et droits RGPD.',
    path: '/politique-de-confidentialite',
    h1: 'Politique de confidentialité',
    lede: 'Ce que CalculPulse traite, ce qui reste sur votre appareil, et comment exercer vos droits.',
    crumbs: crumbs('Confidentialité', '/politique-de-confidentialite'),
    sections: [
      {
        h2: 'Responsable',
        paragraphs: [
          'Le responsable du traitement est {{publisher}}, {{legalForm}}, {{address}}, {{email}}. Directeur de la publication : {{director}}. Ces coordonnées comportent encore des mentions à compléter. Elles sont les mêmes que dans les [[/mentions-legales|mentions légales]].',
        ],
      },
      {
        h2: 'Des outils qui tournent chez vous',
        paragraphs: [
          'Toutes les calculatrices et tous les convertisseurs s’exécutent dans votre navigateur. Les montants, notes, poids, tailles et autres valeurs saisies ne sont pas transmis à {{publisher}} et ne sont pas enregistrés. Il n’y a pas de compte utilisateur, pas de formulaire d’inscription et pas de base de clients.',
          'Certaines données restent dans le stockage local de votre navigateur, uniquement pour votre confort, et seulement après une action de votre part : le thème clair ou sombre (clé clp-theme) et le choix cookies (clp-consent). Vous pouvez les effacer depuis la page Cookies ou depuis les réglages du navigateur. Tant qu’elles restent sur l’appareil, {{publisher}} n’y a pas accès.',
        ],
      },
      {
        h2: 'Cookies, consentement, mesure d’audience et publicité',
        paragraphs: [
          'Au premier affichage, la publicité et la mesure d’audience sont refusées. Un bandeau permet d’accepter, de refuser, ou de choisir. Refuser se fait en un clic, au même niveau que accepter. Le choix est gardé dans clp-consent. Google Consent Mode est initialisé en « denied » avant toute demande publicitaire. Le site affiche des annonces Google AdSense (éditeur ca-pub-7530851972602654). Le script AdSense n’est chargé qu’après votre accord pour la publicité ; sans cet accord, aucune annonce n’est demandée et aucun cookie publicitaire n’est déposé.',
          'Si vous acceptez, Google Ireland Limited peut déposer des cookies ou identifiants pour diffuser et mesurer des annonces (AdSense). Google agit alors selon ses propres règles : https://policies.google.com/privacy et https://policies.google.com/technologies/ads. La base légale de cette publicité est votre consentement (article 6.1.a du RGPD et article 82 de la loi Informatique et Libertés). Vous pouvez retirer ce consentement à tout moment via « Gérer les cookies ». Le retrait vaut pour la suite et ne rend pas illicite la période précédente.',
          'Mesure d’audience : le site utilise Google Analytics 4 (Google Ireland Limited) pour compter les visites et les pages vues. Tant que vous n’avez pas accepté la mesure d’audience, Google Consent Mode v2 garde analytics_storage à « denied » : aucun cookie Google Analytics n’est déposé et seuls des signaux sans cookie ni identifiant persistant sont envoyés. Si vous acceptez, des cookies _ga peuvent être déposés (13 mois au plus) et les adresses IP ne sont pas conservées par Google Analytics. Règles de Google : https://policies.google.com/privacy et https://policies.google.com/technologies/partner-sites. Base légale : votre consentement, retirable à tout moment via « Gérer les cookies ».',
        ],
      },
      {
        h2: 'Journaux techniques de l’hébergeur',
        paragraphs: [
          'Comme tout site, l’hébergement {{hostService}} assuré par {{hostName}} ({{hostAddress}}) peut produire des journaux techniques de connexion (adresse IP, horodatage, user-agent, URL) pour la sécurité et le fonctionnement du réseau. Ces journaux sont ceux de l’hébergeur, conservés selon ses durées. Ils ne contiennent pas les valeurs saisies dans les calculatrices. {{publisher}} ne constitue pas, à partir de CalculPulse, de fichier clients.',
        ],
      },
      {
        h2: 'Durées, destinataires, transferts',
        paragraphs: [
          'Le choix de consentement et le thème restent jusqu’à leur effacement par vous. Aucun destinataire n’est appointé par {{publisher}} pour les outils. En cas d’acceptation publicitaire, Google peut traiter des données hors de l’Union européenne avec les garanties prévues par ses clauses contractuelles types. Il n’y a pas de vente de données. Les élèves mineurs peuvent utiliser les calculatrices ; le site ne leur demande pas de compte et ne cherche pas à profiler un public de moins de 15 ans.',
        ],
      },
      {
        h2: 'Vos droits',
        paragraphs: [
          'Vous disposez d’un droit d’accès, de rectification, d’effacement, d’opposition, de limitation et, quand il s’applique, de portabilité, ainsi que du droit de définir des directives après votre décès. Pour les données locales, l’effacement sur l’appareil est immédiat via la page Cookies. Pour toute autre demande : {{email}}. Vous pouvez aussi saisir la CNIL, 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07, ou via https://www.cnil.fr. Dernière mise à jour : {{updated}}.',
        ],
      },
    ],
  },
  '/cookies': {
    title: 'Cookies | CalculPulse',
    description: 'Page cookies de CalculPulse : consentement, refus aussi simple que l’accord, AdSense, et effacement des données locales.',
    path: '/cookies',
    h1: 'Cookies',
    lede: 'Ce qui est déposé, pourquoi, et comment changer d’avis sans chercher un lien caché.',
    crumbs: crumbs('Cookies', '/cookies'),
    sections: [
      {
        h2: 'Consentement par défaut refusé',
        paragraphs: [
          'Avant tout choix, les cookies publicitaires et de mesure d’audience sont bloqués. Le bandeau propose « Tout refuser » et « Tout accepter » avec la même facilité, plus « Personnaliser ». Le choix est enregistré dans le stockage local du navigateur, clé clp-consent, qui mémorise la publicité, la mesure d’audience et la date du choix. Ce traceur de préférence est nécessaire pour ne pas vous reposer la question à chaque page. Il n’est pas utilisé pour vous suivre d’un site à l’autre.',
        ],
      },
      {
        h2: 'Trois familles',
        paragraphs: [
          'Nécessaires : mémoriser votre décision et, séparément, le thème clair ou sombre (clp-theme). Ils ne partent pas vers un régie publicitaire. Publicité : uniquement si vous l’acceptez, Google AdSense peut déposer des cookies pour afficher et limiter la répétition des annonces. Mesure d’audience : uniquement si vous l’acceptez. Google Analytics 4 est chargé en mode Consent Mode : sans votre accord, analytics_storage reste « denied », aucun cookie de mesure n’est déposé et seuls des signaux anonymes sans cookie sont envoyés ; avec votre accord, Google Analytics peut déposer des cookies _ga. Le détail des traitements figure dans la [[/politique-de-confidentialite|politique de confidentialité]].',
        ],
      },
      {
        h2: 'Durée et éditeurs',
        paragraphs: [
          'Votre choix reste jusqu’à ce que vous le modifiiez ou effaciez les données du site. Les cookies éventuellement déposés par Google après acceptation ont les durées indiquées par Google (https://policies.google.com/technologies/cookies). L’éditeur du site est {{publisher}}, {{email}}. L’hébergeur est {{hostName}}. Il n’y a pas d’autre régie.',
        ],
      },
      {
        h2: 'Revenir sur votre choix',
        paragraphs: [
          'Le bouton ci-dessous rouvre le bandeau. Vous pouvez aussi effacer votre consentement enregistré. Le thème n’est pas effacé par ce bouton, pour ne pas changer l’affichage sans le vouloir : vous pouvez le basculer dans l’en-tête, ou vider les données du site dans le navigateur. Refuser la publicité n’empêche pas d’utiliser les outils.',
        ],
      },
    ],
  },
  '/cgu': {
    title: 'Conditions d’utilisation | CalculPulse',
    description: 'Conditions générales d’utilisation de CalculPulse : accès gratuit, usages permis, limites des calculatrices.',
    path: '/cgu',
    h1: 'Conditions d’utilisation',
    lede: 'Les règles simples d’un service gratuit, utilisable sans compte.',
    crumbs: crumbs('CGU', '/cgu'),
    sections: [
      {
        h2: 'Objet',
        paragraphs: [
          'Les présentes conditions régissent l’usage du site {{url}}, édité par {{publisher}}. CalculPulse propose des calculatrices (pourcentages, TVA, marge, moyennes, produit en croix, IMC, intérêts, surfaces) et des convertisseurs d’unités. L’accès est gratuit. L’utiliser vaut acceptation de ces conditions. Si vous n’êtes pas d’accord, n’utilisez pas le site.',
        ],
      },
      {
        h2: 'Accès',
        paragraphs: [
          'Le service est ouvert à toute personne disposant d’un navigateur récent. Aucune inscription n’est demandée. L’éditeur peut suspendre l’accès pour maintenance, sécurité ou évolution, sans préavis et sans indemnité, le service n’étant pas un abonnement. Les outils nécessitent JavaScript ; sans lui, les textes restent lisibles mais les calculs ne s’affichent pas.',
        ],
      },
      {
        h2: 'Usage acceptable',
        paragraphs: [
          'Vous vous engagez à ne pas détourner le site pour porter atteinte à des tiers, à ne pas tenter de casser l’hébergement, et à ne pas présenter les résultats comme une expertise officielle. Vérifiez vos saisies : un résultat n’est juste que si les valeurs entrées le sont.',
        ],
      },
      {
        h2: 'Limites des outils',
        paragraphs: [
          'Les résultats sont calculés avec soin mais restent indicatifs. Le calcul de l’IMC n’est pas un diagnostic médical ; les calculs de TVA et de marge ne remplacent pas un expert-comptable ; les simulations d’intérêts ne sont pas un conseil en investissement ; les taux de TVA cités peuvent évoluer avec la loi. Vous restez responsable de l’usage que vous faites des résultats, notamment sur une facture, un devis ou un document officiel.',
        ],
      },
      {
        h2: 'Propriété et disponibilité',
        paragraphs: [
          'Le contenu original reste la propriété de {{publisher}}. Vous pouvez partager les liens. Vous ne pouvez pas recopier le site pour le présenter comme le vôtre. Le service est fourni sans garantie d’absence d’erreur et sans obligation de résultat. Dans les limites autorisées par le droit français, la responsabilité de l’éditeur est exclue pour les dommages indirects liés à l’usage d’un outil gratuit. Rien dans ces conditions n’écarte une responsabilité que la loi interdit d’écarter.',
        ],
      },
      {
        h2: 'Droit applicable',
        paragraphs: [
          'Les conditions sont régies par le droit français. En cas de litige, une solution amiable peut être cherchée via {{email}}. À défaut, les tribunaux français compétents le sont, sous réserve des règles protectrices dont bénéficie un consommateur. Dernière mise à jour : {{updated}}.',
        ],
      },
    ],
  },
  '/contact': {
    title: 'Contact | CalculPulse',
    description: 'Contacter l’éditeur de CalculPulse, Maketru, pour une question sur les outils, les données ou les mentions légales.',
    path: '/contact',
    h1: 'Contact',
    lede: 'Une question sur un outil, un droit, ou une mention à corriger : écrivez à l’éditeur.',
    crumbs: crumbs('Contact', '/contact'),
    sections: [
      {
        h2: 'Écrire à l’éditeur',
        paragraphs: [
          '{{publisher}} édite CalculPulse. Directeur de la publication : {{director}}. Adresse : {{address}}. Forme et immatriculation : {{legalForm}}. Le moyen de contact est l’adresse {{email}}. Il n’y a pas de formulaire : le site n’a pas de serveur applicatif pour recevoir des messages. Le lien ci-dessous ouvre votre messagerie si elle est configurée.',
          'Pour un droit d’accès ou d’effacement, précisez l’adresse depuis laquelle vous écrivez et l’objet de la demande. Le consentement stocké localement se supprime sans nous écrire, depuis la page [[/cookies|Cookies]]. Pour signaler une erreur de calcul, indiquez la page et les valeurs saisies. Pour un bug d’affichage, indiquez le navigateur, la page, et ce que vous attendiez. Nous ne pouvons pas voir votre écran.',
        ],
      },
      {
        h2: 'Ce que ce contact n’est pas',
        paragraphs: [
          'Ce n’est pas une assistance médicale, fiscale, comptable ou juridique. Une question sur votre propre situation fiscale relève de l’administration fiscale ou d’un expert-comptable. L’hébergeur {{hostName}} ({{hostAddress}}, {{hostPhone}}) ne répond pas aux questions sur le contenu du site : écrivez à {{publisher}}.',
          'Dernière mise à jour de la page : {{updated}}. Les outils restent utilisables sans jamais nous écrire.',
        ],
      },
    ],
  },
}
