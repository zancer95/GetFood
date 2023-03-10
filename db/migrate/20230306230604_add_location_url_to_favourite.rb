class AddLocationUrlToFavourite < ActiveRecord::Migration[7.0]
  def change
    add_column :favourites, :location_url, :string
  end
end
