<?php

use Illuminate\Database\Seeder;

class ListingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = database_path() . '/data.json';
	    $file = \Illuminate\Support\Facades\File::get( $path );
	    $data = json_decode( $file, true );
	    \Illuminate\Support\Facades\DB::table('listings')->insert($data);
    }
}
