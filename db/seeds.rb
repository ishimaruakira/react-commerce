# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'open-uri'

10.times do |n|
  cat = Category.create(name: Faker::Commerce.unique.department)
  100.times do |m|
    prod = cat.products.create(name: Faker::Commerce.unique.product_name, 
      price: Faker::Commerce.price(range: 5..50),
      description: Faker::Lorem.sentence(random_words_to_add: 6))
    img = URI.open("http://placekitten.com/#{rand(3)+1}00/#{rand(3)+1}00")
    prod.image.attach(io: img, filename: 'kitten.png')
  end
end