class Product < ApplicationRecord
  belongs_to :category

  default_scope { order(:name) }

  has_one_attached :image

  validates :name, presence: true, uniqueness: true
  validates :category, presence: true
end
