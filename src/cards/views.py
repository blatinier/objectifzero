from django.shortcuts import get_object_or_404
from django.utils.text import slugify
from knox.auth import TokenAuthentication
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from cards.models import Card, UserCard, DataSource, CardStat
from cards.serializers import CardSerializer, CardShortSerializer


class UserCardView(ListAPIView):
    """Return user cards data."""
    serializer_class = CardShortSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        """Process GET request and return card data."""
        ucards = UserCard.objects.filter(user=request.user)
        list_cards = []
        for ucard in ucards:
            list_cards.append(self.get_serializer(ucard).data)
        return Response(list_cards, status=status.HTTP_200_OK)


class ListCardsView(ListAPIView):
    """Return cards data."""
    serializer_class = CardShortSerializer
    queryset = Card.objects.get_queryset().order_by('id')
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)


class CardListCreateView(ListCreateAPIView):
    """List & create card."""
    serializer_class = CardSerializer
    queryset = Card.objects.get_queryset().order_by('id')
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAdminUser,)


class CardRUDView(RetrieveUpdateDestroyAPIView):
    """Card management."""
    serializer_class = CardSerializer
    queryset = Card.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAdminUser,)
    lookup_field = "slug"
