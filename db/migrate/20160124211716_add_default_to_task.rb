class AddDefaultToTask < ActiveRecord::Migration
  def change
    change_column :tasks, :complete, :boolean, default: true
  end
end
