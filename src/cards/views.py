from django.shortcuts import get_object_or_404
from django.utils.text import slugify
from knox.auth import TokenAuthentication
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from cards.models import Card, DataSource, CardStat
from accounts.models import UserCard
from cards.serializers import CardSerializer, CardShortSerializer


class UserCardView(ListAPIView):
    """Return user cards data."""
    serializer_class = CardShortSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        """Process GET request and return card data."""
        ucards = {uc.card: uc
                  for uc in UserCard.objects.filter(user=request.user)}
        cards = Card.objects.all()
        list_cards = []
        for card in cards:
            list_cards.append(self.get_serializer(ucards.get(card, card)).data)
        return Response(list_cards, status=status.HTTP_200_OK)


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
