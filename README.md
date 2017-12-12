Code style master: [![Code Health](https://landscape.io/github/blatinier/objectifzero/master/landscape.svg?style=plastic)](https://landscape.io/github/blatinier/objectifzero/master)

Code style devel: [![Code Health](https://landscape.io/github/blatinier/objectifzero/devel/landscape.svg?style=plastic)](https://landscape.io/github/blatinier/objectifzero/devel)

Travis master: [![Travis](https://travis-ci.org/blatinier/objectifzero.svg?branch=master)](https://travis-ci.org/blatinier/objectifzero.svg?branch=master)

Travis devel: [![Travis](https://travis-ci.org/blatinier/objectifzero.svg?branch=devel)](https://travis-ci.org/blatinier/objectifzero.svg?branch=devel)

Coverage master: [![Coverage Status](https://coveralls.io/repos/github/blatinier/objectifzero/badge.svg?branch=mastre)](https://coveralls.io/github/blatinier/objectifzero?branch=master)

Coverage devel: [![Coverage Status](https://coveralls.io/repos/github/blatinier/objectifzero/badge.svg?branch=mastre)](https://coveralls.io/github/blatinier/objectifzero?branch=devel)


An application to help you get zero waste!

h1. Data Sources

 - http://www.donnees-environnement.com/sources.php
 - http://www.statistiques.developpement-durable.gouv.fr/
 - https://www.planetoscope.com/recyclage-dechets
 - http://cniid.org/Les-dechets-en-France-quelques-chiffres,151

# Setup project

Create a virtualenv then install python dependencies:

    pip install -r py-requirements/dev.txt

Install yarn then install javascript dependencies:

    yarn

Setup your database and set the config in `src/djangoreactredux/settings/prod.py` then go in src and run:

    ./manage.py migrate

Last you must allow your host in the settings (`prod.py`) and configure the javascript accordingly (see first line of `src/static/utils/config.js`)

You should now be able to run:

    ./manage.py runserver

and

    yarn run dev

