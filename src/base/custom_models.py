from django.db import models
import ast


class ListField(models.Field):
    description = "Stores a python list"

    def __init__(self, *args, **kwargs):
        super(ListField, self).__init__(*args, **kwargs)

    def from_db_value(self, value, expression, connexion, context):
        return self.to_python(value)

    def to_python(self, value):
        if not value:
            value = []

        if isinstance(value, list):
            return value

        return ast.literal_eval(value)

    def get_db_prep_value(self, value, connection, prepared=False):
        value = super().get_db_prep_value(value, connection, prepared)
        return str(value)

    def get_prep_value(self, value):
        if value is None:
            return value
        return str(value)
