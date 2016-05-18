app.directive('istexResults', function () {
    return {
        template:'' +
        '<div class="istex-results-noresult" ng-show="noresult">'+
            '{{istexConfigDefault.labels.results.noresult || "Il n\'y a pas de résultat à afficher !"}}'+
        '</div>'+
        '<div class="istex-results-error" ng-show="showError">'+
            'Une erreur est survenue, veuillez réessayer plus tard. Si cette erreur persiste, vous pouvez envoyer un mail à <a href="mailto:istex-contact@univ-lorraine.fr" target="_blank">l\'équipe ISTEX-SNU</a>'+
        '</div>'+
        '<div class="istex-hidebutton" ng-click="istexConfigDefault.hideButton = false;" ng-show="!noresult && istexConfigDefault.hideButton && !showError" title="{{istexConfigDefault.labels.results.showResult || \'Cliquez pour afficher les résultats\'}}">{{ total || ". . . . . . . . ." | numberize }} documents</div>'+
        '<div id="istex-widget-results" style="opacity: 1;" ng-controller="IstexresultsCtrl" ng-toggle="showResults" ng-show="!noresult && !istexConfigDefault.hideButton">'+
            '<div class="istex-results-items-stats" ng-toggle="!hideStats">' +
                'Environ {{ total | numberize }} résultats <span title="Réseau : {{reseauSearchTime}} sec, Moteur de recherche : {{elasticSearchTime}} sec, Traitements de l\'API : {{istexSearchTime}} sec" ng-if="istexConfigDefault.showQuerySpeed">({{totalSearchTime}} secondes)</span>' +
            '</div>'+
            '<div class="istex-results-pagination" ng-if="istexConfigDefault.showPaginationTop">'+
                    //'<a href="#" ng-click="selectPage(firstPageURI.id)" ng-if="pageCourante !== firstPageURI.id"> {{firstPageURI.id}} </a>'+
                    '<a href="" class="istex-results-pagination-prec" title="Page précédente" ng-click="selectPage(pageCourante-1)" ng-if="pageCourante !== firstPageURI.id"> < </a>'+
                    '<ul class="istex-results-pagination-plist">'+
                        '<li ng-repeat="page in pages" >' +
                            '<a href="" ng-click="selectPage(page.id)" ng-if="pageCourante !== page.id ">{{page.id}}</a>' +
                            '<span class="istex-results-pagination-page-selected" ng-if="pageCourante === page.id">{{page.id}}</span>' +
                        '</li>'+
                    '</ul>'+
                    '<a href="" class="istex-results-pagination-next" title="Page suivante" ng-click="selectPage(pageCourante+1)" ng-if="pageCourante !== lastPageURI.id"> > </a>'+
                    //'<a href="#" ng-click="selectPage(lastPageURI.id)" ng-if="pageCourante !== lastPageURI.id"> {{lastPageURI.id}} </a>'+
            '</div>'+
            '<ol class="istex-results-items" ng-toggle="!hideResults">'+
                '<li class="istex-results-item" ng-repeat="document in documents">'+
                    '<a class="istex-results-item-title" target="_blank" ng-href="{{document.fulltext[0].uri | proxify:istexConfigDefault.proxyApi }}" >{{ document.title | ellipse:true:istexConfigDefault.titleLength:"..." }}</a>'+
                    '<p class="istex-results-item-abstract" ng-if="document.abstract" title="{{ document.abstract }}"><b>Résumé</b> : {{ document.abstract | ellipse:false:istexConfigDefault.abstractLength:"..."  }}</p>'+
                    '<p class="istex-results-item-abstract" title="Pas de résumé" ng-if="!document.abstract">{{ istexConfigDefault.labels.results[\'abstract\'] || "Pas de résumé disponible pour cet article" }}</p>'+
                    '<div class="istex-tag">{{ document.corpusName }}</div>'+
                    '<div class="istex-tag">Publié en {{ document.publicationDate }}</div>'+
                    '<div><b>Qualité du PDF</b> : <div class="star-rating" title="{{document.qualityIndicators.score}}"><div class="full-star" ng-style="{width: \'{{document.qualityIndicators.score*10 || 0}}%\'}"></div><div class="empty-star">{{document.qualityIndicators.score || 0}}</div></div></div>'+
                    '<div style="display: block">'+
                        '<div class="download fulltext">'+
                            '<h4>{{ istexConfigDefault.labels.results["fulltext"] || "Fulltext" }}</h4>'+
                            '<ul class="istex-results-item-download">'+
                                '<li class="istex-results-item-dl fulltext" ng-repeat="fulltext in document.fulltext">'+
                                    '<a ng-href="{{ fulltext.uri | proxify:istexConfigDefault.proxyApi }}" class="istex-results-item-dl-{{ fulltext.extension }}" title="Télécharger le fichier {{ fulltext.extension | uppercase }}" target="_blank">{{ fulltext.extension | uppercase }}</a>'+
                                '</li>'+
                            '</ul>'+
                        '</div>'+
                        '<div class="download metadata">'+
                            '<h4>{{ (istexConfigDefault.labels.results["metadata"] || "Metadata") }}</h4>'+
                            '<ul class="istex-results-item-download metadata">'+
                                '<li class="istex-results-item-dl" ng-repeat="metadata in document.metadata">'+
                                    '<a ng-href="{{ metadata.uri | proxify:istexConfigDefault.proxyApi }}" class="istex-results-item-dl-{{ metadata.extension }}" title="Télécharger le fichier {{ metadata.extension | uppercase }}" target="_blank">{{ metadata.extension | uppercase }}</a>'+
                                '</li>'+
                            '</ul>'+
                        '</div>'+
                        '<div class="download enrichment" ng-if="document.enrichments">'+
                            '<h4>{{ (istexConfigDefault.labels.results["enrichment"] || "Enrichissements") }}</h4>'+
                            '<ul class="istex-results-item-download enrichment">'+
                                '<li class="istex-results-item-dl" ng-repeat="enrichment in document.enrichments">'+
                                    '<a ng-href="{{ enrichment.uri | proxify:istexConfigDefault.proxyApi }}" class="istex-results-item-dl-xml" title="Télécharger le fichier {{ enrichment.type }}" target="_blank">XML</a>'+
                                '</li>'+
                            '</ul>'+
                        '</div>'+
                    '</div>' +
                    '<div class="istex-results-item-bottom"></div>'+
                    '<hr style="border-top-color: black;"/>'+
                '</li>' +
            '</ol>'+
            '<div class="istex-results-pagination" ng-if="istexConfigDefault.showPaginationBot">'+
                //'<a href="#" ng-click="selectPage(firstPageURI.id)" ng-if="pageCourante !== firstPageURI.id"> {{firstPageURI.id}} </a>'+
                '<a href="#istex-widget-search" class="istex-results-pagination-prec" title="Page précédente" ng-click="selectPage(pageCourante-1)" ng-if="pageCourante !== firstPageURI.id"> < </a>'+
                '<ul class="istex-results-pagination-plist">'+
                    '<li ng-repeat="page in pages" >' +
                        '<a href="#istex-widget-search" ng-click="selectPage(page.id)" ng-if="pageCourante !== page.id ">{{page.id}}</a>' +
                        '<span class="istex-results-pagination-page-selected" ng-if="pageCourante === page.id">{{page.id}}</span>' +
                    '</li>'+
                '</ul>'+
                '<a href="#istex-widget-search" class="istex-results-pagination-next" title="Page suivante" ng-click="selectPage(pageCourante+1)" ng-if="pageCourante !== lastPageURI.id"> > </a>'+
                //'<a href="#" ng-click="selectPage(lastPageURI.id)" ng-if="pageCourante !== lastPageURI.id"> {{lastPageURI.id}} </a>'+
            '</div>'+
        '</div>'
    };
});