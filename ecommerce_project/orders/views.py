from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from cart.models import Cart, CartItem
from .models import Order, OrderItem

class CheckoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        # Get user's cart
        cart = Cart.objects.get(user=user)
        items = CartItem.objects.filter(cart=cart)

        if not items:
            return Response({"error": "Cart is empty"}, status=400)

        # Create order
        order = Order.objects.create(user=user)

        # Move cart items → order items
        for item in items:
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity
            )

        # Clear cart
        items.delete()

        return Response({"message": "Order placed successfully"})