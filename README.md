# Widgets ISTEX avec AngularJS

Widgets (auth, search, results, facets) permettant de créer rapidement des interface Web d'interrogation des ressources ISTEX avec AngularJS.

## Usage classique des widgets

Exemple d'utilisation classique des widgets search et results. Il est nécessaire dans un premier temps de charger les fichiers JS et CSS des widgets Istex (à la fin du body pour charger les fichiers après que la page soit affichée) ainsi que la bibliothèque AngularJS qui est une dépendance nécessaire.
On peut aussi charger la bibliothèque Bootstrap pour un meilleur rendu et la directive pour afficher le Slider (voir plus bas pour afficher le Slider)

Ensuite vous pouvez placer deux balises (zone de recherche & zone de résultats) où vous le souhaitez dans votre page HTML.
Ces balises ont des noms spécifiques pour chaque widget :
```html
<istex-auth>, <istex-search>, <istex-results>, <istex-facets>
```
On peut aussi utiliser des balises classiques avec des attributs spéciaux :
```html
<div istex-auth></div>
```
A noter que la première méthode ne marche pas sur les vieux navigateurs (IE8...)

Voici ce que ca peut donner sur une page quasi vierge :

```html
<!DOCTYPE html>
<html lang="fr">
<head lang="en">
    <meta charset="UTF-8">
    <title>Istex - Widgets</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="slider/rzslider.css">
</head>
<body>

<istex-search></istex-search>
<istex-results></istex-results>
<istex-facets></istex-facets>

<!-- Dependencies -->

<script>
    var istexConfig = {
    };
</script>

<script src="bower_components/angular/angular.min.js"></script>
<script src="slider/rzslider.js"></script>
<script src="app.min.js"></script>

</body>
</html>
```

## Paramètres des widgets
Les widgets peuvent être paramétrés en positionnant les clés/valeurs de la variable globale istexConfig dans le HTML AVANT le scipt pour app.min.js.
La liste des différents paramètres se présente comme ceci (et est sujette à modifications) :

```javascript
var istexConfig = {
    // l'adresse de l'API de l'Istex
    // pour une ezproxyfication, réglez ici l'adresse ezproxyfiée
     // ex à l'UL: https://api-istex-fr.bases-doc.univ-lorraine.fr
     istexApi: 'https://api.istex.fr',

     // pour lancer une recherche au chargement de la page
     // indiquer les mots à rechercher (argument de ?q= au niveau de l'api istex)
     // si vous ne voulez pas de recherche au d�marrage, ne mettez rien (ou query: false)
     // si vous mettez query: "", les r�sultats seront tous les documents
     query: false,

     // il est possible de mettre le focus sur la barre de recherche au chargement de la page
     focusInputQueryOnLoad: false,

     // il est possible de ne charger que certaines facettes
     // par défaut, on charge seulement : 'corpus','pubdate','copyrightdate'
     facetsToLoad: [ 'corpus','pubdate','copyrightdate'],

     // il n'est possible de charger que certains champs de la recherche avancée
     // par défaut, tout les champs sont chargés
     // on peut mettre des valeurs par défaut aux champs au lieu de guillemets vides
     // pour enlever la recherche avancée, il faut mettre advancedToLoad:false
     advancedToLoad: {
         'author.name':"",
         'host.editor.name':"",
         'genre':"",
         'host.genre':"",
         'subject.value':"",
         'host.subject.value':"",
         'language':""
     },

     // il est possible d' soit un slider soit deux inputs lorsque les facettes sont des dates
     // si vous ne voulez pas de slider, vous n'êtes pas obligés d'inclure les dépendances en plus : slider/rzslider.css et slider/rzslider.js
     slider:true,

     // il est possible de cacher la zone de pagination en haut et/ou en bas avec ces paramètres
     showPaginationTop: true,
     showPaginationBot: true,

     // nombre de résultats souhaités par page
     pageSize: 10,

     // nombre max de pages à montrer dans la zone de pagination
     maxPagesInPagination: 10,

     // le nombre max de caractères du résumé à afficher
     abstractLength: 250,

     // le nombre max de caractères du titre à afficher

     titleLength: 150,

     // PAS ENCORE IMPLEMENTE
     // le format qu'on souhaite voir s'ouvrir quand on clique sur le titre
     fullTextOnTitle: 'pdf',

     // il est possible de cacher l'affichage de la vitesse de la requête
     // ex: "Environ 8 933 993 résultats (0.24 secondes)"
     // si showQuerySpeed vaut false, "(0.24 secondes)" ne sera pas affiché
     showQuerySpeed: true,

     // les différents textes paramétrables
     labels: {
         search: {
             'advancedTitle':"Recherche avancée",
             'placeholder':"Votre requête ici ...",
             'author.name':"Auteur",
             'host.editor.name':"Editeur",
             'genre':"Genre de document",
             'host.genre':"Genre de série",
             'subject.value':"Sujet du document",
             'host.subject.value':"Sujet de la série",
             'language':"Langue"
         },
         results: {
             'abstract':"Pas de résumé",
             'fulltext':"Texte complet",
             'metadata':"Métadonnées"
         },
         facets: {
             'title' : 'Affiner votre recherche',
             'corpus' : 'Corpus',
             'pubdate' : 'Date de publication',
             'copyrightdate' : 'Début du copyright'
         }
     }
}

```

