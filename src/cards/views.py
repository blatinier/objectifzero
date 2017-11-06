from django.shortcuts import get_object_or_404
from knox.auth import TokenAuthentication
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from cards.models import Card


class CardsView(GenericAPIView):
    """Return cards data."""

    # TODO Logged in only?
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, card_slug):
        """Process GET request and return card data."""
        card = get_object_or_404(Card, slug=str(card_slug))
        data = {
            'title': card.title,
            'description': card.description,
        }
        return Response(data, status=status.HTTP_200_OK)
