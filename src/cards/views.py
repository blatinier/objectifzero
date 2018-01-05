from django.shortcuts import get_object_or_404
from django.utils.text import slugify
from knox.auth import TokenAuthentication
from rest_framework import status
from rest_framework.generics import ListAPIView, CreateAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from cards.models import Card, UserCard, DataSource, CardStat
from cards.serializers import CardShortSerializer


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
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAdminUser,)

    def get(self, request):
        """Process GET request and return cards."""
        cards = Card.objects.all()
        data = [self.get_serializer(c).data for c in cards]
        return Response(data, status=status.HTTP_200_OK)


class CreateCardView(CreateAPIView):
    """Create card."""

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAdminUser,)

    def post(self, request):
        """Process POST request and create a card."""
        sources = []
        data = request.data
        for data_src in data['data_source']:
            try:
                ds = DataSource.objects.get(link=data_src['data_source_link'])
            except DataSource.DoesNotExist:
                ds = DataSource(link=data_src['data_source_link'],
                                name=data_src['data_source_name'],
                                status=data_src['data_source_status'])
                ds.save()
            sources.append(ds)

        stats = CardStat(waste_reduction=data['stats']['waste_reduction'],
                         co2_reduction=data['stats']['co2_reduction'],
                         water_use_reduction=data['stats']['water_use_reduction'],
                         status=data['stats']['stat_status'],
                         year=data['stats']['year'])
        stats.save()
        stats.data_sources.add(*sources)
        help_links = ""
        if 'help_links' in data and data['help_links']:
            help_links = '\n'.join(data['help_links'])

        card = Card(slug=slugify(data['title']),
                    title=data['title'],
                    description=data['description'],
                    image=data['image'],
                    waste_reduction_score=data['waste_reduction_score'],
                    difficulty_score=data['difficulty_score'],
                    cost_score=data['cost_score'],
                    help_links=help_links,
                    card_stats=stats)
        card.save()

        return Response({}, status=status.HTTP_200_OK)


class DeleteCardView(DestroyAPIView):
    """Delete card."""

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAdminUser,)

    def delete(self, request, card_slug):
        """Process delete a card."""
        card = get_object_or_404(Card, slug=card_slug)
        stats = card.card_stats
        card.delete()
        stats.delete()
        return Response({}, status=status.HTTP_200_OK)
