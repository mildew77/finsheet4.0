@extends('layouts.master')
@section('head')



@stop

@section('menu')

@stop

@section('content')
<div>This page used to Refresh Asset data and interest rates.</div>
<button id="submit">Update Database</button>
</br>
</br>
<button id="libor">Update Libor</button>
@stop

@section('scripts')
{{HTML::script('javascript/data/refresh.js')}}
@stop
