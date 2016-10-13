class Api::SearchController < ApplicationController
  def index
    if params[:query] == 'My List'
      @series = Favorite.get_my_list(current_user)
    elsif params[:query] == 'Continue Watching'
      @series = Serie.joins(:episodes, :current_watchings).where('user_id = ?', current_user.id)
    else
      @series = Serie.search(params)
    end
  end
end
