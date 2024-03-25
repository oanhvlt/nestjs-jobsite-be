'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-basic documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-70245f1bade7d10e9d1d90c089ef1ad57f1232d1caf915bb8cba87f386decdc45b6eef62a2200e38fc3c2ba1b617e831f49c7a766af101eef268d5128936d70f"' : 'data-bs-target="#xs-controllers-links-module-AppModule-70245f1bade7d10e9d1d90c089ef1ad57f1232d1caf915bb8cba87f386decdc45b6eef62a2200e38fc3c2ba1b617e831f49c7a766af101eef268d5128936d70f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-70245f1bade7d10e9d1d90c089ef1ad57f1232d1caf915bb8cba87f386decdc45b6eef62a2200e38fc3c2ba1b617e831f49c7a766af101eef268d5128936d70f"' :
                                            'id="xs-controllers-links-module-AppModule-70245f1bade7d10e9d1d90c089ef1ad57f1232d1caf915bb8cba87f386decdc45b6eef62a2200e38fc3c2ba1b617e831f49c7a766af101eef268d5128936d70f"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-70245f1bade7d10e9d1d90c089ef1ad57f1232d1caf915bb8cba87f386decdc45b6eef62a2200e38fc3c2ba1b617e831f49c7a766af101eef268d5128936d70f"' : 'data-bs-target="#xs-injectables-links-module-AppModule-70245f1bade7d10e9d1d90c089ef1ad57f1232d1caf915bb8cba87f386decdc45b6eef62a2200e38fc3c2ba1b617e831f49c7a766af101eef268d5128936d70f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-70245f1bade7d10e9d1d90c089ef1ad57f1232d1caf915bb8cba87f386decdc45b6eef62a2200e38fc3c2ba1b617e831f49c7a766af101eef268d5128936d70f"' :
                                        'id="xs-injectables-links-module-AppModule-70245f1bade7d10e9d1d90c089ef1ad57f1232d1caf915bb8cba87f386decdc45b6eef62a2200e38fc3c2ba1b617e831f49c7a766af101eef268d5128936d70f"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-6afa918a4145e6d104024571627bd39a491277f30d5cd61277f8519bb1024397272f3f85d786bddfb067479659a3d9bd76be25d675b842eac5454aa8e3b43444"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-6afa918a4145e6d104024571627bd39a491277f30d5cd61277f8519bb1024397272f3f85d786bddfb067479659a3d9bd76be25d675b842eac5454aa8e3b43444"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-6afa918a4145e6d104024571627bd39a491277f30d5cd61277f8519bb1024397272f3f85d786bddfb067479659a3d9bd76be25d675b842eac5454aa8e3b43444"' :
                                            'id="xs-controllers-links-module-AuthModule-6afa918a4145e6d104024571627bd39a491277f30d5cd61277f8519bb1024397272f3f85d786bddfb067479659a3d9bd76be25d675b842eac5454aa8e3b43444"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-6afa918a4145e6d104024571627bd39a491277f30d5cd61277f8519bb1024397272f3f85d786bddfb067479659a3d9bd76be25d675b842eac5454aa8e3b43444"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-6afa918a4145e6d104024571627bd39a491277f30d5cd61277f8519bb1024397272f3f85d786bddfb067479659a3d9bd76be25d675b842eac5454aa8e3b43444"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-6afa918a4145e6d104024571627bd39a491277f30d5cd61277f8519bb1024397272f3f85d786bddfb067479659a3d9bd76be25d675b842eac5454aa8e3b43444"' :
                                        'id="xs-injectables-links-module-AuthModule-6afa918a4145e6d104024571627bd39a491277f30d5cd61277f8519bb1024397272f3f85d786bddfb067479659a3d9bd76be25d675b842eac5454aa8e3b43444"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CompaniesModule.html" data-type="entity-link" >CompaniesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CompaniesModule-fb081bedae4f1ea9d0c531bfbc86259b91e0b372031ffaed3bcd0dff3ba3b020eeb9e2aeab12b8661060c8fffaffa7e026efd19b1d3d1174fb40c611d8fa0827"' : 'data-bs-target="#xs-controllers-links-module-CompaniesModule-fb081bedae4f1ea9d0c531bfbc86259b91e0b372031ffaed3bcd0dff3ba3b020eeb9e2aeab12b8661060c8fffaffa7e026efd19b1d3d1174fb40c611d8fa0827"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CompaniesModule-fb081bedae4f1ea9d0c531bfbc86259b91e0b372031ffaed3bcd0dff3ba3b020eeb9e2aeab12b8661060c8fffaffa7e026efd19b1d3d1174fb40c611d8fa0827"' :
                                            'id="xs-controllers-links-module-CompaniesModule-fb081bedae4f1ea9d0c531bfbc86259b91e0b372031ffaed3bcd0dff3ba3b020eeb9e2aeab12b8661060c8fffaffa7e026efd19b1d3d1174fb40c611d8fa0827"' }>
                                            <li class="link">
                                                <a href="controllers/CompaniesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompaniesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CompaniesModule-fb081bedae4f1ea9d0c531bfbc86259b91e0b372031ffaed3bcd0dff3ba3b020eeb9e2aeab12b8661060c8fffaffa7e026efd19b1d3d1174fb40c611d8fa0827"' : 'data-bs-target="#xs-injectables-links-module-CompaniesModule-fb081bedae4f1ea9d0c531bfbc86259b91e0b372031ffaed3bcd0dff3ba3b020eeb9e2aeab12b8661060c8fffaffa7e026efd19b1d3d1174fb40c611d8fa0827"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CompaniesModule-fb081bedae4f1ea9d0c531bfbc86259b91e0b372031ffaed3bcd0dff3ba3b020eeb9e2aeab12b8661060c8fffaffa7e026efd19b1d3d1174fb40c611d8fa0827"' :
                                        'id="xs-injectables-links-module-CompaniesModule-fb081bedae4f1ea9d0c531bfbc86259b91e0b372031ffaed3bcd0dff3ba3b020eeb9e2aeab12b8661060c8fffaffa7e026efd19b1d3d1174fb40c611d8fa0827"' }>
                                        <li class="link">
                                            <a href="injectables/CompaniesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompaniesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabasesModule.html" data-type="entity-link" >DatabasesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DatabasesModule-c38b107aa341bd1360637a708b6d1de88073a26bd5f223bc0e9a21be67fff016bf940030392a279ef712d447ebba21a8ad1b3fe4db398948c98421d314c3e188"' : 'data-bs-target="#xs-controllers-links-module-DatabasesModule-c38b107aa341bd1360637a708b6d1de88073a26bd5f223bc0e9a21be67fff016bf940030392a279ef712d447ebba21a8ad1b3fe4db398948c98421d314c3e188"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DatabasesModule-c38b107aa341bd1360637a708b6d1de88073a26bd5f223bc0e9a21be67fff016bf940030392a279ef712d447ebba21a8ad1b3fe4db398948c98421d314c3e188"' :
                                            'id="xs-controllers-links-module-DatabasesModule-c38b107aa341bd1360637a708b6d1de88073a26bd5f223bc0e9a21be67fff016bf940030392a279ef712d447ebba21a8ad1b3fe4db398948c98421d314c3e188"' }>
                                            <li class="link">
                                                <a href="controllers/DatabasesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabasesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DatabasesModule-c38b107aa341bd1360637a708b6d1de88073a26bd5f223bc0e9a21be67fff016bf940030392a279ef712d447ebba21a8ad1b3fe4db398948c98421d314c3e188"' : 'data-bs-target="#xs-injectables-links-module-DatabasesModule-c38b107aa341bd1360637a708b6d1de88073a26bd5f223bc0e9a21be67fff016bf940030392a279ef712d447ebba21a8ad1b3fe4db398948c98421d314c3e188"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DatabasesModule-c38b107aa341bd1360637a708b6d1de88073a26bd5f223bc0e9a21be67fff016bf940030392a279ef712d447ebba21a8ad1b3fe4db398948c98421d314c3e188"' :
                                        'id="xs-injectables-links-module-DatabasesModule-c38b107aa341bd1360637a708b6d1de88073a26bd5f223bc0e9a21be67fff016bf940030392a279ef712d447ebba21a8ad1b3fe4db398948c98421d314c3e188"' }>
                                        <li class="link">
                                            <a href="injectables/DatabasesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabasesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesModule.html" data-type="entity-link" >FilesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FilesModule-5d302884afa79aad808a011b99ae1599475691443755e048c279f46ebf0d09ce2c1fac643bca70957f9cfe239e78134055ec60a765e13430c06fdd516130c2b8"' : 'data-bs-target="#xs-controllers-links-module-FilesModule-5d302884afa79aad808a011b99ae1599475691443755e048c279f46ebf0d09ce2c1fac643bca70957f9cfe239e78134055ec60a765e13430c06fdd516130c2b8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FilesModule-5d302884afa79aad808a011b99ae1599475691443755e048c279f46ebf0d09ce2c1fac643bca70957f9cfe239e78134055ec60a765e13430c06fdd516130c2b8"' :
                                            'id="xs-controllers-links-module-FilesModule-5d302884afa79aad808a011b99ae1599475691443755e048c279f46ebf0d09ce2c1fac643bca70957f9cfe239e78134055ec60a765e13430c06fdd516130c2b8"' }>
                                            <li class="link">
                                                <a href="controllers/FilesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FilesModule-5d302884afa79aad808a011b99ae1599475691443755e048c279f46ebf0d09ce2c1fac643bca70957f9cfe239e78134055ec60a765e13430c06fdd516130c2b8"' : 'data-bs-target="#xs-injectables-links-module-FilesModule-5d302884afa79aad808a011b99ae1599475691443755e048c279f46ebf0d09ce2c1fac643bca70957f9cfe239e78134055ec60a765e13430c06fdd516130c2b8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesModule-5d302884afa79aad808a011b99ae1599475691443755e048c279f46ebf0d09ce2c1fac643bca70957f9cfe239e78134055ec60a765e13430c06fdd516130c2b8"' :
                                        'id="xs-injectables-links-module-FilesModule-5d302884afa79aad808a011b99ae1599475691443755e048c279f46ebf0d09ce2c1fac643bca70957f9cfe239e78134055ec60a765e13430c06fdd516130c2b8"' }>
                                        <li class="link">
                                            <a href="injectables/FilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HealthModule-92ed5b6ec8dafa6743e5930b27f2aa330f40891578db23fe067a7cf7dd4e28bd4b23a4b0460e4449ad6468cc0621e1ad0760f433850b436bcff89a6bec61f01c"' : 'data-bs-target="#xs-controllers-links-module-HealthModule-92ed5b6ec8dafa6743e5930b27f2aa330f40891578db23fe067a7cf7dd4e28bd4b23a4b0460e4449ad6468cc0621e1ad0760f433850b436bcff89a6bec61f01c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-92ed5b6ec8dafa6743e5930b27f2aa330f40891578db23fe067a7cf7dd4e28bd4b23a4b0460e4449ad6468cc0621e1ad0760f433850b436bcff89a6bec61f01c"' :
                                            'id="xs-controllers-links-module-HealthModule-92ed5b6ec8dafa6743e5930b27f2aa330f40891578db23fe067a7cf7dd4e28bd4b23a4b0460e4449ad6468cc0621e1ad0760f433850b436bcff89a6bec61f01c"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/JobsModule.html" data-type="entity-link" >JobsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-JobsModule-960099693bdd001f49e1257b344feb9dc38c8ef40db6b7deb80d817e1b35c3e2212e2f597c01dee9c0bf66e47cf184614cd89f23f18ffb581635e1cbc7313eb4"' : 'data-bs-target="#xs-controllers-links-module-JobsModule-960099693bdd001f49e1257b344feb9dc38c8ef40db6b7deb80d817e1b35c3e2212e2f597c01dee9c0bf66e47cf184614cd89f23f18ffb581635e1cbc7313eb4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-JobsModule-960099693bdd001f49e1257b344feb9dc38c8ef40db6b7deb80d817e1b35c3e2212e2f597c01dee9c0bf66e47cf184614cd89f23f18ffb581635e1cbc7313eb4"' :
                                            'id="xs-controllers-links-module-JobsModule-960099693bdd001f49e1257b344feb9dc38c8ef40db6b7deb80d817e1b35c3e2212e2f597c01dee9c0bf66e47cf184614cd89f23f18ffb581635e1cbc7313eb4"' }>
                                            <li class="link">
                                                <a href="controllers/JobsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-JobsModule-960099693bdd001f49e1257b344feb9dc38c8ef40db6b7deb80d817e1b35c3e2212e2f597c01dee9c0bf66e47cf184614cd89f23f18ffb581635e1cbc7313eb4"' : 'data-bs-target="#xs-injectables-links-module-JobsModule-960099693bdd001f49e1257b344feb9dc38c8ef40db6b7deb80d817e1b35c3e2212e2f597c01dee9c0bf66e47cf184614cd89f23f18ffb581635e1cbc7313eb4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-JobsModule-960099693bdd001f49e1257b344feb9dc38c8ef40db6b7deb80d817e1b35c3e2212e2f597c01dee9c0bf66e47cf184614cd89f23f18ffb581635e1cbc7313eb4"' :
                                        'id="xs-injectables-links-module-JobsModule-960099693bdd001f49e1257b344feb9dc38c8ef40db6b7deb80d817e1b35c3e2212e2f597c01dee9c0bf66e47cf184614cd89f23f18ffb581635e1cbc7313eb4"' }>
                                        <li class="link">
                                            <a href="injectables/JobsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MailModule-88d2445793955c450a8a3434ba83871e3fc7c92b6c093ab7a47330b55eebf6b9c5f3fa9c13672431781f4954a60f0d3db3008c3be9f33e8b2d3d415cb136b6d0"' : 'data-bs-target="#xs-controllers-links-module-MailModule-88d2445793955c450a8a3434ba83871e3fc7c92b6c093ab7a47330b55eebf6b9c5f3fa9c13672431781f4954a60f0d3db3008c3be9f33e8b2d3d415cb136b6d0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MailModule-88d2445793955c450a8a3434ba83871e3fc7c92b6c093ab7a47330b55eebf6b9c5f3fa9c13672431781f4954a60f0d3db3008c3be9f33e8b2d3d415cb136b6d0"' :
                                            'id="xs-controllers-links-module-MailModule-88d2445793955c450a8a3434ba83871e3fc7c92b6c093ab7a47330b55eebf6b9c5f3fa9c13672431781f4954a60f0d3db3008c3be9f33e8b2d3d415cb136b6d0"' }>
                                            <li class="link">
                                                <a href="controllers/MailController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailModule-88d2445793955c450a8a3434ba83871e3fc7c92b6c093ab7a47330b55eebf6b9c5f3fa9c13672431781f4954a60f0d3db3008c3be9f33e8b2d3d415cb136b6d0"' : 'data-bs-target="#xs-injectables-links-module-MailModule-88d2445793955c450a8a3434ba83871e3fc7c92b6c093ab7a47330b55eebf6b9c5f3fa9c13672431781f4954a60f0d3db3008c3be9f33e8b2d3d415cb136b6d0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-88d2445793955c450a8a3434ba83871e3fc7c92b6c093ab7a47330b55eebf6b9c5f3fa9c13672431781f4954a60f0d3db3008c3be9f33e8b2d3d415cb136b6d0"' :
                                        'id="xs-injectables-links-module-MailModule-88d2445793955c450a8a3434ba83871e3fc7c92b6c093ab7a47330b55eebf6b9c5f3fa9c13672431781f4954a60f0d3db3008c3be9f33e8b2d3d415cb136b6d0"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PermissionsModule.html" data-type="entity-link" >PermissionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PermissionsModule-030775b4d18f8400a6c35684e4be3049edd8d006cacddd7ecd07280b32f97ba189c8759fbb1cbfd76d7efd8a8bff67f35bd3c45967e41bf5fbaf00c7a037525f"' : 'data-bs-target="#xs-controllers-links-module-PermissionsModule-030775b4d18f8400a6c35684e4be3049edd8d006cacddd7ecd07280b32f97ba189c8759fbb1cbfd76d7efd8a8bff67f35bd3c45967e41bf5fbaf00c7a037525f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PermissionsModule-030775b4d18f8400a6c35684e4be3049edd8d006cacddd7ecd07280b32f97ba189c8759fbb1cbfd76d7efd8a8bff67f35bd3c45967e41bf5fbaf00c7a037525f"' :
                                            'id="xs-controllers-links-module-PermissionsModule-030775b4d18f8400a6c35684e4be3049edd8d006cacddd7ecd07280b32f97ba189c8759fbb1cbfd76d7efd8a8bff67f35bd3c45967e41bf5fbaf00c7a037525f"' }>
                                            <li class="link">
                                                <a href="controllers/PermissionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PermissionsModule-030775b4d18f8400a6c35684e4be3049edd8d006cacddd7ecd07280b32f97ba189c8759fbb1cbfd76d7efd8a8bff67f35bd3c45967e41bf5fbaf00c7a037525f"' : 'data-bs-target="#xs-injectables-links-module-PermissionsModule-030775b4d18f8400a6c35684e4be3049edd8d006cacddd7ecd07280b32f97ba189c8759fbb1cbfd76d7efd8a8bff67f35bd3c45967e41bf5fbaf00c7a037525f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PermissionsModule-030775b4d18f8400a6c35684e4be3049edd8d006cacddd7ecd07280b32f97ba189c8759fbb1cbfd76d7efd8a8bff67f35bd3c45967e41bf5fbaf00c7a037525f"' :
                                        'id="xs-injectables-links-module-PermissionsModule-030775b4d18f8400a6c35684e4be3049edd8d006cacddd7ecd07280b32f97ba189c8759fbb1cbfd76d7efd8a8bff67f35bd3c45967e41bf5fbaf00c7a037525f"' }>
                                        <li class="link">
                                            <a href="injectables/PermissionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResumesModule.html" data-type="entity-link" >ResumesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ResumesModule-eb47ecd4be4610882bbb9c1c7207f37a9a6c8d9ffe5424a41038a716f1152ffa8e446c7c9505108c80d3fb87f3a25e372b4e2c5b07003410bba8b55d60673fda"' : 'data-bs-target="#xs-controllers-links-module-ResumesModule-eb47ecd4be4610882bbb9c1c7207f37a9a6c8d9ffe5424a41038a716f1152ffa8e446c7c9505108c80d3fb87f3a25e372b4e2c5b07003410bba8b55d60673fda"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ResumesModule-eb47ecd4be4610882bbb9c1c7207f37a9a6c8d9ffe5424a41038a716f1152ffa8e446c7c9505108c80d3fb87f3a25e372b4e2c5b07003410bba8b55d60673fda"' :
                                            'id="xs-controllers-links-module-ResumesModule-eb47ecd4be4610882bbb9c1c7207f37a9a6c8d9ffe5424a41038a716f1152ffa8e446c7c9505108c80d3fb87f3a25e372b4e2c5b07003410bba8b55d60673fda"' }>
                                            <li class="link">
                                                <a href="controllers/ResumesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ResumesModule-eb47ecd4be4610882bbb9c1c7207f37a9a6c8d9ffe5424a41038a716f1152ffa8e446c7c9505108c80d3fb87f3a25e372b4e2c5b07003410bba8b55d60673fda"' : 'data-bs-target="#xs-injectables-links-module-ResumesModule-eb47ecd4be4610882bbb9c1c7207f37a9a6c8d9ffe5424a41038a716f1152ffa8e446c7c9505108c80d3fb87f3a25e372b4e2c5b07003410bba8b55d60673fda"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ResumesModule-eb47ecd4be4610882bbb9c1c7207f37a9a6c8d9ffe5424a41038a716f1152ffa8e446c7c9505108c80d3fb87f3a25e372b4e2c5b07003410bba8b55d60673fda"' :
                                        'id="xs-injectables-links-module-ResumesModule-eb47ecd4be4610882bbb9c1c7207f37a9a6c8d9ffe5424a41038a716f1152ffa8e446c7c9505108c80d3fb87f3a25e372b4e2c5b07003410bba8b55d60673fda"' }>
                                        <li class="link">
                                            <a href="injectables/ResumesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RolesModule.html" data-type="entity-link" >RolesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RolesModule-fa10421ad47323654600eb5053d13307b8acda6627d24694ec6d64ec6cf67788d81c5c65f9faa0c9bebd56c2aab89ba54a32090287a8132527e3b289cf751dba"' : 'data-bs-target="#xs-controllers-links-module-RolesModule-fa10421ad47323654600eb5053d13307b8acda6627d24694ec6d64ec6cf67788d81c5c65f9faa0c9bebd56c2aab89ba54a32090287a8132527e3b289cf751dba"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RolesModule-fa10421ad47323654600eb5053d13307b8acda6627d24694ec6d64ec6cf67788d81c5c65f9faa0c9bebd56c2aab89ba54a32090287a8132527e3b289cf751dba"' :
                                            'id="xs-controllers-links-module-RolesModule-fa10421ad47323654600eb5053d13307b8acda6627d24694ec6d64ec6cf67788d81c5c65f9faa0c9bebd56c2aab89ba54a32090287a8132527e3b289cf751dba"' }>
                                            <li class="link">
                                                <a href="controllers/RolesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RolesModule-fa10421ad47323654600eb5053d13307b8acda6627d24694ec6d64ec6cf67788d81c5c65f9faa0c9bebd56c2aab89ba54a32090287a8132527e3b289cf751dba"' : 'data-bs-target="#xs-injectables-links-module-RolesModule-fa10421ad47323654600eb5053d13307b8acda6627d24694ec6d64ec6cf67788d81c5c65f9faa0c9bebd56c2aab89ba54a32090287a8132527e3b289cf751dba"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RolesModule-fa10421ad47323654600eb5053d13307b8acda6627d24694ec6d64ec6cf67788d81c5c65f9faa0c9bebd56c2aab89ba54a32090287a8132527e3b289cf751dba"' :
                                        'id="xs-injectables-links-module-RolesModule-fa10421ad47323654600eb5053d13307b8acda6627d24694ec6d64ec6cf67788d81c5c65f9faa0c9bebd56c2aab89ba54a32090287a8132527e3b289cf751dba"' }>
                                        <li class="link">
                                            <a href="injectables/RolesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SubscribersModule.html" data-type="entity-link" >SubscribersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SubscribersModule-d96eaf4401444f5f23496fe717190138b06510971340dfe33375ae787f86084faa52b1dd08ff7da3473200151cdbee90f72fe2a10c69f18eb26795639f0a4a5a"' : 'data-bs-target="#xs-controllers-links-module-SubscribersModule-d96eaf4401444f5f23496fe717190138b06510971340dfe33375ae787f86084faa52b1dd08ff7da3473200151cdbee90f72fe2a10c69f18eb26795639f0a4a5a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SubscribersModule-d96eaf4401444f5f23496fe717190138b06510971340dfe33375ae787f86084faa52b1dd08ff7da3473200151cdbee90f72fe2a10c69f18eb26795639f0a4a5a"' :
                                            'id="xs-controllers-links-module-SubscribersModule-d96eaf4401444f5f23496fe717190138b06510971340dfe33375ae787f86084faa52b1dd08ff7da3473200151cdbee90f72fe2a10c69f18eb26795639f0a4a5a"' }>
                                            <li class="link">
                                                <a href="controllers/SubscribersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SubscribersModule-d96eaf4401444f5f23496fe717190138b06510971340dfe33375ae787f86084faa52b1dd08ff7da3473200151cdbee90f72fe2a10c69f18eb26795639f0a4a5a"' : 'data-bs-target="#xs-injectables-links-module-SubscribersModule-d96eaf4401444f5f23496fe717190138b06510971340dfe33375ae787f86084faa52b1dd08ff7da3473200151cdbee90f72fe2a10c69f18eb26795639f0a4a5a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SubscribersModule-d96eaf4401444f5f23496fe717190138b06510971340dfe33375ae787f86084faa52b1dd08ff7da3473200151cdbee90f72fe2a10c69f18eb26795639f0a4a5a"' :
                                        'id="xs-injectables-links-module-SubscribersModule-d96eaf4401444f5f23496fe717190138b06510971340dfe33375ae787f86084faa52b1dd08ff7da3473200151cdbee90f72fe2a10c69f18eb26795639f0a4a5a"' }>
                                        <li class="link">
                                            <a href="injectables/SubscribersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-6a71d6d665f1f6a65d8f50d39b81bd8fd1f11f29c39eaaf9b2c2e28580ded9151d9b1744b58ca461596c83d36151364c38d8372782b695aee8d9cf55ee801455"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-6a71d6d665f1f6a65d8f50d39b81bd8fd1f11f29c39eaaf9b2c2e28580ded9151d9b1744b58ca461596c83d36151364c38d8372782b695aee8d9cf55ee801455"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-6a71d6d665f1f6a65d8f50d39b81bd8fd1f11f29c39eaaf9b2c2e28580ded9151d9b1744b58ca461596c83d36151364c38d8372782b695aee8d9cf55ee801455"' :
                                            'id="xs-controllers-links-module-UsersModule-6a71d6d665f1f6a65d8f50d39b81bd8fd1f11f29c39eaaf9b2c2e28580ded9151d9b1744b58ca461596c83d36151364c38d8372782b695aee8d9cf55ee801455"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-6a71d6d665f1f6a65d8f50d39b81bd8fd1f11f29c39eaaf9b2c2e28580ded9151d9b1744b58ca461596c83d36151364c38d8372782b695aee8d9cf55ee801455"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-6a71d6d665f1f6a65d8f50d39b81bd8fd1f11f29c39eaaf9b2c2e28580ded9151d9b1744b58ca461596c83d36151364c38d8372782b695aee8d9cf55ee801455"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-6a71d6d665f1f6a65d8f50d39b81bd8fd1f11f29c39eaaf9b2c2e28580ded9151d9b1744b58ca461596c83d36151364c38d8372782b695aee8d9cf55ee801455"' :
                                        'id="xs-injectables-links-module-UsersModule-6a71d6d665f1f6a65d8f50d39b81bd8fd1f11f29c39eaaf9b2c2e28580ded9151d9b1744b58ca461596c83d36151364c38d8372782b695aee8d9cf55ee801455"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CompaniesController.html" data-type="entity-link" >CompaniesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DatabasesController.html" data-type="entity-link" >DatabasesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/FilesController.html" data-type="entity-link" >FilesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HealthController.html" data-type="entity-link" >HealthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/JobsController.html" data-type="entity-link" >JobsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MailController.html" data-type="entity-link" >MailController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PermissionsController.html" data-type="entity-link" >PermissionsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ResumesController.html" data-type="entity-link" >ResumesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RolesController.html" data-type="entity-link" >RolesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SubscribersController.html" data-type="entity-link" >SubscribersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Company.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/Company-1.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/Company-2.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCompanyDto.html" data-type="entity-link" >CreateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateFileDto.html" data-type="entity-link" >CreateFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateJobDto.html" data-type="entity-link" >CreateJobDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMailDto.html" data-type="entity-link" >CreateMailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePermissionDto.html" data-type="entity-link" >CreatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateResumeDto.html" data-type="entity-link" >CreateResumeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoleDto.html" data-type="entity-link" >CreateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSubscriberDto.html" data-type="entity-link" >CreateSubscriberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserCvDto.html" data-type="entity-link" >CreateUserCvDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/File.html" data-type="entity-link" >File</a>
                            </li>
                            <li class="link">
                                <a href="classes/History.html" data-type="entity-link" >History</a>
                            </li>
                            <li class="link">
                                <a href="classes/Job.html" data-type="entity-link" >Job</a>
                            </li>
                            <li class="link">
                                <a href="classes/Mail.html" data-type="entity-link" >Mail</a>
                            </li>
                            <li class="link">
                                <a href="classes/Permission.html" data-type="entity-link" >Permission</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterUserDto.html" data-type="entity-link" >RegisterUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Resume.html" data-type="entity-link" >Resume</a>
                            </li>
                            <li class="link">
                                <a href="classes/Role.html" data-type="entity-link" >Role</a>
                            </li>
                            <li class="link">
                                <a href="classes/Subscriber.html" data-type="entity-link" >Subscriber</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCompanyDto.html" data-type="entity-link" >UpdateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatedBy.html" data-type="entity-link" >UpdatedBy</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFileDto.html" data-type="entity-link" >UpdateFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateJobDto.html" data-type="entity-link" >UpdateJobDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMailDto.html" data-type="entity-link" >UpdateMailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePermissionDto.html" data-type="entity-link" >UpdatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateResumeDto.html" data-type="entity-link" >UpdateResumeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRoleDto.html" data-type="entity-link" >UpdateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSubscriberDto.html" data-type="entity-link" >UpdateSubscriberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserLoginDto.html" data-type="entity-link" >UserLoginDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CompaniesService.html" data-type="entity-link" >CompaniesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DatabasesService.html" data-type="entity-link" >DatabasesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilesService.html" data-type="entity-link" >FilesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JobsService.html" data-type="entity-link" >JobsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailService.html" data-type="entity-link" >MailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MulterConfigService.html" data-type="entity-link" >MulterConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PermissionsService.html" data-type="entity-link" >PermissionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResumesService.html" data-type="entity-link" >ResumesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RolesService.html" data-type="entity-link" >RolesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubscribersService.html" data-type="entity-link" >SubscribersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransformInterceptor.html" data-type="entity-link" >TransformInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link" >Response</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});