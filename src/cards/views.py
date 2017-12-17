from django.shortcuts import get_object_or_404
from knox.auth import TokenAuthentication
from rest_framework import status
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from cards.models import Card, UserCard


class ListCardsView(ListAPIView):
    """Return cards data."""

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAdminUser,)

    def get(self, request):
        """Process GET request and return cards."""
        cards = Card.objects.all()
        data = {'cards': [c.short_dump() for c in cards]}
        return Response(data, status=status.HTTP_200_OK)


class UserCardView(ListAPIView):
    """Return user cards data."""

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        """Process GET request and return card data."""
        ucards = UserCard.objects.filter(user=request.user)
        list_cards = []
        for ucard in ucards:
            list_cards.append(ucard.short_dump())
        return Response(list_cards, status=status.HTTP_200_OK)
