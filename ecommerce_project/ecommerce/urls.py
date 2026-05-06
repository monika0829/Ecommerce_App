from django.contrib import admin
from django.urls import path
from django.http import HttpResponse
from cart.views import CartView, UpdateCartItem, RemoveCartItem
from products.views import ProductListView,ProductDetailView
from accounts.views import RegisterView
from django.conf import settings
from django.conf.urls.static import static
from cart.views import AddToCartView
from accounts.views import ProfileView
from orders.views import CheckoutView


from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
def home(request):
    return HttpResponse("Welcome to Ecommerce API ")

urlpatterns = [
    path('', home),  

    path('admin/', admin.site.urls),
    path('api/products/', ProductListView.as_view()),
    path('api/register/', RegisterView.as_view()),
    path('api/profile/', ProfileView.as_view()),
    path('api/login/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
    path('api/cart/', CartView.as_view()),
    path('api/cart/update/', UpdateCartItem.as_view()),
    path('api/cart/remove/', RemoveCartItem.as_view()),
    path('api/checkout/', CheckoutView.as_view()),
    path('api/cart/add/', AddToCartView.as_view()),
    path('api/products/<int:pk>/', ProductDetailView.as_view()),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)