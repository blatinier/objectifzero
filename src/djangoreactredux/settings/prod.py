from djangoreactredux.settings.base import *  # NOQA (ignore all errors on this line)


PAGE_CACHE_SECONDS = 60

ALLOWED_HOSTS = ['objectifzero.local', '127.0.0.1', '127.0.0.1:8000', 'objectifzero.latinier.fr']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'objectif_zero_react',
        'USER': 'objectifzero',
        'PASSWORD': 'pipopipo',
        'HOST': 'localhost',
        'PORT': 5432,
    }
}

REST_FRAMEWORK['EXCEPTION_HANDLER'] = 'django_rest_logger.handlers.rest_exception_handler'  # NOQA (ignore all errors on this line)

# ########### Sentry configuration

# Change this to proper sentry url.
RAVEN_CONFIG = {
    'dsn': '',
}

INSTALLED_APPS = INSTALLED_APPS + (  # NOQA (ignore all errors on this line)
    'raven.contrib.django.raven_compat',
)

# ####### Logging

LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'root': {
        'level': 'WARNING',
        'handlers': ['sentry'],
    },
    'formatters': {
        'verbose': {
            'format': '%(levelname)s %(asctime)s %(module)s '
                      '%(process)d %(thread)d %(message)s'
        },
    },
    'handlers': {
        'sentry': {
            'level': 'ERROR',
            'class': 'raven.contrib.django.raven_compat.handlers.SentryHandler',
        },
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose'
        }
    },
    'loggers': {
        'django.db.backends': {
            'level': 'ERROR',
            'handlers': ['console'],
            'propagate': False,
        },
        'raven': {
            'level': 'DEBUG',
            'handlers': ['sentry'],
            'propagate': False,
        },
        'sentry.errors': {
            'level': 'DEBUG',
            'handlers': ['sentry'],
            'propagate': False,
        },
    },
}

DEFAULT_LOGGER = 'raven'

LOGGER_EXCEPTION = DEFAULT_LOGGER
LOGGER_ERROR = DEFAULT_LOGGER
LOGGER_WARNING = DEFAULT_LOGGER
