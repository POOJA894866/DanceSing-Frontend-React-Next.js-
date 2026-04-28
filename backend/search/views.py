from django.shortcuts import render

from wagtail.models import Page
from wagtail.search.backends import get_search_backend


def search(request):
    search_query = request.GET.get("query", None)
    page = request.GET.get("page", 1)

    if search_query:
        search_results = Page.objects.live().search(search_query)
    else:
        search_results = Page.objects.none()

    return render(
        request,
        "search/search.html",
        {
            "search_query": search_query,
            "search_results": search_results,
        },
    )