Remarque : ces paramètres doivent être de préférence positionnés avant l'inclusion des fichiers app.min.js

## Fonctionnement du widget istexAuth

CE WIDGET N'EST PLUS A JOUR DEPUIS L'OUVERTURE DE L'API ISTEX !

## Fonctionnement du widget istexSearch

Ce widget permet d'insérer dans la page HTML une zone de saisie ainsi qu'un bouton de recherche. Lorsqu'une suite de mots sont tapés puis que le bouton rechercher est pressé, l'API Istex est interrogée à travers des requêtes AJAX.
Une fois les résultats reçus, ils sont enregistrés dans le $rootScope et ainsi propagés aux widgets results et facets.
Ce widget permet aussi de faire une recherche avancée.

## Fonctionnement du widget istexResults

Ce widget permet d'insérer dans la page HTML la liste des résultats issus d'une recherche. Il a donc besoin du widget istexSearch pour fonctionner (Il est évident qu'on ne peut pas afficher des données si on ne les a pas réccupérées de l'API avant ! ).
Il permet aussi de gérer le système de pagination et la recherche au chargement de la page.

## Fonctionnement du widget istexFacets

Ce widget permet d'insérer dans la page HTML des facettes permettant d'affiner la recherche courante de l'utilisateur. A l'aide de la facette corpus, on peut ainsi n'afficher que les résultats provenant d'un éditeur précis.
Les facettes actuellement gérées sont les suivantes :
- corpus, pubdate, copyrightdate

Il est possible de n'afficher que certaines facettes en modifiant le paramètre ``facetsToLoad`` dans istexConfig.

## Documentation développeurs

### Installation d'un environnement de développement

Voici les étapes permettant de mettre en place un environnement de développement :

