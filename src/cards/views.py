from knox.auth import TokenAuthentication
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView, ListAPIView
from rest_framework.permissions import IsAdminUser
from cards.models import Card
from cards.serializers import CardSerializer


class CardListView(ListAPIView):
    """List & create card."""
    serializer_class = CardSerializer
    queryset = Card.objects.get_queryset().order_by('id')


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
