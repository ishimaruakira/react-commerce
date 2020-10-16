json.extract! product, :id, :name, :description, :category_id
json.image_url url_for(product.image)