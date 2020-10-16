class Api::V1::ProductsController < ApplicationController
  def index
    @products = Product.all
    if params[:search].present?
      @products = @products.where("name LIKE ?", "%#{params[:search]}%")
    end
    @categories = @products.group(:category).count
    @total = @products.count
    @products = @products.where(category_id: params[:category_id]) if params[:category_id].present?
    @products = @products.page(params[:page]).per(24)
  end

  def show
    @product = Product.find(params[:id])
  end
end
