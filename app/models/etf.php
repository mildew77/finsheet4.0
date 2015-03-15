<?php


class Etf extends Eloquent {
 protected $table = 'etfreturns';
public static function getColumnsNames()
{
    $connection = DB::connection();
    $connection->getSchemaBuilder();

    $table   = $connection->getTablePrefix() . 'etfreturns';
    $grammar = $connection->getSchemaGrammar();
    $results = $connection->select($grammar->compileColumnExists(), array($connection->getDatabaseName(), $table));

    return $connection->getPostProcessor()->processColumnListing($results);
}


}
?>