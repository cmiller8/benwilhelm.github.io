ruby -rubygems -e 'require "jekyll-import";
    JekyllImport::Importers::WordPress.run({
      "dbname"   => "bnb_sandbox",
      "user"     => "root",
      "password" => "root",
      "host"     => "localhost",
      "table_prefix"   => "2d2_2_",
      "socket" => "/tmp/mysql.sock",
      "clean_entities" => true,
      "comments"       => true,
      "categories"     => true,
      "tags"           => true,
      "more_excerpt"   => true,
      "more_anchor"    => true,
      "status"         => ["publish"]
    })'
