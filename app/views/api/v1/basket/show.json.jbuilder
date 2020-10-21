json.basket(@basket) do |basket|
  json.product basket[:product], partial: '/api/v1/products/product', as: :product
  json.quantity basket[:quantity]
end