from knox.auth import TokenAuthentication
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from cards.models import Card
from users.models import UserCard
from user_cards.serializers import UserCardSerializer
from lib.utils import IsOwner


class UserCardView(ListAPIView):
    """Return user cards data."""
    serializer_class = UserCardSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        """Process GET request and return card data."""
        ucards = {uc.card: uc
                  for uc in UserCard.objects.filter(user=request.user)}
        cards = Card.objects.all()
        list_cards = []
        for card in cards:
            user_card = ucards.get(card)
            if user_card is None:
                user_card = UserCard(card=card, user=request.user)
                user_card.save()
            list_cards.append(self.get_serializer(user_card).data)
        return Response(list_cards, status=status.HTTP_200_OK)


class UserCardRUDView(RetrieveUpdateDestroyAPIView):
    """UserCard management."""
    serializer_class = UserCardSerializer
    queryset = UserCard.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsOwner,)
    lookup_field = "id"
