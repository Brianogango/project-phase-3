class CreatePets < ActiveRecord::Migration[6.1]
  def change
     create_table :pets do |t|
      t.string :name
      t.string:animal_type
      t.string :breed
      t.integer :age
      t.string :gender
      t.string :size
      t.integer:weight
      t.string :color
      t.string:image_url
      t.text :description
      t.boolean :available_for_adoption, default: true

      t.timestamps
     end
  end
end
