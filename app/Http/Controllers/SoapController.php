<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SoapController extends Controller
{
    private $client;

    public function simple(Request $request) {
        $convo = $request->input('convo');



        
        $this->setClient();

        $data = [
            "temperature" => 0.7,
            "max_tokens" => -1,
            "stream" => false,
            "messages" => [
                [
                    "role" => "user",
                    "content" => "" . $convo
                ]
            ]
        ];
        
        $response = $this->client->post('', [
            'json' => $data
        ]);

        $response = json_decode($response->getBody()->getContents(), true);

        return $response;
    }

    public function setClient() {
        
        $uri = env('LMSTUDIO_URL') . ':' . env('LMSTUDIO_PORT') . '/' .  env('LMSTUDIO_version');
        $uri .= '/chat/completions';

        //we want to set up a client with base uri and accept json
        $this->client = new Client([
            'base_uri' => $uri,
            'stream' => true,
            'headers' => [
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
            ]
        ]);
            

    }
}
