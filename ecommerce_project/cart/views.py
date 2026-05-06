from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Cart, CartItem
from products.models import Product

class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        items = CartItem.objects.filter(cart=cart)

        data = []
        total = 0

        for item in items:
            subtotal = item.product.price * item.quantity
            total += subtotal

            data.append({
                "id": item.id,
                "product": item.product.name,
                "price": item.product.price,
                "quantity": item.quantity,
                "subtotal": subtotal,
                "image": item.product.image.url if item.product.image else None
            })

        return Response({"items": data, "total": total})
    
class UpdateCartItem(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        item_id = request.data.get("item_id")
        action = request.data.get("action")  # "inc" or "dec"

        item = CartItem.objects.get(id=item_id)

        if action == "inc":
            item.quantity += 1
        elif action == "dec":
            item.quantity -= 1
            if item.quantity <= 0:
                item.delete()
                return Response({"message": "Item removed"})

        item.save()
        return Response({"message": "Updated"}) 
class RemoveCartItem(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        item_id = request.data.get("item_id")
        CartItem.objects.filter(id=item_id).delete()
        return Response({"message": "Item removed"})    
      
class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        print("USER:", request.user)   
        print("AUTH:", request.auth)   
        product_id = request.data.get("product_id")
        quantity = int(request.data.get("quantity", 1))

        if not product_id:
            return Response({"error": "Product ID required"}, status=400)

        try:
            product = Product.objects.get(id=product_id)

    
            cart, created = Cart.objects.get_or_create(user=request.user)

            
            cart_item, created = CartItem.objects.get_or_create(
                cart=cart,
                product=product
            )

        
            if created:
                cart_item.quantity = quantity
            else:
                
                cart_item.quantity += quantity
            cart_item.save()

            return Response({"message": "Added to cart"}, status=200)

        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=404)