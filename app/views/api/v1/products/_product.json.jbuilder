json.extract! product, :id, :name, :description, :category_id
json.price product.price.to_f ## stupid but it outputs decimal as a string
json.image_url url_for(product.image)