json.products(@products) do |product|
  json.partial! 'product', product: product
end
json.total_pages @products.total_pages
json.current_page @products.current_page
json.total_records @total

json.categories(@categories) do |category, product_count|
  json.partial! 'category', category: category, product_count: product_count
end