Installer NodeJS et npm (exemple sous Linux avec l'outil [nvm](https://github.com/creationix/nvm)) :
```
curl https://raw.githubusercontent.com/creationix/nvm/v0.20.0/install.sh | bash
nvm install 0.10
nvm use 0.10
```
Exemple pour installer nodejs et npm sous MacOSX :
```
brew install node
```

Sous windows, télécharger et installer nodejs et git depuis leurs sites :
- http://nodejs.org/download/
- http://git-scm.com/download/win

Récupérer le dépôt git des widgets Istex (au choix via SSH ou via HTTPS) :
```
git clone git@github.com:istex/istex-widgets-angular.git
git clone https://github.com/istex/istex-widgets-angular.git
```

package.json permet d'associer des scripts à npm et faciliter ainsi la construction du projet.
Pour initialiser les dépendances (uglify-js, clean-css, http-server, bootstrap et angularjs) en local et rendre le projet prêt à utiliser, il suffit de faire :
```
cd istex-widgets-angular/
npm install
```

Si vous avez déjà des outils pour minifier le js et le css et lancer un serveur en locale, vous pouvez juste charger angularjs et bootstrap :
```
cd istex-widgets-angular/
bower install
```

Vous êtes alors opérationels pour développer votre contribution.

### Tester, compiler et déployer

Pour développer et tester les widgets depuis votre navigateur Web, le plus simple est de lancer un mini serveur Web avec la commande suivante qui appelle http-server :
```
npm run server
```

Puis ouvrez les URL qui s'affichent dans votre fenêtre. Exemple: http://127.0.0.1:8080/index.html pour une vue d'ensemble, http://127.0.0.1:8080/basique.html pour l'exemple le plus léger (sans Bootstrap et autres).

Si vous modifiez des fichiers, vous devez minifier le Javascript à l'aide d'Uglify-JS et/ou le CSS avec Clean-CSS :
```
cd istex-widgets-angular/
npm run js // Compile juste le js dans app.min.js
npm run css // Compile juste le css dans style.min.css
npm run jscss // Compile le js et le css dans leur fichiers réspectifs
```
ATTENTION : Si vous utilisez vos propres minifieurs, il faut toujours mettre istexconfigdefault.js à la fin de la liste des fichiers à minifier de votre commande car il lie l'application à AngularJS

### Comprendre la structure du code

L'utilisation d'AngularJS mène à avoir une structure du code particulière (approche MVC côté Client) :
- Un dossier app dans lequel on met tout le JavaScript lié aux widgets contenant
  - Un fichier app.js qui initialise l'application et créé quelques filtres et autres fonctions utiles (pour éviter la dépendance à jQuery)
  - Dans chaque dossier widget, un fichier controller qui inclue le code qui permet d'associer les données au $rootScope (Controller)
  - Dans chaque dossier widget, un fichier directive qui inclue le code qui permet de générer le HTML (View)
  - Dans chaque dossier widget, un fichier service qui inclue le code qui permet de construire les URIs et de faire l'appel correspondant (Model)
  - Un fichier istexconfigdefault.js qui associe les configurations par défaut au $rootScope (et éventuellement celles indiquées dans le HTML) et associe l'application à AngularJS
- Un dossier css qui contient tout le css lié aux widgets
On a aussi :
- Un dossier public qui contient tout ce qui est prêt à être utilisés par le serveur
  - Un dossier bower_components contenant AngularJS et Bootstrap
  - Les versions minifiés du css et du javascript des widgets
  - Un fichier index.html qui utilise les widgets avec le css, Bootstrap et les Sliders
  - Un fichier basique.html qui utilise juste les widgets et rien d'autre
  - Un dossier img qui contient toutes les images liées aux widgets
  - Un dossier slider contenant le code nécessaire à la création et géstion de la directive rzslider (pour les facettes pubdate et copyrightdate par example) indépendant de jQuery, créé par rzajac :
    [angularjs-slider](https://github.com/rzajac/angularjs-slider)

### Charger le code de l'application différemment (optionnel)
Voici un exemple plus poussé pour charger les widgets qui se trouve dans index.html, dans le but d'attendre que la page soit complètement affichée avant de télécharger et exécuter le Javascript :
On charge les scripts de manière asynchrone en remplaçant les balises par une fonction spéciale. Cela marche seulement pour les navigateurs récents (IE 9 ne passe pas :/ ) !
```html
<!-- Dependencies -->
<script>
    var istexConfig = {
    };
    [
    	'bower_components/angular/angular.min.js',
        'app.min.js'
    ].forEach(function(src) {
        var script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.head.appendChild(script);
    });
</script>
<!-- <script src="bower_components/angular/angular.min.js"></script> -->
<!-- <script src="app.min.js"></script> -->
```

Au final, l'utilisateur pourra accéder aux différentes version des widgets sur http://test-widget-istex.infra.univ-lorraine.fr de cette façon :
- Pour utiliser la dernière version stable des widgets, les fichiers sont présents ici :
  - http://test-widget-istex.infra.univ-lorraine.fr/public/bower_components/angular/angular.min.js
  - http://test-widget-istex.infra.univ-lorraine.fr/public/bower_components/bootstrap/dist/css/bootstrap.min.css
  - http://test-widget-istex.infra.univ-lorraine.fr/public/bower_components/bootstrap/dist/css/bootstrap-theme.min.css
  - http://test-widget-istex.infra.univ-lorraine.fr/public/style.min.css
  - http://test-widget-istex.infra.univ-lorraine.fr/public/app.min.js
  - http://test-widget-istex.infra.univ-lorraine.fr/public/slider/rzslider.css
  - http://test-widget-istex.infra.univ-lorraine.fr/public/slider/rzslider.js


