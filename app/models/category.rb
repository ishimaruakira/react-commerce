class Category < ApplicationRecord
  default_scope { order(:name) }
  has_many :products

  validates :name, presence: true, uniqueness: true
end
