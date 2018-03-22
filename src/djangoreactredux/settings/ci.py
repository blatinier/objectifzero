from djangoreactredux.settings.staging import *  # NOQA (ignore all errors on this line)

SECRET_KEY = '+ams6z-4y3ujbejk3%iq(ol=f8jb-)a68q3yv7#jw_o%rj$9y_'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'travis_ci_test',
        'USER': 'postgres',
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': '',
    }
}
