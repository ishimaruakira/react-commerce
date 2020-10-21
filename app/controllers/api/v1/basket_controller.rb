class Api::V1::BasketController < ApplicationController
  def show
    basket = session[:basket] || []
    @basket = basket.map{|x,y| {product: Product.find(x), quantity: y} }
  end

  def create
    session[:basket] ||= []
    @item = session[:basket].detect{|x, y| x == params[:product_id]}
    if @item
      @item[1] += 1
    else
      @item = [params[:product_id], 1]
      session[:basket] << @item
    end
  end

  def update
    session[:basket] ||= []
    @item = session[:basket].detect{|x, y| x == params[:product_id]}
    if @item
      @item[1] = params[:quantity]
    else
      @item = [params[:product_id], params[:quantity]]
      session[:basket] << @item
    end
  end

  def destroy
    session[:basket] ||= []
    session[:basket].delete_if{|x, y| x == params[:product_id]}
    @product_id = params[:product_id]
  end
end
