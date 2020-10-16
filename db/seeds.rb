# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'json'
require 'open-uri'

gallery = JSON.parse(URI.open('http://imgur.com/gallery.json').read)['data']

# construct URLs
gallery.each {|i| i['url'] = "http://imgur.com/#{i['hash']}#{i['ext']}" }

# select images that aren't too big
gallery.select {|i| i['size'] < 200_000 }
# or images that aren't too small
gallery.select {|i| i['width'] > 400 && i['height'] > 400 }

# select only PNG images
gallery.select {|i| i['ext'] == '.png'}

10.times do |n|
  cat = Category.create(name: Faker::Commerce.unique.department)
  100.times do |m|
    prod = cat.products.create(name: Faker::Commerce.unique.product_name, 
      price: Faker::Commerce.price(range: 5..50),
      description: Faker::Lorem.sentence(random_words_to_add: 6))
    url = URI.parse(gallery.sample['url'])
    puts url
    filename = File.basename(url.path)
    img = URI.open(url)
    prod.image.attach(io: img, filename: filename)
  end
end