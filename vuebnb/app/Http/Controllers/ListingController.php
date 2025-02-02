<?php

namespace App\Http\Controllers;

use App\Listing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ListingController extends Controller
{
	private function get_listing_summaries() 
	{
		$collection = Listing::all([ 'id', 'address', 'title', 'price_per_night' ]);
		$collection->transform( function( $listing ) {
			$listing->thumb = asset( 'images/' . $listing->id .'/Image_1_thumb.jpg' ); 
			return $listing;
		} );
		return collect(['listings' => $collection->toArray()]);
	}

	private function add_meta_data( $collection, $request )
	{
		return $collection->merge(['path' => $request->getPathInfo(), 'auth' => Auth::check(), 'saved' => Auth::check() ? Auth::user()->saved : []]);
	}

	public function get_listing_api( Listing $listing )
	{
		$data = $this->get_listing( $listing );
		return response()->json( $data );
	}

	public function get_listing_web( Listing $listing, Request $request )
	{
		$data = $this->get_listing( $listing );
		$data = $this->add_meta_data( $data, $request );
		return view('app')->with( 'data', $data );
	}

	public function get_home_web( Request $request )
	{

		$data = $this->get_listing_summaries();
		$data = $this->add_meta_data( $data, $request );
		return view( 'app' )->with( 'data', $data );
	}

	private function get_listing( $listing )
	{
		$model = $listing->toArray();
		for ( $i = 1; $i <=4; $i++ )
		{
			$model['image_'.$i] = asset('images/' . $listing->id . '/Image_' . $i . '.jpg');
		}
		return collect(['listing'	=>	$model]);
	}
}
